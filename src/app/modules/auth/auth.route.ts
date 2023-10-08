import { UserController } from '../users/users.controller';
import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  UserController.createUser
);
router.post(
  '/signin',
  AuthController.loginUser
);
// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenZodSchema),
//   AuthController.refreshToken
// )

export const AuthRoutes = router;
