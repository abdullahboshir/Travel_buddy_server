import { prisma } from "../../../Shered/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../../config";

export const userLoginServices = async (payload: any) => {

    const isUserExists = await prisma.user.findUniqueOrThrow({
        where:{
            email: payload.email
        }
    });

const isPassValid = await bcrypt.compare(payload.password, isUserExists.password);

if(!isPassValid){
    throw new Error('Your password deos not match') 
};

const tokenPayload = {
    id: isUserExists.id,
    email: isUserExists.email
};

const accessToken = jwt.sign(tokenPayload, config.jwt.jwt_secret as string, {expiresIn: config.jwt.jwt_expireIn});

    const data = await prisma.user.findUniqueOrThrow({
        where: {
            email: isUserExists.email
        }
    }); 
 
    return {
        data,
       accessToken
    };
};