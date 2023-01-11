import { PrismaClient } from "@prisma/client";
import {ApiError} from'../error/ApiError.js';
import {userController} from './user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'

const prisma = new PrismaClient();

const commentFields = {
    id: true,
    message: true,
    parentId: true,
    createdAt: true,
    user: {
        select: {
            id: true,
            userName: true,
            email: true,
        },
    },
}
export const create = async  (req, res, next) => {
    await prisma.comment.create({
            data: {
                message: req.body.message,
                userId: req.user.id,
                parentId: req.body.parentId,
            },
            select: commentFields,
        })
        .then(comment => {
            return res.status(200).json({
                ...comment,
                likeCount: 0,
                likedByMe: false,
            });
        })
        .catch(e => next(ApiError.badRequest(e.message)));
}
export const getAll = async (req, res, next) => {
    await prisma.comment.findMany({select: commentFields})
        .then(comments => {
            return res.status(200).json(comments)
        })
        .catch(e => next(ApiError.badRequest(e.message)));
}