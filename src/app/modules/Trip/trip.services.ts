import {RequestStatus, TravelBuddyRequest, UserStatus } from "@prisma/client";
import { prisma } from "../../../Shered/prisma";
import { calculatePagination } from "../../helpers/calculatePagination";
import { TMeta } from "../../utils/sendResponseHandler";
import { ApiErrors } from "../../errors/ApiErrors";
import httpStatus from "http-status";
import  jwt  from "jsonwebtoken";
import config from "../../../config";
import { parseDate } from "../../../Shered/dateFinder";



export const createTripService = async (token: {id: string}, payload: any) => {
    
    if(!token){ 
        throw new ApiErrors(false, httpStatus.FORBIDDEN, "Unauthorized Access");
    };
    
    const isExistUser = await prisma.user.findUnique({
        where: {
            id:  token.id
        }
    });
    
    if(!isExistUser){
        throw new ApiErrors(false, httpStatus.NOT_FOUND, 'USER not found!')
    }
    
    
    payload.startDate = parseDate(payload.startDate);
    payload.endDate = parseDate(payload.endDate);
    payload.userId = isExistUser.id
    
    
    console.log('payloaddddddddddd', payload)
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
                equals: stringData[key],
                mode: 'insensitive'
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



export const updateTripService = async (id: any, payload: any) => {
    const userInfo = await prisma.trip.findUnique({
      where: { id: id }
    });
  
    if (!userInfo) {
      throw new ApiErrors(false, httpStatus.FORBIDDEN, 'Trip Not Found!');
    };
  
    const filtered = Object.keys(payload)
      .filter(key => payload[key] !== '' && payload[key] !== null && payload[key] !== undefined && payload[key] !== 0)
      .reduce((obj: any, key) => {
        obj[key] = payload[key];
        return obj;
      }, {});
  

    if (filtered.startDate) {
      filtered.startDate = parseDate(filtered.startDate);
    }
    if (filtered.endDate) {
      filtered.endDate = parseDate(filtered.endDate);
    }
  
  
    const result = await prisma.trip.update({
      where: {
        id
      },
      data: filtered,
    });
  
    return result;
  };




export const sendBuddyReqServices = async (user: any, param: any, payload: TravelBuddyRequest) => {
    if(!user){
        throw new ApiErrors(false, httpStatus.FORBIDDEN, "Unauthorized Access",)
    };


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
    
    console.log('got travel information', isExisTrip)
    if(!isExisTrip){
        throw new ApiErrors(false, httpStatus.NOT_FOUND, 'TRIP not found!')
    };
 

    const sendReq = await prisma.travelBuddyRequest.create({
        data : {
            tripId: param.tripId,
            userId: payload.userId,
            status: RequestStatus.PENDING
        }
    });

    return sendReq; 
};



export const getSingleTripService = async (params: string) => {
    const result = await prisma.trip.findUnique({
        where: {
            id: params
        }
    });
    return result;
};


export const getUserTripService = async (user: any) => {
    
    if (!user?.id) {
        throw new Error('User ID is required');
    }
    
    const result = await prisma.trip.findMany({
        where: {
            userId: user.id,
        },
    });
    console.log('userrrrrrrrrrrrrrr', result);
  
    return result;
  }


export const deleteTripService = async (id: any, user: any) => {

    if(!user){
        throw new ApiErrors(false, httpStatus.FORBIDDEN, "Unauthorized Access",)
    };


    const isExistUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    });

    if(!isExistUser){
        throw new ApiErrors(false, httpStatus.NOT_FOUND, 'USER not found!')
    };
    
    
    const isExisTrip = await prisma.trip.findUnique({
        where: {
            id
        }
    });
    
    if(!isExisTrip){
        throw new ApiErrors(false, httpStatus.NOT_FOUND, 'TRIP not found!')
    };

    
    const deletedTrip = await prisma.trip.delete({
        where: {
            id: id
        }
    })

    return deletedTrip;
  }