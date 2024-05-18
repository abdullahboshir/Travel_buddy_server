import { Response } from "express";

export type TMeta =  {
    page: number,
    limit: number,
    total: number
}

type TResponse<T> = {
    success: boolean;
    statusCode: number;
    message: string;
    meta?: TMeta | undefined;
    data: T | null | undefined
};

export const sendReponseHandler = <T>(res: Response, data: TResponse<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        meta: data?.meta || null || undefined,
        data: data.data || null || undefined
    })
};