import Router from 'express';

import {userController} from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'
const userRouter = new Router();

userRouter.post('/register', userController.registration );
userRouter.post('/login', userController.login);
userRouter.patch('/auth', authMiddleware, userController.check);

export {userRouter};