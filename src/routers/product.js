import express from 'express';
import productController from '../controllers/product';
import productValidation from '../middlewares/validations/productValidation';
import verifyToken, {verifyAsUser, verifyAsAdmin} from '../middlewares/auth';
import { upload } from '../storage';

const router = express.Router();

const { createProductValidation } = productValidation;

const { createProduct, getProducts, getOneProduct } = productController;

router.post('/createProduct', verifyToken, upload.single('image'), createProductValidation, createProduct);
router.get('/getProducts', getProducts);
router.get('/product/:productId', getOneProduct);

module.exports = router;