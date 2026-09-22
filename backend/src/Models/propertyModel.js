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
    enum: ["Single", "Double", "Triple", "entire"],
    default: "Single",
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
          "Heater",
          "Kitchen",
          "Parking",
          "Pool",
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
    validate: function (arr) {
      return arr.length >= 6;
    },
    message: "Please enter at least 6 images for the property",
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
  this.slug = slugify(this.propertyName, { lower: true });
  next();
});
propertySchema.pre("save", function (next) {
  this.address.city = this.address.city.toLowerCase().replaceAll(" ", "");
  next();
});
const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);
const property = Property;

export { Property, property };
