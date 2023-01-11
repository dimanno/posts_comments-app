import Router from 'express';

import {getAll, create} from '../controllers/comments.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const commentsRouter = new Router();

commentsRouter.post('/', authMiddleware, create );
commentsRouter.get('/', getAll);
// commentsRouter.patch('/:id', update);

export {commentsRouter};
