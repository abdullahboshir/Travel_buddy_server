import { Request, Response } from "express";
import { changePasswordService, userLoginServices } from "./auth.services";
import { sendReponseHandler } from "../../utils/sendResponseHandler";
import { tryCatchHandler } from "../../utils/tryCatchHandler";
import { createTravelerService } from "../Traveler/traveler.services";
import httpStatus from "http-status";

export const userLoginController = tryCatchHandler(
    async (req: Request, res: Response) => {
       

      if(!req?.body?.password){
          const gUserRegister = await createTravelerService(req.body);
          const gUserInfo = {
            email: gUserRegister?.email,
            password: '12345'
        };
       
        req.body = gUserInfo
      };


        const result = await userLoginServices(req.body);

      res.cookie('refreshToken', result.refreshToken, {
            secure : false,
            httpOnly: true
        });
    
        console.log(result)
        sendReponseHandler(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged in successfully",
        data: {
            id:  result.data.id,
            accessToken: result.accessToken,
            role: result?.data?.role,
            needPasswordChange: result.data.needPasswordChange
        }
        })
    });



export const changePasswordController = tryCatchHandler(
    async (req: Request & {user?: any}, res: Response) => {
        const result = await changePasswordService(req?.user, req.body);
    
        sendReponseHandler(res, {
        success: true,
        statusCode: 201,
        message: "Password changed successfully",
        data: {
          result
            // id:  result.data.id,
            // name: result.data.username,
            // email: result.data.email,
            // token: result.accessToken
        }
        })
    });