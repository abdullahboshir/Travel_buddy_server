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


const createUser = await prisma.$transaction(async (useTransaction) => {

    const user =  await useTransaction.user.create({
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        }
    });


    const createUserProfile = await useTransaction.userProfile.create({
        data: {
            user: {
                connect: {
                    id: user.id
                }
            },
            age: 0,
            bio: "" 
        }
    });

    return user;
});

    return createUser;
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
    let result;


    if(!token){
        throw new Error('Your are not authorizaed!')
    };

    const decoded = jwt.verify(token, config.jwt.jwt_secret as Secret) as JwtPayload;


    if(payload?.email || payload?.name){
         result = await prisma.user.update({
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
    };

    

    if(payload?.bio || payload?.age){

        result = await prisma.userProfile.update({
            where: {
                userId: decoded.id
            },
            data: payload
        })
    }
    
 
    return result;
};

