import { sendReponseHandler } from "../../utils/sendResponseHandler";
import { tryCatchHandler } from "../../utils/tryCatchHandler";
import { getSingleTravelBuddiesServices, respondTravelReqService } from "./travelBuddies.services";



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