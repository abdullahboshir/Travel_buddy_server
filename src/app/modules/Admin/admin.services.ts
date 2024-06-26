import { UserRole } from "@prisma/client";
import { prisma } from "../../../Shered/prisma";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const createAdminService = async (payload: any) => {
    const {password, ...data} = payload;
    
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
    


const createAdmin = await prisma.$transaction(async (usedTransaction) => {


    const user =  await usedTransaction.user.create({
        data: {
            username: payload.username,
            email: payload.email,
            role: UserRole.ADMIN,
            password: payload.password
        },
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        }
    });


    data.userId = user.id;
    data.username = user.username
    data.email = user.email
    const admin =  await usedTransaction.admin.create({
        data: data,
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        }
    });


    const createUserProfile = await usedTransaction.userProfile.create({
        data: {
            user: {
                connect: {
                    id: user.id
                }
            },
            age: 0,
            bio: "",
            address: "" 
        }
    });

    return admin;
});

    return createAdmin;
};