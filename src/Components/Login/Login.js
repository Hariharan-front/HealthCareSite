import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Login = ({ history }) => {
  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Check user credentials in local storage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      // Store user data in local storage for authentication
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirect to the home page or perform the necessary actions after login
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <form className={styles.form_container} onSubmit={handleLogin}>
          <h1>Login to Your Account</h1>
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
          {error && <div className={styles.error_msg}>{error}</div>}
          <button type="submit" className={styles.green_btn}>
            Sign In
          </button>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
