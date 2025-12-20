import { Router } from "express";
import { MessageController } from "../Controllers/MessageController";
import { authenticate } from "../Middlewares/AuthMiddleware";
import { handleInputErrors } from "../utils/validator";
import { sendMessageRules } from "../Middlewares/ChatAndMessageMiddleware";

const router: Router = Router();

router.use(authenticate);

router.get('', MessageController.getUserAvaibleChat);
router.post('/send-message', handleInputErrors, sendMessageRules, MessageController.createMessage);

export default router