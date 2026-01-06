import { Router } from "express";
import { createProductRules, getProductByIdRules, toFavorites, updateEnabled, uploadImages } from "../Middlewares/ProductMiddleware";
import { handleInputErrors } from "../utils/validator";
import { ProductController } from "../Controllers/ProductController";
import { authenticate } from "../Middlewares/AuthMiddleware";
import { checkRoles } from "../Middlewares/CheckRoles";

const router: Router = Router();
router.post('/add-to-favorites/:productId', authenticate, toFavorites, handleInputErrors, ProductController.addToFavorites);
router.get('/favorites', authenticate, ProductController.getToFavoites);

router.use(authenticate, checkRoles);
router.get('', ProductController.getProducts);
router.get('/get-products', ProductController.getProducts);
router.post('/create', createProductRules, handleInputErrors, ProductController.create);
router.get('/:id', handleInputErrors, getProductByIdRules, ProductController.getProductById);
router.put('/update/:id', handleInputErrors, createProductRules, ProductController.update);
router.put('/update/product/:productId', handleInputErrors, updateEnabled, ProductController.enabled);
router.put('/upload-images/:id', handleInputErrors, uploadImages, ProductController.uploadImagesProduct);
router.delete('/delete/:id', getProductByIdRules, handleInputErrors, ProductController.delete);

export default router;