import { prisma } from "../../../Shered/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

const accessToken = jwt.sign(tokenPayload, '9d676938bff08febbb5de9a9ceb5e624202104991b293c64', {expiresIn: '10d'});

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