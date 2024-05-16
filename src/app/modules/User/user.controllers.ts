import { Request, Response } from "express";
import { createUserServices, getUserProfileService } from "./user.services";
import { tryCatchHandler } from "../../utils/tryCatchHandler";


export const createUserController = async (req: Request, res: Response) => {
    const result = await createUserServices(req.body);
    res.status(200).json({
        success: true,
        statusCode: 201,
        message: "User created successfully",
        data: result
    })
};


export const getUserProfileController = tryCatchHandler(
    async (req, res) => {
        const result = await getUserProfileService(req.headers.authorization);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User profile retrieved successfully",
            data: result
        })
    }); 


