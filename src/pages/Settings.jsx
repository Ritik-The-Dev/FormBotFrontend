import React, { useState } from "react";
import "../styles/Settings.css";
import { IoIosLogOut } from "react-icons/io";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import toast from "react-hot-toast";
import { useUpdateUserData } from "../api/hooks";
import Loader from "../components/Loader";
import { ACCESSTYPE, THEME } from "../recoil/recoil";
import { useRecoilValue } from "recoil";

function Settings() {
  const theme = useRecoilValue(THEME);
  const type = useRecoilValue(ACCESSTYPE);
  const token = localStorage.getItem("token");
  const { updateUserData, loading } = useUpdateUserData(token);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleUpdate = () => {
    if (!name && !email && !oldPassword && !newPassword) {
      return toast.error("No Details Found to Update.");
    }
    if (oldPassword || newPassword) {
      if (!oldPassword) {
        return toast.error("Old Password is Required to change new password");
      }
      if (!newPassword) {
        return toast.error("New Password is Required to change old password");
      }
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    updateUserData(name, email, newPassword, oldPassword);
    window.location.reload();
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    window.location.reload();
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <div
      className="settings-container-main"
      style={{
        background: theme === "light" ? "#f0f0f0" : "",
        color: theme === "light" ? "black" : "",
      }}
    >
      <div className="settings-container">
        <span
          style={{
            color: theme === "light" ? "black" : "",
          }}
        >
          Settings
        </span>
        <form className="settings-form">
          <div className="input-group">
            <span className="iconleft">
              <IoPersonOutline />
            </span>
            <input
              style={{
                background: theme === "light" ? "#848890" : "",
                color: theme === "light" ? "black" : "",
              }}
              disabled={type === "view"}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="iconleft">
              <CiLock />
            </span>
            <input
              style={{
                background: theme === "light" ? "#848890" : "",
                color: theme === "light" ? "black" : "",
              }}
              disabled={type === "view"}
              type="email"
              placeholder="Update Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="iconleft">
              <CiLock />
            </span>
            <input
              style={{
                background: theme === "light" ? "#848890" : "",
                color: theme === "light" ? "black" : "",
              }}
              disabled={type === "view"}
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <span
              className="iconright"
              onClick={() => setShowOldPassword((prev) => !prev)}
            >
              {showOldPassword ? <RxEyeOpen /> : <RxEyeClosed />}
            </span>
          </div>
          <div className="input-group">
            <span className="iconleft">
              <CiLock />
            </span>
            <input
              style={{
                background: theme === "light" ? "#848890" : "",
                color: theme === "light" ? "black" : "",
              }}
              disabled={type === "view"}
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className="iconright"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <RxEyeOpen /> : <RxEyeClosed />}
            </span>
          </div>
          <button
            type="button"
            className="update-btn"
            onClick={() => type !== "view" && handleUpdate}
          >
            Update
          </button>
        </form>
        <div className="logout-container"  style={{
                fontStyle: theme === "light" ? "bolder" : "",
              }}>
          <IoIosLogOut className="logout-icon" />
          <button className="logout-btn" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default Settings;
