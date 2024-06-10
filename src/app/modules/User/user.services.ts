import httpStatus from "http-status";
import { prisma } from "../../../Shered/prisma";
import { ApiErrors } from "../../errors/ApiErrors";


export const getUsersService = async () => {
const result = await prisma.user.findMany({
    select: {
        id :true,
        username :true,
        email: true,
        role: true,
        needPasswordChange: true,
        status: true,
        userProfile: true,
        createdAt: true,
        updatedAt: true
    }
});

return result;
};



export const getTravelerProfileService = async (id: any) => {

    const result = await prisma.user.findFirst({
        where: {
            id: id
        },
        select: {
            id: true,
            username : true,
            email :true,
            role: true,
            status: true,
            needPasswordChange: true,
            createdAt: true,
            updatedAt: true,
            userProfile: true,
        }
    });
    return result;
};



export const updateUserService = async (id: any, payload: any) => {
    let userProfileUpdated;
    let userUpdatedResult;
    const userInfo = await prisma.user.findUnique({
        where: { id: id }
    });
    
    if (!userInfo) {
        throw new ApiErrors(false, httpStatus.FORBIDDEN, 'User Not Found!');
    }
  
  
    const filtered = Object.keys(payload)
      .filter(key => payload[key] !== '' && payload[key] !== null && payload[key] !== undefined && payload[key] !== 0)
      .reduce((obj: any, key) => {
        obj[key] = payload[key];
        return obj;
      }, {});
  

    const userPayload: any = {};
    const userProfilePayload: any = {};
  
    const userKeys = ['email', 'username', 'role', 'status'];
    const userProfileKeys = ['bio', 'age', 'contactNumber', 'address', 'profilePhoto'];
  

    for (const key in filtered) {
      if (userKeys.includes(key)) {
        userPayload[key] = filtered[key];
      } else if (userProfileKeys.includes(key)) {
        userProfilePayload[key] = filtered[key];
      }
    }
  

  
 
    if (Object.keys(userPayload).length > 0) {
      userUpdatedResult = await prisma.user.update({
        where: {
          id
        },
        data: userPayload,
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true
        }
    });
    }
  

    userProfilePayload.needUpdateProfile = false
    if (Object.keys(userProfilePayload).length > 0) {
      userProfileUpdated = await prisma.userProfile.update({
        where: {
          userId: id
        },
        data: userProfilePayload
      });
    }
  
    return {...userProfileUpdated, ...userUpdatedResult};
  };