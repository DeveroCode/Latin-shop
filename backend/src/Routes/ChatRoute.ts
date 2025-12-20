import { Router } from "express";
import { MessageController } from "../Controllers/MessageController";
import { authenticate } from "../Middlewares/AuthMiddleware";
import { handleInputErrors } from "../utils/validator";
import { getMessagesByChatRules, sendMessageRules } from "../Middlewares/ChatAndMessageMiddleware";

const router: Router = Router();

router.use(authenticate);

router.get('', MessageController.getUserAvaibleChat);
router.post('/send-message', handleInputErrors, sendMessageRules, MessageController.createMessage);
router.get('/messages/:chatId', handleInputErrors, getMessagesByChatRules,MessageController.getMessagesByChat);

export default router