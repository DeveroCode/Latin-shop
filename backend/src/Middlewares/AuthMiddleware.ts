import type { Request, Response, NextFunction, Router } from 'express';
import { body, param } from "express-validator";
import User, { IUser } from "../Models/User";
import jwt from "jsonwebtoken";


declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export const userExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      const error = new Error('User does not exist');
      return res.status(404).json({ error: error.message });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({ message: 'User does not exist' });
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    const error = new Error('Token not found');
    return res.status(401).json({ error: error.message });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === 'object' && decoded.id) {
      const user = await User.findById(decoded.id).select('-__v -createdAt -updatedAt -password');

      if (user) {
        req.user = user;
      } else {
        const error = new Error('User not found');
        return res.status(401).json({ error: error.message });
      }
      next();
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export const registerRules = [
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
];

export const loginRules = [
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
]

export const updateRules = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("last_name")
    .notEmpty()
    .withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("role")
    .notEmpty()
    .withMessage("Role is required"),
  body('phone_number')
    .notEmpty()
    .withMessage('Phone number is required'),
  body('address')
    .notEmpty()
    .withMessage('Address is required'),
  body('cp')
    .notEmpty()
    .isNumeric()
    .withMessage('CP must be a number')
    .withMessage('CP is required'),
  body('city')
    .notEmpty()
    .withMessage('City is required'),
  body('country')
    .notEmpty()
    .withMessage('Country is required'),
]

export const addCard = [
  body("cardNumber")
    .notEmpty()
    .withMessage("Card number is required"),
  body("cvv")
    .notEmpty()
    .withMessage("CVV is required"),
  body("expirationDate")
    .notEmpty()
    .withMessage("Expiration date is required"),
  body("type_target")
    .notEmpty()
    .withMessage("Type target is required"),
]

export const updateDefaultCard = [
  body("cardId")
    .notEmpty()
    .withMessage("Card id is required"),
]

export const getDefaultPayment = [
  param("type_target")
    .notEmpty()
    .withMessage("Type target is required")
    .isIn(["debit card", "credit card"])
    .withMessage("Type target is not valid"),
]