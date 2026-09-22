// managae booking 

// store all booking
// store individual booking details 
//track the Api loading state
// add new booking when a booking is created
// update booking when a booking is updated

import{createSlice} from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  bookingDetails:{},
  loading: false
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
    reducers: {
        setBookingRequest(state) {
            state.loading = true;
        },
        setBookings(state, action) {
            state.loading = false;
            state.bookings = action.payload;
        },
        addBooking: (state, action)=> {
            state.loading = false;
            state.bookings.push(action.payload);
        },
        setBookingDetails:(state, action)=>{
            state.bookingDetails = action.payload;
        }
    }
});

export const{setBookingRequest, setBookings, addBooking, setBookingDetails} = bookingSlice.actions;
export default bookingSlice;