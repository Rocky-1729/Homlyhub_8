// get all properties
// get property based on id

import { Property } from "../Models/propertyModel.js";
import { APIFeatures } from "../utills/APIFeatures.js";
import imagekit from "../utills/ImagekitIO.js";

// get all properties

const getProperties = async (req, res) => {
  try {
    const features = new APIFeatures(Property.find(), req.query)
      .filter()
      .search()
      .paginate();

    const totalProperties = await Property.countDocuments();

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      no_of_responses: totalProperties,
      data: doc,
    });
  } catch (error) {
    console.error("Error searching properties: ", error);
    res.status(500).json({ error: "Internal server Error" });
  }
};

//get property by id
// http://localhost:8080/api/v1/rent/listing/:id
//http://localhost:8080/api/v1/rent/listing/666476848
// req.params.id

const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// CREATE A PROPERTY - an owner adds his house
// take the details, upload every photo to ImageKit,
// keep only the links, then save the house with the owner's
// id attached.
// This route has protect on it, so req.user already exists.
const createProperty = async (req, res) => {
  try {
    // Take the fields out of the body one by one.
    const {
      propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      address,
      amenities,
      checkInTime,
      checkOutTime,
      maximumGuest,
      price,
      images,
    } = req.body;

    if (!propertyName || !description) {
      return res.status(400).json({
        status: "fail",
        message: "Property name and description are required.",
      });
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Please upload at least 1 image for your property.",
      });
    }

    const uploadedImages = [];

    // Go through photos one by one.
    for (const image of images) {
      if (!image || !image.url) continue;

      if (image.url.startsWith("data:")) {
        // Base64 file upload
        const result = await imagekit.upload({
          file: image.url,
          fileName: `property_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`,
          folder: "property_images",
        });
        uploadedImages.push({ url: result.url, public_id: result.fileId });
      } else {
        // Direct URL link
        try {
          const result = await imagekit.upload({
            file: image.url,
            fileName: `property_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`,
            folder: "property_images",
          });
          uploadedImages.push({ url: result.url, public_id: result.fileId });
        } catch (uploadErr) {
          console.warn(
            "ImageKit direct upload failed, preserving original URL:",
            uploadErr.message,
          );
          uploadedImages.push({
            url: image.url,
            public_id: image.public_id || `img_${Date.now()}`,
          });
        }
      }
    }

    if (uploadedImages.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Unable to process uploaded images. Please try again.",
      });
    }

    const property = await Property.create({
      propertyName,
      description,
      propertyType: propertyType || "House",
      roomType: roomType || "Room",
      extraInfo,
      address: address || {},
      amenities: amenities || [],
      checkInTime: checkInTime || "12:00 PM",
      checkOutTime: checkOutTime || "11:00 AM",
      maximumGuest: Number(maximumGuest) || 2,
      price: Number(price) || 1000,
      images: uploadedImages,
      userId: req.user._id || req.user.id,
    });

    res.status(201).json({ status: "success", data: { data: property } });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// GET MY PROPERTIES - the owner's own dashboard
// find every house whose userId is me.
const getUsersProperties = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const property = await Property.find({ userId });
    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

export { getProperties, getProperty, createProperty, getUsersProperties };
