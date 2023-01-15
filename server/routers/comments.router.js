import Router from 'express';

import {getAll, create, getOne} from '../controllers/comments.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const commentsRouter = new Router();

commentsRouter.post('/', authMiddleware, create );
commentsRouter.get('/', getAll);
commentsRouter.get('/:id', getOne);
// commentsRouter.patch('/:id', update);

export {commentsRouter};
