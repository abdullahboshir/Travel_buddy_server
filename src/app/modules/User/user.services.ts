import { prisma } from "../../../Shered/prisma";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from "../../../config";

export const createUserServices = async (payload: any) => {

    const isExistUser = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });

    if(isExistUser){
        return {
            message: 'User already registered'
        }
    };

const hashedPass = await bcrypt.hash(payload.password, 12);
payload.password = hashedPass;

    const result = await prisma.user.create({
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        }
    });
    return result;
};


export const getUserProfileService = async (token: any) => {

    if(!token){
        throw new Error('Your are not authorizaed!')
    };

    const decoded = jwt.verify(token, config.jwt.jwt_secret as Secret) as JwtPayload;

    const result = await prisma.user.findFirst({
        where: {
            id: decoded.id 
        },
        select: {
            id: true,
            name : true,
            email :true,
            createdAt: true,
            updatedAt: true
        }
    });
    return result;
};


export const updateUserService = async (token: any, payload: any) => {

    if(!token){
        throw new Error('Your are not authorizaed!')
    };

    const decoded = jwt.verify(token, config.jwt.jwt_secret as Secret) as JwtPayload;

    const result = await prisma.user.update({
        where: {
            id: decoded.id 
        },
        data: payload,
        select: {
            id: true,
            name : true,
            email :true,
            createdAt: true,
            updatedAt: true
        }
    });
    return result;
};

