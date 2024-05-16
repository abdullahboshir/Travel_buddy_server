import { TravelBuddyRequest, Trip, UserProfile, status } from "@prisma/client";
import { prisma } from "../../../Shered/prisma";


export const createTripService = async (payload: Trip) => {
    // console.log('dataaaaaaaa', payload)
    
    const createTrip = await prisma.trip.create({
        data: payload
    });

    return createTrip
};


export const getTripService = async (query: any) => {
    console.log('queryyyyyyyyyyyyy', query);
    let result;

   if(Object.keys(query).length >= 0){
    result = await prisma.trip.findMany({});
   };


    return result;
};


export const sendBuddyReqServices = async (param: any, payload: TravelBuddyRequest) => {
    const sendReq = await prisma.travelBuddyRequest.create({
        data : {
            tripId: param.tripId,
            userId: payload.userId,
            status: status.PENDING
        }
    });

    return sendReq; 
};