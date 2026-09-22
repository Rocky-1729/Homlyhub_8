//express server setup
import express from 'express';
//importing dotenv to use environment variables
import dotenv from 'dotenv';
//importing cors to handle cross-origin requests
import cors from 'cors';
//importing cookie-parser to parse cookies in requests
import cookieParser from 'cookie-parser';

import {router} from './routes/userRoutes.js';

import connectDB from './utills/db.js';

import {PropertyRouter} from './routes/propertyRouter.js';
import { bookingRouter } from './routes/bookingRouter.js';
 import { tripRouter } from './routes/tripRouter.js';
dotenv.config();
const app = express();
//express.json() middleware to parse incoming JSON requests
app.use(express.json({limit: "100mb"}));
//urlencoded middleware to parse incoming URL-encoded requests
app.use(express.urlencoded({limit: "100mb", extended: true}));
//cors middleware to handle cross-origin requests
//cors middleware to handle cross-origin requests
//cookie-parser middleware to parse cookies in requests
app.use(cookieParser());
const port = process.env.PORT || process.env.Port || 8000;
app.get("/",(req,res)=>{
    res.send("Hello World");
});
app.use("/api/v1/rent/user",router);
app.use("/api/v1/rent/listings",PropertyRouter);
app.use("/api/v1/rent/user/booking", bookingRouter);
app.use("/api/v1/rent/trip",tripRouter);


connectDB();
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});