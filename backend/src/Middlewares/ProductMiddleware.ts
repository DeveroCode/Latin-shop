import { body, param } from "express-validator";

/** Validation rules for a product */
export const createProductRules = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value >= 0)
    .withMessage("Price cannot be negative"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("countInStock")
    .notEmpty()
    .withMessage("Count in stock is required")
    .isNumeric()
    .withMessage("Count in stock must be a number")
    .custom((value) => value >= 0)
    .withMessage("Count in stock must be greater than or equal to 0"),
];

export const getProductByIdRules = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isString()
    .withMessage("Product ID must be a string"),
];
export const updateEnabled = [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isString()
    .withMessage("Product ID must be a string"),
];

export const uploadImages = [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isString()
    .withMessage("Product ID must be a string"),
  body("images")
    .isArray({ min: 1, max: 4 })
    .withMessage("Images must be an array with between 1 and 4 items")
]
export const toFavorites = [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isString()
    .withMessage("Product ID must be a string")
]
