import { JwtPayload } from "jsonwebtoken";
import { pick } from "../../../Shered/pick";
import { sendReponseHandler } from "../../utils/sendResponseHandler";
import { tryCatchHandler } from "../../utils/tryCatchHandler";
import { paginationFields, tripFilterAbleFields } from "./trip.constant";
import { createTripService, getTripService, sendBuddyReqServices, updateTripService } from "./trip.services";
import { Request } from "express";


export const craeteTripController = tryCatchHandler( 
    async (req: Request & {user?: any}, res) => {
        const token = req.user as {id: string}
        const result = await createTripService(token, req.body);

        
            sendReponseHandler(res, {
            success: true,
            statusCode: 201,
            message: "Trip created successfully",
            data: result
            })

    });



export const getTripController = tryCatchHandler(
    async (req, res) => {
  
        const filters = pick(req.query, tripFilterAbleFields);
        const pagination = pick(req.query, paginationFields);
    
        const result = await getTripService(filters, pagination);

            sendReponseHandler(res, {
            success: true,
            "statusCode": 200,
            "message": "Trips retrieved successfully",
            meta: result.meta,
            data: result.date
            })

    });


export const updateTripController = tryCatchHandler(
    async (req, res) => {
  
    
        const result = await updateTripService(req.params.tripId, req.body);

            sendReponseHandler(res, {
            success: true,
            "statusCode": 200,
            "message": "Trip updated successfully",
            data: result
            })

    });





export const sendBuddyReqController = tryCatchHandler(
    async (req, res) => {

        const result = await sendBuddyReqServices(req.headers.authorization as string, req.params, req.body);

        
            sendReponseHandler(res, {
            success: true,
            statusCode: 201,
            message: "Travel buddy request sent successfully",
            data: result
            })

    });