import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 12rem)",
        padding: "4rem 1.5rem",
        textAlign: "center",
        backgroundColor: "var(--bg-main)",
        color: "var(--text-primary)",
        fontFamily: "inherit",
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: "4.5rem", color: "var(--primary)", marginBottom: "1rem" }}
      >
        travel_explore
      </span>
      <h1 style={{ fontSize: "3.5rem", fontWeight: 800, margin: "0", letterSpacing: "-0.03em" }}>404</h1>
      <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0.5rem 0 1rem" }}>Page Not Found</h2>
      <p style={{ fontSize: "0.95rem", maxWidth: "420px", lineHeight: "1.6", color: "var(--text-secondary)", margin: "0 0 1.5rem" }}>
        We couldn't find the page you're looking for. It might have been moved or doesn't exist anymore.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.75rem",
          backgroundColor: "var(--primary)",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "var(--radius-full)",
          fontWeight: 600,
          fontSize: "0.95rem",
          boxShadow: "0 4px 14px rgba(14, 139, 83, 0.3)",
          transition: "all var(--transition-fast)",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>
          arrow_back
        </span>
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
