import type { Request, Response } from "express";
import { v4 as uuid } from 'uuid';
import Product from "../Models/Product";
import Category from "../Models/Category";
import formidable from "formidable";
import cloudinary from "../config/cloudinary";
import Favorite from "../Models/Favorite";


export class ProductController {
  static create = async (req: Request, res: Response) => {
    const { category } = req.body;
    try {
      const existCategory = await Category.findById(category);
      if (!existCategory) {
        const error = new Error("Category does not exist");
        return res.status(404).json({ error: error.message });
      }

      const product = new Product(req.body);
      await product.save();
      res.status(201).json({ message: 'Product created successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static uploadImagesProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const form = formidable({ multiples: true });

    try {
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(400).json({ error: err.message });

        const product = await Product.findById(id);
        if (!product) {
          const error = new Error("Product not found");
          return res.status(404).json({ error: error.message });
        }

        let fileArray: any[] = [];

        if (Array.isArray(files.images)) {
          fileArray = files.images.filter(Boolean);
        } else if (files.images) {
          fileArray = [files.images];
        }

        if (fileArray.length === 0) {
          const error = new Error("No images provided");
          return res.status(400).json({ error: error.message });
        }

        const uploadPromises = fileArray.map((file) =>
          cloudinary.uploader.upload(file.filepath, {
            public_id: uuid(),
            folder: "products",
          })
        );

        const results = await Promise.all(uploadPromises);
        const imageUrls = results.map((r) => r.secure_url);

        product.images = [...(product.images || []), ...imageUrls];
        await product.save();

        res.status(200).json({ message: "Images uploaded successfully" });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, description, price, brand, countInStock } = req.body;

    try {

      const existCategory = await Category.findById(category);
      if (!existCategory) {
        return res.status(404).json({ message: "Category does not exist" });
      }

      const product = await Product.findById(id).populate('category');
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      product.name = name || product.name;
      product.category = category || product.category;
      product.description = description || product.description;
      product.price = price || product.price;
      product.brand = brand || product.brand;
      product.countInStock = countInStock || product.countInStock;
      await product.save();
      res.status(200).json({ message: 'Product updated successfully' });

    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static enabled = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { enabled } = req.body;

    try {
      const product = await Product.findById(productId);
      if (!product) {
        const error = new Error("Product not found");
        return res.status(404).json({ error: error.message });
      }

      product.enabled = enabled;
      await product.save();
      if (enabled) {
        res.status(200).json({ message: 'Product enabled successfully' });
      } else {
        res.status(200).json({ message: 'Product disabled successfully' });
      }

    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static getProducts = async (req: Request, res: Response) => {
    const { id } = req.user
    try {
      const products = await Product.find({ user: id }).populate({
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
  static getOnlyTenProducts = async (req: Request, res: Response) => {
    const { id } = req.user
    try {
      const products = await Product.find({ user: id }).populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt'
      })
        .select('-__v -createdAt -updatedAt').limit(10);
      res.status(200).json(products);
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

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static addToFavorites = async (req: Request, res: Response) => {
    const { _id } = req.user
    const { productId } = req.params
    try {
      const product = await Product.findById(productId);
      const existFavorite = await Favorite.findOne({ user: _id, product: productId });
      const findProductByUser = await Product.find({ user: _id });
      const ownerProduct = findProductByUser.some(
        findProductByUser => findProductByUser.user.toString() === _id
      )
      if (!product) {
        const error = new Error("Product not found");
        return res.status(404).json({ error: error.message });
      } else if (ownerProduct) {
        const error = new Error("You can't add your own product to favorites");
        return res.status(404).json({ error: error.message });
      } else if (existFavorite) {
        const error = new Error("Product already added to favorites");
        return res.status(404).json({ error: error.message });
      }

      await Favorite.create({ user: _id, product: productId });
      res.status(200).json({ message: 'Product added to favorites successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static getToFavoites = async (req: Request, res: Response) => {
    const { _id } = req.user
    try {
      const favorites = await Favorite.find({ user: _id })
        .populate({
          path: 'product',
          select: '-__v -createdAt -updatedAt',
          populate: {
            path: 'category',
            select: '-__v -createdAt -updatedAt'
          }
        })
        .select('-__v -createdAt -updatedAt -user -_id');

      const products = favorites.map(fav => fav.product);
      res.status(200).json(products);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}