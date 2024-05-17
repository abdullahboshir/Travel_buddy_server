import {TravelBuddyRequest, Trip, status } from "@prisma/client";
import { prisma } from "../../../Shered/prisma";
import { dateFinder } from "../../../Shered/dateFinder";



export const createTripService = async (payload: Trip) => {
    // console.log('dataaaaaaaa', payload)
    
    const createTrip = await prisma.trip.create({
        data: payload
    });

    return createTrip
};


export const getTripService = async (query: any, pagination: any) => {

    const {searchTerm, ...filterData} = query;   
    const condition = [];
 
    const {startDate, endDate, ...stringData} = filterData;

   if(stringData.budget && !NaN){
    stringData.budget = Number(query.budget);
   }
   

if(searchTerm){
    condition.push({
        OR: ['destination'].map(field => ({
            [field]: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        }))
    });
};



if(Object.keys(stringData).length > 0){
    condition.push({
        AND: Object.keys(stringData).map(key => ({
            [key]: {
                equals: stringData[key]
            }
        }))
    })
};


if(startDate && endDate){
    condition.push( {
        OR: [
            {
                startDate: {gte: dateFinder(startDate)}, endDate: {lte: dateFinder(endDate)}
            },
            {
                startDate : {gte: dateFinder(startDate)}, endDate: {lte: dateFinder(endDate)}
            }
        ]
    })
};

console.log('conditonnnnnnnnnnnnnnnnnnnnnnn', condition)

const andCondition  = {AND: condition};


const result = await prisma.trip.findMany({
    where: andCondition
    
});


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