import type { Request, Response } from "express";
import Category from "../Models/Category";

export class CategoryController {
    static getAll = async (req: Request, res: Response) => {
      try {
        const categories = await Category.find().select('-__v -createdAt -updatedAt');

        return res.status(200).json(categories);
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
}