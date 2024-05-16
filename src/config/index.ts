import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), 'env')})

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expireIn: process.env.JWT_EXPIREIN
    }
}