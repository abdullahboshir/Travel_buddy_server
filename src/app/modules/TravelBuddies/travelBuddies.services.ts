import { prisma } from "../../../Shered/prisma";


export const getSingleTravelBuddiesServices =  async (param: any) => {
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


export const respondTravelReqService = async (param: any, payload: any) => {
    console.log(param, payload)
    const respondReq = await prisma.travelBuddyRequest.update({
        where: {
            id: param,
            tripId: payload.tripId
        },
        data: {
            status :payload.status
        }
    });

    return respondReq;
};