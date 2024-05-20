import {TravelBuddyRequest, Trip, status } from "@prisma/client";
import { prisma } from "../../../Shered/prisma";
import { calculatePagination } from "../../helpers/calculatePagination";
import { TMeta } from "../../utils/sendResponseHandler";
import { ApiErrors } from "../../errors/ApiErrors";
import httpStatus from "http-status";
import  jwt  from "jsonwebtoken";
import config from "../../../config";
import { parseDate } from "../../../Shered/dateFinder";



export const createTripService = async (token: string, payload: any) => {

    if(!token){
        throw new ApiErrors(false, httpStatus.FORBIDDEN, "Unauthorized Access",)
    };

    const verifyToken = jwt.verify(token, config.jwt.jwt_secret as string);

    const isExistUser = await prisma.user.findUnique({
        where: {
            id: payload.userId
        }
    });

    if(!isExistUser){
        throw new ApiErrors(false, httpStatus.NOT_FOUND, 'USER not found!')
    }

   
    payload.startDate = parseDate(payload.startDate);
    payload.endDate = parseDate(payload.endDate);


    
    const createTrip = await prisma.trip.create({
        data: payload
    });

    return createTrip
};


export const getTripService = async (query: any, pagination: any) => {

    const {searchTerm, ...filterData} = query;   
    const condition = [];

    const {page, limit, skip, sortBy, sortOrder} = calculatePagination(pagination);


    const {startDate, endDate, minBudget, maxBudget, ...stringData} = filterData;

   if(stringData.budget && !NaN){
    stringData.budget = Number(query.budget);
   }else if(minBudget && !NaN && maxBudget && !NaN){
    query.minBudget = Number(minBudget);
    query.maxBudget = Number(maxBudget);
   };

  
   

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
                startDate: {gte: parseDate(startDate)}, endDate: {lte: parseDate(endDate)}
            },
            {
                startDate : {gte: parseDate(startDate)}, endDate: {lte: parseDate(endDate)}
            }
        ]
    })
};


if(minBudget && maxBudget){
    condition.push( {
            budget: {
                gte: query.minBudget, 
                lte: query.maxBudget
            }  
    })
};


const andCondition  = {AND: condition};


const result = await prisma.trip.findMany({
    where: andCondition,
    skip,
    take: limit,
    orderBy: pagination.sortBy && pagination.sortOrder? {
        [pagination.sortBy]: pagination.sortBy
    } : {
        destination: pagination.sortOrder
    }
});

const total = await prisma.trip.count({
    where: andCondition
});

const meta: TMeta = {
    page,
    limit,
    total
}

    return {
        meta,
        date: result
    };
};


export const sendBuddyReqServices = async (token: string, param: any, payload: TravelBuddyRequest) => {

    if(!token){
        throw new ApiErrors(false, httpStatus.FORBIDDEN, "Unauthorized Access",)
    };

    const verifyToken = jwt.verify(token, config.jwt.jwt_secret as string);


    const isExistUser = await prisma.user.findUnique({
        where: {
            id: payload.userId
        }
    });

    if(!isExistUser){
        throw new ApiErrors(false, httpStatus.NOT_FOUND, 'USER not found!')
    };


    const isExisTrip = await prisma.trip.findUnique({
        where: {
            id: param.tripId
        }
    });

    if(!isExisTrip){
        throw new ApiErrors(false, httpStatus.NOT_FOUND, 'TRIP not found!')
    };
 

    const sendReq = await prisma.travelBuddyRequest.create({
        data : {
            tripId: param.tripId,
            userId: payload.userId,
            status: status.PENDING
        }
    });

    return sendReq; 
};