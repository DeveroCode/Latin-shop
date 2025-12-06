import { Request, Response, NextFunction } from "express";

export async function checkRoles(req: Request, res: Response, next: NextFunction) {
    const user = req.user;

    if (!user) {
        const error = new Error('User not authenticated');
        return res.status(401).json({ error: error.message });
    }

    if (user.role !== 'seller') {
        const error = new Error('User not authorized');
        return res.status(401).json({ error: error.message });
    }

    next();
}