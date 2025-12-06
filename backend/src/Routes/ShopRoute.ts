import { Router } from "express";
import { ShopController } from "../Controllers/ShopController";
import { authenticate } from "../Middlewares/AuthMiddleware";
import { handleInputErrors } from "../utils/validator";
import { getProductByIdRules } from "../Middlewares/ProductMiddleware";

const router: Router = Router();

router.get('/search/:word', ShopController.SearchProduct);
router.get('/products', ShopController.allProducts);
router.get('/product/:id', handleInputErrors, getProductByIdRules,ShopController.getProductById);

router.use(authenticate);
router.get('/notifications', ShopController.getNotifications);

export default router