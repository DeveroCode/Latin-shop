import { Router } from "express";
import { OrdersController } from "../Controllers/OrdersController";
import { authenticate } from "../Middlewares/AuthMiddleware";
import { handleInputErrors } from "../utils/validator";
import { OrderProductsRules } from "../Middlewares/OrderMiddleware";

const router: Router = Router();
router.use(authenticate);

router.get('', OrdersController.getOrders);
router.post('/create', handleInputErrors, OrderProductsRules,OrdersController.createOrder);

export default router