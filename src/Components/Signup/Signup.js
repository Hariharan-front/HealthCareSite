import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = ({ history }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePhoto: null, // Store the selected profile photo file
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    if (input.type === "file") {
      // Handle file input separately
      setData({ ...data, [input.name]: input.files[0] });
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Check if the user already exists in local storage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some((u) => u.email === data.email);

    if (userExists) {
      setError("User with the same email already exists.");
    } else {
      // Add the new user to the list of users in local storage
      const reader = new FileReader();
    reader.onload = (event) => {
      const photoDataUrl = event.target.result;
      setData({ ...data, profilePhoto: photoDataUrl });

      // Store the photo URL in local storage
      localStorage.setItem("profilePhoto", photoDataUrl);

      // Continue with sign-up logic
      existingUsers.push(data);
      localStorage.setItem("users", JSON.stringify(existingUsers));
        setMsg("Sign-up successful. You can now log in.");
        
        localStorage.setItem("userName", data.firstName);

      // Redirect to the login page or perform the necessary actions after signup
      navigate("/");
    };
    reader.readAsDataURL(data.profilePhoto);
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <form className={styles.form_container} onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={data.lastName}
            required
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className={styles.input}
          />
          <input
            type="file" // File input for profile photo
            name="profilePhoto"
            onChange={handleChange}
            accept="image/*" // Restrict to image files
            className={styles.input}
          />
          {error && <div className={styles.error_msg}>{error}</div>}
          {msg && <div className={styles.success_msg}>{msg}</div>}
          <button type="submit" className={styles.green_btn}>
            Sign Up
          </button>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
