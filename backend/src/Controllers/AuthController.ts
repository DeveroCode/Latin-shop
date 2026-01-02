import type { Request, Response } from "express";
import User from "../Models/User";
import { checkPassword, hashPassword } from "../utils";
import { generateJWT } from "../utils/jwt";
import formidable from "formidable";
import cloudinary from "../config/cloudinary";
import { v4 as uuid } from 'uuid';
import Product from "../Models/Product";
import Card from "../Models/Card";

export class AuthController {

  static getUser = async (req: Request, res: Response) => {
    try {
      return res.status(200).json(req.user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static register = async (req: Request, res: Response) => {
    const { password, email } = req.body;
    try {
      const existUser = await User.findOne({ email });
      if (existUser) {
        const error = new Error('User already exist');
        return res.status(404).json({ error: error.message });
      }
      const user = new User(req.body);
      user.password = await hashPassword(password);
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        const error = new Error('User does not exist');
        return res.status(404).json({ error: error.message });
      }

      const passwordIsCorrect = await checkPassword(password, user.password);
      if (!passwordIsCorrect) {
        const error = new Error('Password is incorrect');
        return res.status(404).json({ error: error.message });
      }

      const token = generateJWT({ id: user.id });
      res.status(200).json({ message: `Welcome ${user.name}`, token });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static updateProfile = async (req: Request, res: Response) => {
    const { id } = req.user
    const { name, email, role, phone_number, last_name, address, cp, city, country } = req.body
    try {
      const user = await User.findById(id);

      user.name = name || user.name;
      user.last_name = last_name || user.last_name;
      user.email = email || user.email;
      user.role = role || user.role;
      user.phone_number = phone_number || user.phone_number;
      user.address = address || user.address;
      user.cp = cp || user.cp;
      user.city = city || user.city;
      user.country = country || user.country;

      await user.save();
      res.status(200).json({ message: 'User updated successfully' });
    } catch (e) {
      throw new Error('Error updating user');
    }
  }

  static updatePhotoProfile = async (req: Request, res: Response) => {
    const form = formidable({ multiples: true });
    try {
      form.parse(req, (error, fields, files) => {
        cloudinary.uploader.upload(files.image[0].filepath, { public_id: uuid(), folder: 'profiles' }, async (error, result) => {
          if (error) {
            const error = new Error('Image could not be uploaded');
            return res.status(404).json({ error: error.message });
          }

          if (result) {
            req.user.image = result.secure_url;
            await req.user.save();
            res.status(200).json({ message: 'Image uploaded successfully' });
          }
        })
      })
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static deleteAccount = async (req: Request, res: Response) => {
    const { id } = req.user
    try {
      await User.findByIdAndDelete(id);
      await Product.deleteMany({ user: id });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static addNewCard = async (req: Request, res: Response) => {
    const { id } = req.user
    try {
      const user = await User.findById(id);
      if (!user) {
        const error = new Error('User not found');
        return res.status(404).json({ error: error.message });
      }

      const card = await new Card({ ...req.body, user: id });
      await card.save();
      res.status(200).json({ message: 'Card added successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static getCardsPayments = async (req: Request, res: Response) => {
    const { id } = req.user
    try {
      const cards = await Card.find({ user: id }).select('-__v -createdAt -updatedAt -user').sort({ createdAt: 1 });
      return res.status(200).json(cards);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static selectDefaultTargetPayment = async (req: Request, res: Response) => {
    const { id } = req.user
    const { cardId } = req.body
    try {
      const card = await Card.findOne({ _id: cardId, user: id });

      if (!card) {
        const error = new Error('Card not found');
        return res.status(404).json({ error: error.message });
      }

      await Card.updateMany({ user: id, type_target: card.type_target }, { $set: { default: false } });

      card.default = true;
      await card.save();
      res.status(200).json({ message: 'Card selected successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static getDefaultPayment = async (req: Request, res: Response) => {
    const { id } = req.user
    const { type_target } = req.params
    try {
      const safeType = decodeURIComponent(type_target);
      const card = await Card.findOne({ user: id, default: true, type_target: safeType }).select('-__v -createdAt -updatedAt -user');
      if (!card) {
        const error = new Error('Card not found, please add a card or select one');
        return res.status(404).json({ error: error.message });
      }
      return res.status(200).json({ card });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}