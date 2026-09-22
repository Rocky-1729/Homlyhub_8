import express from "express";
const bookingRouter = express.Router();

import{createOrder, verifyPayment, getUserBookings, getbookingDetails} from '../contollers/bookingController.js'
import { protect } from "../contollers/authController.js";

bookingRouter.get("/",protect,getUserBookings);
bookingRouter.get("/:bookingId",protect,getbookingDetails);
bookingRouter.post("/create-order",protect,createOrder);
bookingRouter.post("/verify-payment",protect,verifyPayment);
export{bookingRouter};
