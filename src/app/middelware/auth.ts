import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from "../../config";
import { ApiErrors } from "../errors/ApiErrors";
import httpStatus from "http-status";

const auth = (...roles: string[]) => {
return async (req: Request & {user?: any}, res: Response, next: NextFunction) => {
    try {
        let token;
        
        if(req?.headers?.authorization?.includes('Bearer')){  
            token = req.headers.authorization?.split(' ')[1]; 
        }else{
            token = req.headers.authorization;
        }
        
        if(!token){
            throw new ApiErrors(false, httpStatus.UNAUTHORIZED ,'Your are not authorizaed!')
        };
        
        const decoded = jwt.verify(token as string, config.jwt.jwt_secret as Secret) as JwtPayload;
        
        
        if(!decoded){
            throw new ApiErrors(false, httpStatus.FORBIDDEN ,'FORBIDDEN!')
        };
        
      req.user = decoded;

      if(roles.length &&  !roles.includes(decoded.role)){
        throw new ApiErrors(false, httpStatus.FORBIDDEN ,'FORBIDDEN!')
      };

        next();
    } catch (error) {
        next(error)
    }
};
};


export default auth;