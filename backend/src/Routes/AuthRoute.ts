import { Router } from "express";
import { AuthController } from "../Controllers/AuthController";
import { handleInputErrors } from "../utils/validator";
import { authenticate, getDefaultPayment, loginRules, registerRules, updateDefaultCard, updateRules, userExist } from "../Middlewares/AuthMiddleware";

const router: Router = Router();
router.use(handleInputErrors); // Middleware to check if user exist

router.post('/register', registerRules, handleInputErrors, AuthController.register);
router.get('/user', authenticate, AuthController.getUser);
router.post('/login', userExist, loginRules, AuthController.login);
router.put('/update', authenticate, updateRules, AuthController.updateProfile);
router.put('/update/image-profile', authenticate, AuthController.updatePhotoProfile);
router.delete('/delete', authenticate, AuthController.deleteAccount);
router.post('/add-card', authenticate, AuthController.addNewCard);
router.get('/cards', authenticate, AuthController.getCardsPayments);
router.put('/card/default-payment', authenticate, updateDefaultCard, AuthController.selectDefaultTargetPayment);
router.get('/card/getCard', authenticate, AuthController.getDefaultPayment);
router.get('/card/get-payment/:type_target', authenticate, getDefaultPayment, AuthController.getDefaultPayment);

export default router