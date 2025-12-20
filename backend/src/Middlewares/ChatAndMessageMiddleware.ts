import { body } from "express-validator";

export const sendMessageRules = [
    body("chat").isString().withMessage("Chat ID must be a string"),
    body("content").isString().withMessage("Content must be a string"),
    body("senderRole").isIn(["buyer", "seller"]).withMessage("Sender role must be either 'buyer' or 'seller'"),
    body("isRead").isBoolean().withMessage("isRead must be a boolean")
]