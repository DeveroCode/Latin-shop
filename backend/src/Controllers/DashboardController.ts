import { Request, Response } from "express";
import Order from "../Models/Order";

export class DashboardController {
    static KPIDashboard = async (req: Request, res: Response) => {
        try {
            const result = await Order.aggregate([
                {
                    $match: {
                        is_payment: true,
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalRevenues: { $sum: "$total_amount" },
                    },
                },
            ]);

            const totalRevenues = result[0]?.totalRevenues ?? 0;
            const totalOrders = await Order.countDocuments();
            const resultCustomers = await Order.aggregate([
                {
                    $group: {
                        _id: "$user",
                    },
                },
                {
                    $count: "totalCustomers",
                },
            ]);

            const totalCustomers = resultCustomers[0]?.totalCustomers ?? 0;
            const pendingOrders = await Order.countDocuments({ status: 'pending' });

            const stats = [
                {
                    title: 'Total Revenues',
                    count: totalRevenues,
                    description: 'Last 24 hours'
                },
                {
                    title: 'Toal orders',
                    count: totalOrders,
                    description: 'Last 24 hours'
                },
                {
                    title: 'Total customers',
                    count: totalCustomers,
                    description: 'Last 24 hours'
                },
                {
                    title: 'Pending orders',
                    count: pendingOrders,
                    description: 'Last 24 hours'
                },
            ];

            return res.status(200).json(stats);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static chartsMain = async (req: Request, res: Response) => {
        const days = parseInt(req.params.days || "7");

        try {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - (days - 1));

            const data = await Order.aggregate([
                {
                    $match: {
                        is_payment: true,
                        createdAt: { $gte: startDate },
                    },
                },
                {
                    $group: {
                        _id: {
                            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                        },
                        revenue: { $sum: "$total_amount" },
                        orders: { $sum: 1 },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            const dataMap = new Map(
                data.map(item => [item._id, item])
            );

            const labels: string[] = [];
            const revenue: number[] = [];
            const orders: number[] = [];

            const today = new Date();

            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const key = date.toISOString().slice(0, 10);

                labels.push(key);
                revenue.push(dataMap.get(key)?.revenue ?? 0);
                orders.push(dataMap.get(key)?.orders ?? 0);
            }

            const chartData = {
                labels,
                series: {
                    revenue,
                    orders,
                },
            };

            return res.status(200).json(chartData);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

}