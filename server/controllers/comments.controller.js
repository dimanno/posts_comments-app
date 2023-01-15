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
    updatedAt: true,
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
    await prisma.comment.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            ...commentFields,
            _count: {select: { likes: true } }
        }
    }).then( async comments => {
        const likes = await prisma.like.findMany({
            where: {
                // userId: req.cookies.userId,
                commentId: { in: comments.map(comment => comment.id) }
            }
        })
        return res.status(200).send(
            comments.map(comment => {
                const {_count, ...commentFields} = comment
                return {
                    ...commentFields,
                    likedByMe: likes.find(like => like.commentId === comment.id),
                    likeCount: _count.likes,
                }
            }),
        )
    }).catch(e => next(ApiError.badRequest(e.message))
)}

export const getOne = async (req, res, next) => {
    await prisma.comment.findUnique({
        where: { id: req.params.id },
        select: {
            message: true,
            userId: true,
            children: true,
            likes: true,
            createdAt: true,
            parentId: true,
            updatedAt: true,
            user: {
                select: {
                    id: true,
                    userName: true,
                }
            }
        }
    })
        .then(comment => {
            return res.status(200).json(comment)
        })
        .catch(e => next(ApiError.badRequest(e.message)));
}