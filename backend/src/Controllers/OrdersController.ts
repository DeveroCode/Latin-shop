import Product from '../Models/Product';
import User from '../Models/User';
import Order, { deliveryStatus, methods } from '../Models/Order';
import { Request, Response } from 'express';
import { isValidPaymentMethod } from '../utils';
import { handlePayment } from '../services/payment.service';
import { NotificationService } from '../services/notification.service';
import { NotificationsType } from '../utils/notificationsType';
import ShippingGuide from '../Models/ShippingGuide';
import Chat from '../Models/Chat';
import mongoose from 'mongoose';


export class OrdersController {
    static createOrder = async (req: Request, res: Response) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { id, role, stripeCustomerId } = req.user;
            const { products, total_amount, payment_method, cardInfo } = req.body;

            if (!isValidPaymentMethod(payment_method)) {
                await session.abortTransaction();
                await session.endSession();
                const error = new Error('Invalid payment method');
                return res.status(400).json({ error: error.message });
            }

            const productsIds = products.map((p: any) => p.product);
            const findProduct = await Product
                .find({ _id: { $in: productsIds } })
                .session(session);

            // Is owner of the product
            const ownedProducts = findProduct.some(
                product => product.user.toString() === id
            );
            if (ownedProducts) {
                await session.abortTransaction();
                await session.endSession();
                const error = new Error('You cannot buy your own product');
                return res.status(400).json({ error: error.message });
            }

            // Update stock
            for (const item of products) {
                const result = await Product.updateOne(
                    {
                        _id: item.product,
                        countInStock: { $gte: item.quantity },
                    },
                    { $inc: { countInStock: -item.quantity } },
                    { session }
                );

                if (result.modifiedCount === 0) {
                    await session.abortTransaction();
                    await session.endSession();
                    const error = new Error('Product out of stock');
                    return res.status(400).json({ error: error.message });
                }
            }

            // Process payment
            const payment = await handlePayment(payment_method, total_amount, cardInfo);
            if (!payment.success) {
                await session.abortTransaction();
                await session.endSession();
                const error = new Error(payment.message);
                return res.status(400).json({ error: error.message });
            }

            // Create order
            const order = await Order.create(
                [
                    {
                        user: id,
                        products: products.map((p: any) => {
                            const products = findProduct.find(
                                fp => fp._id.toString() === p.product
                            );

                            return {
                                product: p.product,
                                quantity: p.quantity,
                                price: p.price,
                                sellerId: products!.user
                            };
                        }),
                        total_amount,
                        is_payment: payment_method !== methods.CASH,
                        payment_method: payment_method,
                    }
                ],
                { session }
            );

            await session.commitTransaction();
            await session.endSession();

            // Send notification to seller
            const sellersId = [...new Set(findProduct.map(p => p.user.toString()))];

            for (const sellerId of sellersId) {
                const seller = await User.findById(sellerId);
                if (!seller) continue;

                await NotificationService.createAndSend(sellerId, {
                    type: NotificationsType.NEW_ORDER,
                    title: 'New order',
                    message: 'You have a new order',
                    orderId: order[0]._id.toString(),
                    user: id,
                    createdAt: new Date()
                });

                await Chat.create({
                    seller: sellerId,
                    buyer: id,
                    order: order[0]._id,
                    lastMessage: 'Chat started',
                    unreadBy: role,
                    isActive: true,
                });
            }

            return res.status(200).json({ message: 'Order created successfully' });

        } catch (error: any) {
            await session.abortTransaction();
            await session.endSession();

            if (error?.errorLabels?.includes('TransientTransactionError')) {
                return res.status(409).json({
                    message: 'Temporary conflict, please retry'
                });
            }

            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    static getOrders = async (req: Request, res: Response) => {
        const { _id } = req.user;
        try {
            const orders = await Order.find({ products: { $elemMatch: { sellerId: _id } } })
                .select('user products createdAt is_payment total_amount')
                .populate("user", "name email last_name image address city cp phone_number -_id")
                .populate("products.product", "images brand name price -_id")
                .sort({ createdAt: -1 })
                .lean();

            orders.forEach(order => {
                order.products = order.products.map(p => {
                    delete p.sellerId;
                    return p;
                });

            })

            if (!orders) {
                const error = new Error('Orders not found');
                return res.status(404).json({ error: error.message });
            }

            return res.status(200).json({ orders });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static deleteManyOrders = async (req: Request, res: Response) => {
        const { ordersId } = req.body;
        const { _id } = req.user;
        try {
            const getOrderId = await Order.find({ _id: { $in: ordersId }, "products.sellerId": _id });
            if (!getOrderId) {
                const error = new Error('Order not found');
                return res.status(404).json({ error: error.message });
            } else if (getOrderId.length === 0) {
                const error = new Error('You cannot delete this order');
                return res.status(404).json({ error: error.message });
            }

            await Order.deleteMany({ _id: { $in: ordersId } });
            return res.status(200).json({ message: 'Orders deleted successfully' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static getStats = async (req: Request, res: Response) => {
        try {
            const now = Date.now();
            const totalOrders = await Order.countDocuments({
                createdAt: {
                    $gte: new Date(now - 365 * 24 * 60 * 60 * 1000),
                },
            });
            const newOrders = await Order.countDocuments({
                createdAt: {
                    $gte: new Date(now - 7 * 24 * 60 * 60 * 1000),
                },
            });
            const completedOrders = await Order.countDocuments({
                delivered: deliveryStatus.DELIVERED,
            });
            const totalAmountAgg = await Order.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$total_amount" },
                    }
                }
            ]);

            const totalAmount = totalAmountAgg[0]?.total ?? 0;

            const stats = [
                {
                    title: "Total Orders",
                    count: totalOrders,
                    description: "Total Orders last 365 days",
                },
                {
                    title: "New Orders",
                    count: newOrders,
                    description: "New Orders last 7 days",
                },
                {
                    title: "Completed Orders",
                    count: completedOrders,
                    description: "Completed Orders",
                },
                {
                    title: "Total Amount",
                    count: totalAmount,
                    description: "Total revenue",
                },
            ];

            return res.status(200).json(stats);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    static generateShippingGuide = async (req: Request, res: Response) => {
        const { _id } = req.user;
        const { orderId } = req.params;
        const { buyer } = req.body;
        try {
            const orders = await Order.find({ _id: orderId, "products.sellerId": buyer });
            if (!orders) {
                const error = new Error('Order not found');
                return res.status(404).json({ error: error.message });
            }

            const existingGuide = await ShippingGuide.findOne({ guideNumber: orderId });
            if (existingGuide) {
                const error = new Error('Shipping guide already exists for this order');
                return res.status(404).json({ error: error.message });
            }

            await ShippingGuide.create({
                owner: _id,
                buyer,
                ...req.body
            });

            return res.status(200).json({ message: 'Shipping guide created successfully' });

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}