import { prisma } from "../../../Shered/prisma";
import bcrypt from 'bcrypt';




export const createTravelerService = async (payload: any) => {
    const {password, ...data} = payload;

    
   
    const isExistUser = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });
    
    payload.password  = payload.password? payload.password : '12345'; 
    
    if(isExistUser){
        return {
            email: isExistUser.email,
            password: payload.password,
            message: 'User already registered'
        }
    };
    
    
    const hashedPass = await bcrypt.hash(payload.password, 12);
    payload.password = hashedPass;
    


const createTraveler = await prisma.$transaction(async (usedTransaction) => {


    const user =  await usedTransaction.user.create({ 
        data: {
            username: payload.username,
            email: payload.email,
            password: payload.password
        },
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        }
    });


    data.userId = user.id;
    const traveler =  await usedTransaction.traveler.create({
        data: data,
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        }
    });


    const createUserProfile = await usedTransaction.userProfile.create({
        data: {
            user: {
                connect: {
                    id: user.id
                }
            },
            age: 0,
            bio: "",
            address: "" 
        }
    });

    return traveler;
});

    return createTraveler;
};


