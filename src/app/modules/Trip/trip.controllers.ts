import { sendReponseHandler } from "../../utils/sendResponseHandler";
import { tryCatchHandler } from "../../utils/tryCatchHandler";
import { createTripService, getTripService, sendBuddyReqServices } from "./trip.services";


export const craeteTripController = tryCatchHandler(
    async (req, res) => {
        const result = await createTripService(req.body);

        
            sendReponseHandler(res, {
            success: true,
            statusCode: 201,
            message: "Trip created successfully",
            data: result
            })

    });



export const getTripController = tryCatchHandler(
    async (req, res) => {
        const result = await getTripService(req.query);

        
            sendReponseHandler(res, {
            success: true,
            statusCode: 201,
            message: "Trip created successfully",
            data: result
            })

    });


export const sendBuddyReqController = tryCatchHandler(
    async (req, res) => {
        console.log('reqqqqqqqqqqqq', req.params.tripId)
        const result = await sendBuddyReqServices(req.params, req.body);

        
            sendReponseHandler(res, {
            success: true,
            statusCode: 201,
            message: "Travel buddy request sent successfully",
            data: result
            })

    });