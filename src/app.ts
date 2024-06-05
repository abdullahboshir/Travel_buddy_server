import express, {Application} from 'express';
import cors from 'cors';
import router from './app/routes';
import { globalErrorHandler } from './app/middelware/globalErrorHandler';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';


const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get('/', (req, res) => { 
    res.send({
        message : 'Welcome to Travel Buddy Matching App'
    })
});


app.use('/api/v1/', router);

app.use('*', (req, res, next) => {
    res.status(httpStatus.NOT_FOUND).json({
        success : false,
        message :'API not found!',
        errorDetails: {
            path: req.originalUrl,
            message: 'Your request path is not found!'
        }
    });
    next();
});

app.use(globalErrorHandler);

export default app;