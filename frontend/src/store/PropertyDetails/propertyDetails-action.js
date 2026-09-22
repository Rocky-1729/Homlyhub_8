import { propertyDetailsActions } from "./propertyDetail-slice.js";
import { axiosInstance } from "../../utils/axios.js";

//fetch detail of one specific property using property id

//recv property id
// start loading
//call backend api
//wait for response
//get property data
//store data in redux
//if error occurs=> send error to redux

export const getPropertyDetails = (propertyId) => async (dispatch) => {
  try {
    dispatch(propertyDetailsActions.getListRequest());
    const response = await axiosInstance.get(`/v1/rent/listings/${propertyId}`);
    console.log("property details response:", response.data);
    if (!response) {
      throw new Error("could not fetch property details");
    }
    dispatch(propertyDetailsActions.getpropertyDetails(response.data.data));
  } catch (error) {
    dispatch(
      propertyDetailsActions.getErrors(
        error.response?.data?.error || error.message,
      ),
    );
  }
};
