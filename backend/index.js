import express from 'express';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connection from './database/connection.js';
import cookieParser from "cookie-parser";
import Logger from './utils/logger.js';
//initialize express server
const app = express();
//initialize environmental congfig
dotenv.config();
//now setting up limit of http request body and urlencoded data
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

///fetching username and password from environmental file .env
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const PORT = process.env.PORT;

connection(username, password);
/* ----middlewares start -----*/
// we must use express takes correct json body or check express request body is json or not
app.use(express.json());
//initialize cookie-parser
app.use(cookieParser());
//initialize cors
app.use(cors({ origin: true, credentials: true }));
//setting up default enpoint for api routes which is
app.use('/api/user', userRoutes);
app.use('/api/student', studentRoutes);
///customized error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "somthing went wrong";
    Logger.error({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
    res.status(errorStatus).send({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})
/* ----middlewares end -----*/

//follwoing will show node js server is running 
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));




