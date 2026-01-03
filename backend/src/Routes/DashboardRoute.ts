import { Router } from "express";
import { authenticate } from "../Middlewares/AuthMiddleware";
import { handleInputErrors } from "../utils/validator";
import { DashboardController } from "../Controllers/DashboardController";

const router: Router = Router();
router.use(authenticate);

router.get('', DashboardController.KPIDashboard)
router.get('/main/:days', DashboardController.chartsMain);
router.get('/actual/sales', DashboardController.actualSales);

export default router;