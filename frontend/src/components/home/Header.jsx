import React, { useState } from "react";
import Search from "./Search";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/User/User-action.js";
import toast from "react-hot-toast";
import { propertyActions } from "../../store/property/property-slice";
import { getAllProperties } from "../../store/Property/property-action";
import "../../css/AiTripPlanner.css";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = Boolean(user);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const logoutUser = () => {
    dispatch(logout());
    setIsProfileMenuOpen(false);
    toast.success("User has loggedout successfully");
    navigate("/");
  };

  const refreshFunction = () => {
    dispatch(propertyActions.updateSearchParams({}));
    dispatch(getAllProperties());
  };

  return (
    <>
      <nav className="header sticky-top">
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="logo"
            onClick={refreshFunction}
          />
        </Link>
        {isHomePage && (
          <div className="search_filter">
            <Search />
            <Filter />

            <Link to="/ai-trip-planner" className="ai-trip-link">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span>Trip Genie</span>
            </Link>
          </div>
        )}
        {!isAuthenticated && !user && (
          <Link to="/login" className="login-tip">
            <span className="material-symbols-outlined web_logo">
              account_circle
            </span>
            <span className="login-tip-text">
              You are not logged in. Please login
            </span>
          </Link>
        )}
        {isAuthenticated && user && (
          <div className="dropdown">
            <button
              className="material-symbols-outlined web_logo profile-menu-toggle"
              type="button"
              onClick={() => setIsProfileMenuOpen((open) => !open)}
              aria-expanded={isProfileMenuOpen}
              aria-label="Open profile menu"
            >
              {user.avatar?.url && (
                <img src={user.avatar.url} className="user-img" alt="Profile" />
              )}
              {!user.avatar?.url && "account_circle"}
            </button>

            {isProfileMenuOpen && (
              <ul className="dropdown-menu profile-menu">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    {" "}
                    My Account
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={logoutUser}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </nav>
    </>
  );
};
export default Header;
