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
    console.log("API call Started");
    const { searchParams } = getState().properties;
    console.log(searchParams);

    const response = await axiosInstance.get(`/v1/rent/listings`, {
      params: { ...searchParams },
    });

    if (!response) {
      throw new Error("could not fetch any properties");
    }

    const { data } = response.data;
    console.log(data);

    dispatch(
      propertyActions.getProperties({
        properties: data,
        all_Properties: response.data.no_of_responses,
      }),
    );
  } catch (error) {
    dispatch(propertyActions.getErrors(error.message));
  }
};
