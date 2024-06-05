import { Request } from "express";
import { sendReponseHandler } from "../../utils/sendResponseHandler";
import { tryCatchHandler } from "../../utils/tryCatchHandler";
import { getRequstedBuddiesService, getSingleTravelBuddiesServices, respondTravelReqService } from "./travelBuddies.services";



export const getSingleTravelBuddiesController = tryCatchHandler(
    async (req, res) => {
        const result = await getSingleTravelBuddiesServices(req.headers.authorization as string, req.params); 
    
        sendReponseHandler(res, {
        success: true,
        statusCode: 200,
        message: "Potential travel buddies retrieved successfully",
        data: result
        })
    });



export const respondTravelReqController = tryCatchHandler(
    async (req, res) => {
        const result = await respondTravelReqService(req.headers.authorization as string, req.params, req.body); 
    
        sendReponseHandler(res, {
        success: true,
        statusCode: 200,
        message: "Travel buddy request responded successfully",
        data: result
        })
    });


export const getRequstedBuddiesController = tryCatchHandler(
    async (req: Request & {user?: any}, res) => {
        const result = await getRequstedBuddiesService(req?.user); 
    
        sendReponseHandler(res, {
        success: true,
        statusCode: 200,
        message: "Travel buddy requested Data retrieved successfully",
        data: result
        })
    });