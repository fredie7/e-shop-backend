import express from 'express';
import authController from '../controllers/auth';
import validateSignup from '../middlewares/validations/signupValidation';
import validateSignin from '../middlewares/validations/signinValidation';

const router = express.Router();

const { signup, signin } = authController;
const { signupValidation } = validateSignup
const { signInValidation } = validateSignin;

router.post('/signup', signupValidation, signup);
router.post('/signin', signInValidation, signin);


module.exports = router;