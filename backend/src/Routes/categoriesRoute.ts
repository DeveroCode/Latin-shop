import { Router } from "express";
import { CategoryController } from "../Controllers/CategoryController";


const router: Router = Router();

router.get('/getAll', CategoryController.getAll);

export default router;