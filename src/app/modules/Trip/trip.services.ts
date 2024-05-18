import {TravelBuddyRequest, Trip, status } from "@prisma/client";
import { prisma } from "../../../Shered/prisma";
import { dateFinder } from "../../../Shered/dateFinder";
import { calculatePagination } from "../../helpers/calculatePagination";
import { TMeta } from "../../utils/sendResponseHandler";



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

    const {page, limit, skip, sortBy, sortOrder} = calculatePagination(pagination);

    // console.log('paginationnnnnn data', paginate)
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
                startDate: {gte: dateFinder(startDate)}, endDate: {lte: dateFinder(endDate)}
            },
            {
                startDate : {gte: dateFinder(startDate)}, endDate: {lte: dateFinder(endDate)}
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