import { property } from "../Models/propertyModel.js";
import { Booking } from "../Models/bookingModel.js";

// createOrder: booking the property
const createOrder = async (req, res) => {
  const { amount, propertyId, fromDate, toDate, guests } = req.body;

  // order id : order
  const orderId = "order_" + Date.now();
  res.json({
    success: true,
    message: "Order create Successfully",
    orderId,
    amount,
    propertyId,
    fromDate,
    toDate,
    guests,
  });
};

// verify payments
const verifyPayment = async (req, res) => {
  const { orderId, bookingDetails, forceStatus } = req.body;
  if (forceStatus === "Success") {
    const paymentId = "pay_" + Date.now();

    const newBooking = await Booking.create({
      user: req.user._id,
      property: bookingDetails.propertyId,
      price: bookingDetails.price,
      fromDate: bookingDetails.fromDate,
      toDate: bookingDetails.toDate,
      guests: bookingDetails.guests,
      numberOfnights: bookingDetails.nights,
      paid: true,
    });

    const updateproperty = await property.findByIdAndUpdate(
      bookingDetails.propertyId,
      {
        $push: {
          currentBookings: {
            bookingId: newBooking._id,
            fromDate: bookingDetails.fromDate,
            toDate: bookingDetails.toDate,
            userId: req.user._id,
          },
        },
      },
      { new: true },
    );
    res.json({
      success: true,
      message: "payment successful , booking confirmed!!",
      paymentId,
      orderId,
      booking: newBooking,
    });
  } else {
    res.status(400).json({
      success: true,
      message: "payment failed!!",
      orderId,
    });
  }
};

// get my booking

const getUserBookings = async (req, res) => {
  try {
    const booking = await Booking.find({ user: req.user._id });

    res.status(200).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};

//get one booking details
const getbookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.bookingId,
      user: req.user._id,
    });
    res.status(200).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};
export { createOrder, verifyPayment, getUserBookings, getbookingDetails };
