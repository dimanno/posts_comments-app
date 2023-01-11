import {ApiError} from'../error/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, userName} = req.body
        if (!email || !password) {
            return ApiError.badRequest('wrong email or password');
        }
        const candidate = await prisma.user.findUnique({where: {email}})
         if (candidate) {
             return ApiError.badRequest('User with this email already exist');
        }
        const hashPassword = await bcrypt.hash(password, 5)
        await prisma.user.create({ data: {
            email, role, password: hashPassword, userName,
        }}).then(user => {
            const token = generateJwt(user.id, user.email, user.role);
            console.log(token)
            return res.json({token});
        });
    }

    async login(req, res, next) {
        const {email, password} = req.body
        await prisma.user.findUnique({where: {email}})
            .then(user => {
                let comparePassword = bcrypt.compareSync(password, user.password)
                if (!comparePassword) {
                    return ApiError.internal('wrong password');
                }
                const token = generateJwt(user.id, user.email, user.role)
                return res.json({token})
            })
            .catch(e => ApiError.internal('User not found'))
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}
export const userController = new UserController();
