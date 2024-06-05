import { prisma } from "../../../Shered/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../../config";
import { ApiErrors } from "../../errors/ApiErrors";
import httpStatus from "http-status";

export const userLoginServices = async (payload: any) => {

    const isExistUser = await prisma.user.findUnique({
        where: {
            email: payload?.email
        }
    });

    if(!isExistUser){
        throw new ApiErrors(false, httpStatus.NOT_FOUND, 'USER not found!')
    }
    
  
const isPassValid = await bcrypt.compare(payload.password, isExistUser?.password);

if(!isPassValid){
    throw new Error('Your password deos not match') 
};


const tokenPayload = {
    id: isExistUser?.id,
    role: isExistUser?.role,
    email: isExistUser?.email
};

const accessToken = jwt.sign(tokenPayload, config.jwt.jwt_secret as string, {expiresIn: config.jwt.jwt_expireIn});

const refreshToken = jwt.sign(tokenPayload, config.jwt.refresh_token_secret as string, {expiresIn: config.jwt.refresh_token_expirein});

    const data = await prisma.user.findUniqueOrThrow({
        where: {
            email: isExistUser?.email
        }
    }); 
 

    return {
        data,
       accessToken,
       refreshToken
    };
};



export const changePassService = (user: any, payload: any) => {
    
};