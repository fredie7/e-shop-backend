import express from 'express';
import productController from '../controllers/product';
import productValidation from '../middlewares/validations/productValidation';
import verifyToken, {verifyAsUser, verifyAsAdmin} from '../middlewares/auth';
import { upload } from '../storage';

const router = express.Router();

const { createProductValidation } = productValidation;

const { createProduct, getProducts, getOneProduct } = productController;

router.post('/', verifyToken, upload.single('image'), createProductValidation, createProduct);
router.get('/', getProducts);
router.get('/:productId', getOneProduct);

module.exports = router;

/**
 * GET /products - List product
 * GET /products/{id} - Get single product
 * POST /products - Create a product
 * PUT /products/{id} - Update a product
 * 
 * 
 */