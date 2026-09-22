import React, { useEffect } from "react";
import "../../css/Accomodation.css";
import ProgressSteps from "../ProgressSteps";
import MyAccomodation from "./MyAccomodation";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccomodation } from "../../store/Accomodation/Accomodation-action";
import LoadingSpinner from "../LoadingSpinner";

const Accomodation = () => {
  const dispatch = useDispatch();

  const { accomodation, loading } = useSelector((state) => state.accomodation);

  useEffect(() => {
    dispatch(getAllAccomodation());
  }, [dispatch]);

  return (
    <>
      <ProgressSteps accomodation />
      <div className="accom-container">
        <Link to="/accomodationform">
          <button className="add-new-place">+ Add new place</button>
        </Link>
        {loading && <LoadingSpinner />}
        {accomodation.length === 0 && !loading && (
          <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "3.5rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}
            >
              domain_add
            </span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0.25rem 0", color: "var(--text-primary)" }}>
              No places listed yet
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Share your room, apartment, or villa with travelers worldwide.
            </p>
          </div>
        )}
        {accomodation.length > 0 && !loading && (
          <MyAccomodation accomodation={accomodation} loading={loading} />
        )}
      </div>
    </>
  );
};

export default Accomodation;
