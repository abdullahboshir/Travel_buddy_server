import httpStatus from "http-status";
import { prisma } from "../../../Shered/prisma";
import { ApiErrors } from "../../errors/ApiErrors";
import config from "../../../config";
import jwt from "jsonwebtoken";



export const getSingleTravelBuddiesServices =  async (token: string, param: any) => {

    if(!token){
        throw new ApiErrors(false, httpStatus.FORBIDDEN, "Unauthorized Access",) 
    };



    const isExisTrip = await prisma.trip.findUnique({
        where: {
            id: param.tripId
        }
    });

    if(!isExisTrip){
        throw new ApiErrors(false, httpStatus.NOT_FOUND, 'TRIP not found!')
    };
 

    const getTrip = await prisma.travelBuddyRequest.findFirst({
        where: param, 
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
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



export const getRequstedBuddiesService = async (user: any) => {

    if(!user){ 
        throw new ApiErrors(false, httpStatus.FORBIDDEN, "Unauthorized Access");
    };
    
    const isExistUser = await prisma.user.findUnique({
        where: {
            id:  user.id
        }
    });
    
    if(!isExistUser){
        throw new ApiErrors(false, httpStatus.NOT_FOUND, 'USER not found!')
    }
    

    const tripReqStatus = await prisma.travelBuddyRequest.findMany({
        where: {
            id: user?.id,
        },
    });

    return tripReqStatus;
};