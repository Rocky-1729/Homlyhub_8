import { userActions } from "./user-slice.js";
import { axiosInstance } from "../../utils/axios.js";

export const getSignup = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getSignupRequest());
    const { data } = await axiosInstance.post("/v1/rent/user/signup", user);
    dispatch(userActions.getSignupDetails(data.user));
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

export const getLogin = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getLoginRequest());
    const { data } = await axiosInstance.post("/v1/rent/user/login", user);
    dispatch(userActions.getLoginDetails(data.user));
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

export const currentUser = () => async (dispatch) => {
  try {
    dispatch(userActions.getCurrentRequest());
    const { data } = await axiosInstance.get("/v1/rent/user/me");
    if (data.user) {
      dispatch(userActions.getcurrentUser(data.user));
    } else {
      dispatch(userActions.getLogout(null));
    }
  } catch {
    dispatch(userActions.getLogout(null));
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getUpdateUserRequest());
    const { data } = await axiosInstance.patch("/v1/rent/user/updateMe", user);
    dispatch(userActions.getcurrentUser(data.user));
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    await axiosInstance.post("/v1/rent/user/forgotPassword", { email });
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

export const resetPassword = (token, resetPassword) => async (dispatch) => {
  try {
    await axiosInstance.patch(`/v1/rent/user/resetPassword/${token}`, {
      password: resetPassword,
    });
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(userActions.getpasswordRequest());
    await axiosInstance.patch("/v1/rent/user/updateMyPassword", passwords);
    dispatch(userActions.getpasswordSuccess(true));
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.get("/v1/rent/user/logout");
    dispatch(userActions.getLogout(null));
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};
