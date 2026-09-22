import React from "react";
import "../../css/Home.css";

const Footer = () => {
  return (
    <>
      <footer className="footer-container">
        <p>© {new Date().getFullYear()} HomelyHub, Inc.</p>
        <ul className="footerlist">
          <li>Privacy</li>
          <li>Terms</li>
          <li>Sitemap</li>
          <li>Company details</li>
        </ul>
        <p className="footer-locale">English (IN) · ₹ INR</p>
      </footer>
    </>
  );
};

export default Footer;
