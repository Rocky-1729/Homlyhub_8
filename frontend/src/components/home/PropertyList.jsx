import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "../../css/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { propertyActions } from "../../store/property/property-slice";
import { getAllProperties } from "../../store/property/property-action";
import LoadingSpinner from "../LoadingSpinner";

const Card = ({ id, image, name, address, price }) => {
  return (
    <figure className="property">
      <Link to={`/propertylist/${id}`}>
        <img src={image} alt="Propertyimg" />
      </Link>
      <h4>{name}</h4>
      <figcaption>
        <main className="propertydetails">
          <h5>{name}</h5>

          <h6>
            <span className="material-symbols-outlined houseicon">
              home_pin
            </span>
            {address}
          </h6>
          <p>
            <span className="price"> ₹{price}</span> per night
          </p>
        </main>
      </figcaption>
    </figure>
  );
};

const PropertyList = () => {
  const [currentPage, setCurrentPage] = useState({ page: 1 });

  const dispatch = useDispatch();
  const { properties, totalProperties, searchParams, loading, error } = useSelector(
    (state) => state.properties,
  );

  const lastPage = Math.ceil(totalProperties / 12);

  const propertyListRef = useRef(null);

  useEffect(() => {
    const fetchProperties = async (page) => {
      if (searchParams.page !== page) {
        dispatch(propertyActions.updateSearchParams({ ...searchParams, page }));
        return;
      }
      await dispatch(getAllProperties());
    };
    fetchProperties(currentPage.page);
  }, [currentPage.page, dispatch, searchParams]);

  useEffect(() => {
    if (propertyListRef.current) {
      gsap.fromTo(
        propertyListRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
      );
    }
  }, [properties]);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
            flexDirection: "column",
            gap: "1rem",
            padding: "3rem 1rem",
          }}
        >
          <LoadingSpinner />
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Loading properties...
          </p>
        </div>
      ) : error ? (
        <div
          className="not_found"
          style={{ textAlign: "center", padding: "4rem 1rem" }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "3.5rem",
              color: "#e53e3e",
              marginBottom: "0.5rem",
            }}
          >
            cloud_off
          </span>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              margin: "0.5rem 0",
              color: "var(--text-primary)",
            }}
          >
            Server connection issue
          </h3>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
              maxWidth: "460px",
              margin: "0 auto 1.5rem",
            }}
          >
            {error}
          </p>
          <button
            onClick={() => dispatch(getAllProperties())}
            style={{
              padding: "0.6rem 1.6rem",
              background: "#ff385c",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            Retry
          </button>
        </div>
      ) : properties.length === 0 ? (
        <div
          className="not_found"
          style={{ textAlign: "center", padding: "4rem 1rem" }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "3.5rem",
              color: "var(--text-muted)",
              marginBottom: "0.5rem",
            }}
          >
            travel_explore
          </span>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              margin: "0.5rem 0",
              color: "var(--text-primary)",
            }}
          >
            No properties found
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Try adjusting your search filters or dates to find available stays.
          </p>
        </div>
      ) : (
        <div className="propertylist" ref={propertyListRef}>
          {properties.map((property) => (
            <Card
              key={property._id}
              id={property._id}
              image={property.images[0]?.url || ""}
              name={property.propertyName}
              address={`${property.address.city}, ${property.address.state} ${property.address.pincode}`}
              price={property.price}
              slug={property.slug}
            />
          ))}
        </div>
      )}

      {!loading && !error && properties.length > 0 && (
        <div className="pagination">
          <button
            className="previous_btn"
            onClick={() => setCurrentPage((prev) => ({ page: prev.page - 1 }))}
            disabled={currentPage.page === 1}
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>

          <button
            className="next_btn"
            onClick={() => setCurrentPage((prev) => ({ page: prev.page + 1 }))}
            disabled={properties.length < 12 || currentPage.page === lastPage}
          >
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
        </div>
      )}
    </>
  );
};

export default PropertyList;
