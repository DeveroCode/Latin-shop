import { body, param } from "express-validator";

export const OrderProductsRules = [
    body("products").isArray().withMessage("Products must be an array"),
    body("products.*.product").isEmpty().withMessage("Product is required"),
    body("products.*.quantity").isNumeric().withMessage("Quantity must be a number"),
    body("products.*.quantity").custom((value) => value >= 0).withMessage("Quantity must be greater than or equal to 0"),
    body("total_amount").isNumeric().withMessage("Total amount must be a number"),
    body("payment_method").isIn(["cash", "latin card", "debit card", "credit card"]).withMessage("Payment method is not valid"),
]
export const deleteManyOrders = [
  body("ordersId")
    .isArray()
    .withMessage("Order IDs must be an array"),
  body("ordersId.*")
    .isString()
    .withMessage("Order ID must be a string"),
]

export const createShippingGuideRules = [
  param("orderId").isString().withMessage("Order ID must be a string"),
  body("guideNumber").isString().withMessage("Guide number must be a string"),
  body("buyer").isString().withMessage("Buyer ID must be a string"),
  body("comments").isString().withMessage("Comments must be a string"),
  body("references").isString().withMessage("References must be a string"),
  body("totalAmount").isNumeric().withMessage("Total amount must be a number"),
];