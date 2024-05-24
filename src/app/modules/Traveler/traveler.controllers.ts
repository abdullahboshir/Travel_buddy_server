import { Request, Response } from "express";
import { createTravelerService } from "./traveler.services";
import { tryCatchHandler } from "../../utils/tryCatchHandler";


export const createTravelerController = async (req: Request, res: Response) => {
    const result = await createTravelerService(req.body);
    res.status(200).json({
        success: true,
        statusCode: 201,
        message: "Traveler created successfully",
        data: result
    })
};

