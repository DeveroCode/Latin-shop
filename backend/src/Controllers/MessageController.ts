import { Request, Response } from "express";
import Chat from "../Models/Chat";
import Message from "../Models/Message";
import User from "../Models/User";

export class MessageController {

    static getUserAvaibleChat = async (req: Request, res: Response) => {
        const { _id } = req.user;

        try {
            const chats = await Chat.find({
                $or: [{ seller: _id }, { buyer: _id }]
            })
                .select("seller buyer order lastMessage unreadBy isActive lastMessageAt")
                .populate("seller", "name last_name email role image phone_number")
                .populate("buyer", "name last_name email role image phone_number")
                .populate({
                    path: "order",
                    select: "products createdAt",
                    populate: {
                        path: "products.product",
                        select: "name image user"
                    }
                })
                .lean();

            const response = chats.map((chat: any) => {
                const sellerId = chat.seller._id.toString();

                const products = (chat.order?.products || [])
                    .filter((p: any) => p.product?.user?.toString() === sellerId)
                    .map((p: any) => ({
                        name: p.product.name,
                        image: p.product.image,
                        price: p.price,
                        quantity: p.quantity
                    }));

                return {
                    _id: chat._id,
                    seller: chat.seller,
                    buyer: chat.buyer,
                    lastMessage: chat.lastMessage,
                    unreadBy: chat.unreadBy,
                    isActive: chat.isActive,
                    lastMessageAt: chat.lastMessageAt,
                    order: {
                        createdAt: chat.order?.createdAt,
                        products
                    }
                };
            });

            res.status(200).json({ chats: response });

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static createMessage = async (req: Request, res: Response) => {
        const { chat, sender, senderRole, content, isRead } = req.body;
        try {

            const chatExist = await Chat.findById(chat);
            if (!chatExist) {
                const error = new Error('Chat not found');
                return res.status(404).json({ error: error.message });
            }

            const existUser = await User.findById(sender);
            if (!existUser) {
                const error = new Error('User not found');
                return res.status(404).json({ error: error.message });
            }

            const newMessage = new Message({
                chat,
                sender,
                senderRole,
                content,
                isRead
            })

            await newMessage.save();
            res.status(201).json({ message: 'Message created successfully'});
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static getMessagesByChat = async (req: Request, res: Response) => {
        const { chatId } = req.params;
        const { _id } = req.user;
      try {
        const messages = await Message.find({ chat: chatId }, {sender: _id} ).sort({ createdAt: -1 })
            .populate("sender", "name last_name image -_id")
            .select("sender senderRole content isRead createdAt");
        res.status(200).json({messages});
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
}
