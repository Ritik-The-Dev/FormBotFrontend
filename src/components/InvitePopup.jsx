import React, { useState } from "react";
import "../styles/InvitePopup.css";
import { useSendWorkspaceInvite } from "../api/hooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useRecoilValue } from "recoil";
import { USERDATA } from "../recoil/recoil";

function InvitePopup({ close }) {
  const navigate = useNavigate();
  const UserData = useRecoilValue(USERDATA);
  const token = localStorage.getItem("token");
  const { sendWorkspaceInvite, loading } = useSendWorkspaceInvite(token);
  const [email, setEmail] = useState("");
  const [viewOptions, setViewOption] = useState("View");

  const shareInviteLink = () => {
    const link = `${window.location.origin}?user=${UserData._id}&type=${viewOptions.toLowerCase()}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  const inviteByEmail = () => {
    if (!token) {
      navigate("/");
      return toast.error("Login to share workspace");
    }
    if (!email) {
      return toast.error("Please enter email");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    sendWorkspaceInvite(email, viewOptions.toLowerCase());
  };

  return (
    <div className="invite-popup-container">
      <div className="invite-popup">
        <button className="close-btn" onClick={close}>
          ×
        </button>

        <div className="invite-section top">
          <div className="select-inv">
            <span>Invite by Email</span>
            <div class="custom-select-container">
              <select
                class="custom-select"
                value={viewOptions}
                onChange={(e) => setViewOption(e.target.value)}
              >
                <option value="Edit">Edit</option>
                <option value="View">View</option>
              </select>
            </div>
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email id"
            className="email-input"
          />
          <button className="send-invite-btn" onClick={inviteByEmail}>
            Send Invite
          </button>
        </div>

        <div className="invite-section">
          <span>Invite by link</span>
          <button className="copy-link-btn" onClick={shareInviteLink}>
            Copy link
          </button>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default InvitePopup;
