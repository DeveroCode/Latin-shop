import { Router } from "express";
import { OrdersController } from "../Controllers/OrdersController";
import { authenticate } from "../Middlewares/AuthMiddleware";
import { handleInputErrors } from "../utils/validator";
import { createShippingGuideRules, deleteManyOrders, OrderProductsRules } from "../Middlewares/OrderMiddleware";

const router: Router = Router();
router.use(authenticate);

router.get('', OrdersController.getOrders);
router.get('/stats', OrdersController.getStats);
router.post('/create', handleInputErrors, OrderProductsRules,OrdersController.createOrder);
router.delete('/delete/orders', handleInputErrors, deleteManyOrders,OrdersController.deleteManyOrders);
router.post('/generate/shipping/:orderId', handleInputErrors, createShippingGuideRules,OrdersController.generateShippingGuide);

export default router