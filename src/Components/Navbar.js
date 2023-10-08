import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import { toast } from "react-toastify";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasToastBeenShown, setHasToastBeenShown] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(""); // State to store profile photo URL
  const [userName, setUserName] = useState("");

  const openNav = () => {
    setNav(!nav);
  };

  const handleChatBtnClick = () => {
    if (!isButtonDisabled && !hasToastBeenShown) {
      toast.info("Experiencing high traffic, Please wait a moment.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        onOpen: () => {
          setIsButtonDisabled(true);
          setHasToastBeenShown(true);
        },
        onClose: () => {
          setIsButtonDisabled(false);
        },
      });
    }
  };

  useEffect(() => {
    // Load profile photo URL from local storage when the component mounts
    const storedProfilePhotoUrl = localStorage.getItem("profilePhoto");
    const storedUserName = localStorage.getItem("userName");
    if (storedProfilePhotoUrl) {
      setProfilePhotoUrl(storedProfilePhotoUrl);
    }
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []); // Empty dependency array to run this effect only once

  return (
    <div className="navbar-section">
      <div className="navbar-profile-photo">
        {profilePhotoUrl && (
          <img src={profilePhotoUrl} alt="Profile" />
        )}
      </div>
      {userName && <div className="navbar-user-name">{userName}</div>}
      <h1 className="navbar-title">
        <Link to="/">
          Health <span className="navbar-sign">+</span>
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <a href="#services" className="navbar-links">
            Services
          </a>
        </li>
        <li>
          <a href="#about" className="navbar-links">
            About
          </a>
        </li>
        <li>
          <a href="#reviews" className="navbar-links">
            Reviews
          </a>
        </li>
        <li>
          <a href="#doctors" className="navbar-links">
            Doctors
          </a>
        </li>
        <div class="regs">
        <li>
          <Link to="/login" className="navbar-links auths">
            Login
          </Link>
        </li>
        <li>
          <Link to="/signup" className="navbar-links auths">
            Sign Up
          </Link>
        </li>
        </div>
       
      </ul>

      <button
        className="navbar-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleChatBtnClick}
      >
        <FontAwesomeIcon icon={faCommentDots} /> Live Chat
      </button>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
              Services
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#reviews">
              Reviews
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#doctors">
              Doctors
            </a>
          </li>
          <li>
            <Link onClick={openNav} to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/signup">
              Sign Up
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
