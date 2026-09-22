import React, { useEffect } from "react";
import "../../css/MyBookings.css";
import ProgressSteps from "../ProgressSteps";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookingDetails,
  fetchUserBookings,
} from "../../store/Booking/booking-action.js";

const MyBookings = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { bookings: storedBookings, loading } = useSelector(
    (state) => state.booking,
  );
  const bookings = Array.isArray(storedBookings) ? storedBookings : [];
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserBookings());
    }
  }, [dispatch, user]);

  const handleBookingClick = (bookingId) => {
    dispatch(fetchBookingDetails(bookingId));
    navigate(`/user/mybookings/${bookingId}`);
  };

  if (bookings.length === 0 && !loading) {
    return (
      <>
        <ProgressSteps />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "4rem 1.5rem",
            textAlign: "center",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "4rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}
          >
            luggage
          </span>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0.25rem 0", color: "var(--text-primary)" }}>
            No bookings yet
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "24rem", marginBottom: "1.5rem" }}>
            Time to dust off your bags and start planning your next getaway.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "0.75rem 1.75rem",
              background: "var(--primary)",
              color: "#ffffff",
              border: "none",
              borderRadius: "var(--radius-full)",
              fontWeight: 600,
              fontSize: "0.95rem",
              boxShadow: "0 4px 14px rgba(14, 139, 83, 0.3)",
              cursor: "pointer",
            }}
          >
            Start Exploring
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <ProgressSteps />
      <div className="wow">
        {loading && <LoadingSpinner />}
        {!loading &&
          bookings.length > 0 &&
          bookings.map((booking) => (
            <div
              className="main-container"
              onClick={() => handleBookingClick(booking._id)}
              key={booking._id}
            >
              <div className="mybookings-container row">
                <div className="image-container col-lg-3 col-md-3">
                  <img
                    className="booking-img"
                    src={
                      booking.property.images &&
                      booking.property.images.length > 0
                        ? booking.property.images[0].url
                        : undefined
                    }
                    alt="bookings"
                  />
                </div>
                <div className="booking-information col-lg-9 col-md-9">
                  <h6 className="hotel-name">
                    {booking.property.propertyName}
                  </h6>
                  <div className="stay-information">
                    <span className="info">
                      <span className="material-symbols-outlined icon">
                        bedtime
                      </span>
                      {booking.numberOfnights} nights
                    </span>
                    <span className="info">
                      <span className="material-symbols-outlined icon">
                        calendar_month
                      </span>
                      {new Date(booking.fromDate).toLocaleDateString()}
                    </span>
                    <span class="material-symbols-outlined icon">
                      arrow_forward
                    </span>
                    <span className="info">
                      <span className="material-symbols-outlined icon">
                        calendar_month
                      </span>
                      {new Date(booking.toDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h5 className="booking-price">
                    <span class="material-symbols-outlined">payments</span>{" "}
                    Total Price :&#8377; {booking.price}
                  </h5>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyBookings;
