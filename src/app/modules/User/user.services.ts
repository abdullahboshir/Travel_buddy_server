import httpStatus from "http-status";
import { prisma } from "../../../Shered/prisma";
import { ApiErrors } from "../../errors/ApiErrors";

export const getUsersService = async () => {
const result = await prisma.user.findMany({
    select: {
        id :true,
        username :true,
        role: true,
        needPasswordChange: true,
        status: true,
        createdAt: true,
        updatedAt: true
    }
});
return result;
};



// export const getUsersService = async (token: any) => {

//     if(!token){
//         throw new Error('Your are not authorizaed!')
//     };
    

//     const decoded = jwt.verify(token, config.jwt.jwt_secret as Secret) as JwtPayload;

//     const result = await prisma.user.findFirst({
//         where: {
//             id: decoded.id 
//         },
//         select: {
//             id: true,
//             username : true,
//             email :true,
//             createdAt: true,
//             updatedAt: true
//         }
//     });
//     return result;
// };



export const updateUserService = async (id: any, payload: any) => {
    let result;

    const userInfo = await prisma.user.findUnique({
        where: {id: id}
    });

    if(!userInfo){
        throw new ApiErrors(false, httpStatus.FORBIDDEN ,'User Not Found!')
    };


    if(payload?.email || payload?.username || payload?.role || payload?.status){
         result = await prisma.user.update({
            where: {
                id
            },
            data: payload,
            select: {
                id: true,
                username : true,
                email :true,
                role: true, 
                status: true,
                createdAt: true,
                updatedAt: true 
            }
        });
    };

    

    if(payload?.bio || payload?.age){

        result = await prisma.userProfile.update({
            where: {
                userId: id
            },
            data: payload
        })
    }
    
 
    return result;
};

