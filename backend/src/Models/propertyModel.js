import slugify from "slugify";
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: [true, "Please enter your property name"],
  },
  description: {
    type: String,
    required: [true, "Please enter your property description"],
  },
  extraInfo: {
    type: String,
    default: "check with the owner for more information",
  },
  propertyType: {
    type: String,
    enum: ["Flat", "House", "Guest House", "Hotel"],
    default: "House",
  },
  roomType: {
    type: String,
    enum: [
      "Room",
      "Entire Home",
      "Entire home",
      "Anytype",
      "Single",
      "Double",
      "Triple",
      "entire",
    ],
    default: "Room",
  },
  maximumGuest: {
    type: Number,
    required: [true, "Please enter maximum number of guests allowed"],
    default: 2,
  },
  amenities: [
    {
      name: {
        type: String,
        required: [true, "Please enter the name of the amenity"],
        enum: [
          "Wifi",
          "TV",
          "Tv",
          "AC",
          "Ac",
          "Heater",
          "Kitchen",
          "Parking",
          "Free Parking",
          "Pool",
          "Washing Machine",
        ],
      },
      icon: {
        type: String,
        required: [true, "Please enter the icon for the amenity"],
      },
    },
  ],
  images: {
    type: [
      {
        public_id: { type: String },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    validate: {
      validator: function (arr) {
        return Array.isArray(arr) && arr.length >= 1;
      },
      message: "Please enter at least 1 image for the property",
    },
  },
  price: {
    type: Number,
    required: [true, "Please enter the price per night value for the property"],
    default: 500,
  },
  address: {
    area: String,
    city: String,
    state: String,
    pincode: Number,
  },
  currentBooking: [
    {
      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
      FormData: {
        type: Date,
      },
      toDate: {
        type: Date,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  slug: String,
  checkInTime: { type: String, default: "12:00 PM" },
  checkOutTime: { type: String, default: "11:00 AM" },
});
propertySchema.pre("save", function (next) {
  if (this.propertyName) {
    this.slug = slugify(this.propertyName, { lower: true });
  }
  if (this.address && this.address.city) {
    this.address.city = this.address.city.toLowerCase().replaceAll(" ", "");
  }
  next();
});
const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);
const property = Property;

export { Property, property };
