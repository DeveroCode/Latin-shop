import type { Request, Response } from 'express';
import Product from '../Models/Product';

import NotificationModel from '../Models/Notification';
export class ShopController {

    static allProducts = async (req: Request, res: Response) => {
        try {
            const products = await Product.find().populate({
                path: 'category',
                select: '-__v -createdAt -updatedAt'
            })
                .select('-__v -createdAt -updatedAt');
            res.status(200).json(products);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static SearchProduct = async (req: Request, res: Response) => {
        const { word } = req.params;
        try {
            const products = await Product.find({ name: { $regex: word, $options: 'i' } }).populate({
                path: 'category',
                select: '-__v -createdAt -updatedAt'
            }).select('-__v -createdAt -updatedAt');

            if (!products) {
                const error = new Error('Products not found');
                return res.status(404).json({ error: error.message });
            }

            return res.status(200).json(products);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static getProductById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const product = await Product.findById(id).populate({
                path: 'category',
                select: '-__v -createdAt -updatedAt -name'
            }).select('-__v -createdAt -updatedAt');
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static getNotifications = async (req: Request, res: Response) => {
        const { id } = req.user
        try {
            const notifications = await NotificationModel.find({ user: id }).select('-__v -updatedAt -user').sort({ createdAt: -1 });
            return res.status(200).json({notifications});
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}