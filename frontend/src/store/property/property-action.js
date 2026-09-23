import { propertyActions } from "./property-slice";
import { axiosInstance } from "../../utils/axios";

// get all properties
//1.start api req
//2.tell redux loading started
//3.get search paramater
//4.call backend api
//5.wait for response
//get property data
//if error occurs=> send error to redux

// dispatch => send action to redux store
//state => get current state of redux store
export const getAllProperties = () => async (dispatch, getState) => {
  dispatch(propertyActions.getPropertiesStart());
  try {
    const { searchParams } = getState().properties;

    let response;
    try {
      response = await axiosInstance.get(`/v1/rent/listings`, {
        params: { ...searchParams },
      });
    } catch (err) {
      // If 504 Gateway Timeout (e.g. Render waking up) or connection error, retry once
      if (err.response?.status === 504 || err.code === "ECONNABORTED" || !err.response) {
        console.warn("Backend server may be waking up from sleep. Retrying in 4 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 4000));
        response = await axiosInstance.get(`/v1/rent/listings`, {
          params: { ...searchParams },
        });
      } else {
        throw err;
      }
    }

    if (!response) {
      throw new Error("could not fetch any properties");
    }

    const { data } = response.data;

    dispatch(
      propertyActions.getProperties({
        properties: data,
        all_Properties: response.data.no_of_responses,
      }),
    );
  } catch (error) {
    const message =
      error.response?.status === 504
        ? "Backend server is waking up from sleep. Please wait a moment and retry."
        : error.message || "Failed to load properties";
    dispatch(propertyActions.getErrors(message));
  }
};
