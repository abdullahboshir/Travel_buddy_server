import { Request } from "express";
import { sendReponseHandler } from "../../utils/sendResponseHandler";
import { tryCatchHandler } from "../../utils/tryCatchHandler";
import {getTravelerProfileService, getUsersService, updateUserService } from "./user.services";

export const getUsersController = tryCatchHandler(
    async (req, res) => {
        const result = await getUsersService(); 
    
        sendReponseHandler(res, {
        success: true,
        statusCode: 200,
        message: "Users retrieved successfully",
        data: result
        })
    });



    
export const getTravelerProfileController = tryCatchHandler(
    async (req: Request & {user?: any}, res) => {
        const result = await getTravelerProfileService(req.user.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Traveler profile retrieved successfully",
            data: result
        })
    }); 


export const updateUserController = tryCatchHandler(
    async (req, res) => {
     
        const result = await updateUserService(req.params.id, req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Traveler profile retrieved successfully",
            data: result
        })
    }); 


