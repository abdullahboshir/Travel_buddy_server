import httpStatus from "http-status";
import { prisma } from "../../../Shered/prisma";
import { ApiErrors } from "../../errors/ApiErrors";
import config from "../../../config";
import jwt from "jsonwebtoken";


export const getSingleTravelBuddiesServices =  async (token: string, param: any) => {

    if(!token){
        throw new ApiErrors(false, httpStatus.FORBIDDEN, "Unauthorized Access",)
    };

    const verifyToken = jwt.verify(token, config.jwt.jwt_secret as string);
 

    const getTrip = await prisma.travelBuddyRequest.findFirst({
        where: param, 
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        }
    });

    return getTrip;
};


export const respondTravelReqService = async (token: string, param: any, payload: any) => {
    if(!token){
        throw new ApiErrors(false, httpStatus.FORBIDDEN, "Unauthorized Access",)
    };

    const verifyToken = jwt.verify(token, config.jwt.jwt_secret as string);


    const respondReq = await prisma.travelBuddyRequest.update({
        where: {
            id: param.buddyId,
            tripId: payload.tripId
        },
        data: {
            status : payload.status
        }
    });

    return respondReq;
};