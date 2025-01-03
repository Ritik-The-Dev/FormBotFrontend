import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Images } from "../asests";
import toast from "react-hot-toast";
import "../styles/Login.css";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useRegister } from "../api/hooks";
import Loader from "../components/Loader";

function Register() {
  const navigate = useNavigate();
  const { register, loading, error } = useRegister();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const data = await register({email, username, password});
    if (data?.success) {
      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <Link to={-1} className="back-arrow">
        <BiLeftArrowAlt className="arrow" />
      </Link>
      <div className="login-inner-container">
        <form className="login-form" onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter a Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="******************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
          <div className="divider">OR</div>
          <button type="button" className="btn-secondary">
            <img src={Images.google} alt="Google" />
            <p> Sign up with Google</p>
          </button>
          <p className="signup-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      <img src={Images.login1} className="login-shapes login1-img" />
      <img src={Images.login2} className="login-shapes login2-img" />
      <img src={Images.login3} className="login-shapes login3-img" />
      {loading && <Loader />}
    </div>
  );
}

export default Register;
