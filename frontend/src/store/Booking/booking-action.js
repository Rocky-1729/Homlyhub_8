import { axiosInstance } from "../../utils/axios";
import {
  setBookingRequest,
  setBookings,
  setBookingDetails,
} from "./booking-slice.js";
import { userActions } from "../User/user-slice.js";

export const fetchBookingDetails = (bookingId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(
      `/v1/rent/user/booking/${bookingId}`,
    );
    dispatch(setBookingDetails(response.data.data.booking));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(userActions.getLogout());
    }
  }
};
export const fetchUserBookings = () => async (dispatch) => {
  try {
    dispatch(setBookingRequest());
    const response = await axiosInstance.get("/v1/rent/user/booking");
    dispatch(setBookings(response.data.data.booking || []));
  } catch (error) {
    dispatch(setBookings([]));
    if (error.response?.status === 401) {
      dispatch(userActions.getLogout());
    }
  }
};
