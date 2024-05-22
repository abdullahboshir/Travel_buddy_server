import { Request, Response } from "express";
import { userLoginServices } from "./auth.services";
import { sendReponseHandler } from "../../utils/sendResponseHandler";
import { tryCatchHandler } from "../../utils/tryCatchHandler";

export const userLoginController = tryCatchHandler(
    async (req: Request, res: Response) => {
        const result = await userLoginServices(req.body);
    
        sendReponseHandler(res, {
        success: true,
        statusCode: 201,
        message: "User Logged in successfully",
        data: {
          
            id:  result.data.id,
            name: result.data.name,
            email: result.data.email,
            token: result.accessToken
        }
        })
    });