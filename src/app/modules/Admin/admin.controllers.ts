import { sendReponseHandler } from "../../utils/sendResponseHandler";
import { tryCatchHandler } from "../../utils/tryCatchHandler";
import { createAdminService } from "./admin.services";



export const createAdminController = tryCatchHandler(
    async (req, res) => {
        const result = await createAdminService(req.body);
       
        sendReponseHandler(res, {
            success: true,
            statusCode: 201,
            message: "Traveler created successfully",
            data: result
            })
    });
