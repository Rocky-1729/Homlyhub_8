import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    paid: {
      type: Boolean,
      default: true,
    },
    fromDate: {
      type: Date,
    },
    toDate: {
      type: Date,
    },
    guests: {
      type: Number,
    },
    numberOfnights: {
      type: Number,
    },
  },
  { timestamps: true },
);

bookingSchema.pre(/^find/, function () {
  this.populate("user");
  this.populate({
    path: "property",
    select: "maximumGuest images propertyName address",
  });
});

const Booking = mongoose.model("Booking", bookingSchema);
export { Booking };
