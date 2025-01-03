import "../styles/Login.css";
import { Images } from "../asests";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useLogin } from "../api/hooks";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const data = await login(email, password);
    if (data?.success) {
      localStorage.setItem("token", data.token);
      navigate("/");
    }
    window.location.reload();

  };

  return (
    <div className="login-container">
      <Link to={-1} className="back-arrow">
        <BiLeftArrowAlt className="arrow" />
      </Link>
      <div className="login-inner-container">
        <form className="login-form" onSubmit={handleLogin}>
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
          <button type="submit" className="btn-primary">
            Log in
          </button>
          <div className="divider">OR</div>
          <button type="button" className="btn-secondary">
            <img src={Images.google} alt="Google" />
            <p> Sign in with Google</p>
          </button>
          <p className="signup-text">
            Don’t have an account? <Link to="/register">Register now</Link>
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

export default Login;
