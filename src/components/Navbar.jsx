import "../styles/Navbar.css";
import { Images } from "../asests";
import React from "react";
import { useRecoilValue } from "recoil";
import { USERDATA } from "../recoil/recoil";
import { Link } from "react-router-dom";

function Navbar() {
  const UserData = useRecoilValue(USERDATA);

  return (
    <nav className="navbar">
      <div className="navbar-div">
        <Link to={"/"}>
          <img src={Images.Logo} alt="FormBot" />
        </Link>
        <div className="nav-btn">
          {UserData?._id ? (
            <Link to={"/dashboard"}>
              <button className="signin-btn">Dashboard</button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <button className="signin-btn">Sign in</button>
            </Link>
          )}
          <button className="create-form-btn">Create a FormBot</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
