import Router from 'express';

import {commentsRouter} from './comments.router.js';
import {userRouter} from './user.router.js';

const router = new Router();

router.use('/comments', commentsRouter);
router.use('/user', userRouter);

export {router}