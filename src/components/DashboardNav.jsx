import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import InvitePopup from "./InvitePopup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { THEME, USERDATA } from "../recoil/recoil";
import { useSwitchWorkspace } from "../api/hooks";
import Loader from "./Loader";

function DashboardNav() {
  const [currentTheme, setCurrentTheme] = useRecoilState(THEME);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const UserData = useRecoilValue(USERDATA);
  const [showAllWorkSpaces, setShowAllWorkSpaces] = useState(false);
  const [showInvPopup, setShowInvitePopup] = useState(false);
  const [workSpaces, setWorkSpaces] = useState([]);
  const [currentWorkSpace, setCurrentWorkspace] = useState("");
  const { switchWorkspace, loading } = useSwitchWorkspace(token);

  const handleWorkSpaceClick = () => {
    setShowAllWorkSpaces(!showAllWorkSpaces);
  };

  const handleClick = async (payload) => {
    setCurrentWorkspace({ name: payload.name, _id: payload._id });
    const data = await switchWorkspace(payload._id);
    if (data.success) {
      localStorage.setItem("token", data.token),
        localStorage.setItem("type", data.type.toLowerCase());
      window.location.reload();
    }
    setShowAllWorkSpaces(!showAllWorkSpaces);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    window.location.reload();

    toast.success("Logout Successfully");
    navigate("/login");
  };

  useEffect(() => {
    if (UserData._id) {
      setWorkSpaces([
        { username: UserData.username, userId: UserData._id },
        ...UserData.shared,
      ]);
      setCurrentWorkspace({
        name: UserData.username,
        _id: UserData._id,
      });
    }
  }, [UserData]);

  return (
    <>
      <nav
        className="dashboard-nav"
        style={{
          backgroundColor: currentTheme === "light" ? "#f0f0f0" : "",
          borderBottom: currentTheme === "light" ? "2px solid" : "",
        }}
      >
        <div className="left-nav"></div>
        <div className="all-workspaces">
          <div
            style={{
              backgroundColor: currentTheme === "light" ? "#f0f0f0" : "",
              color: currentTheme === "light" ? "black" : "",
              border: currentTheme === "light" ? "2px solid black" : "",
            }}
            onClick={handleWorkSpaceClick}
            className="current-workspace"
          >
            {currentWorkSpace?.name} Workspace
          </div>
          {showAllWorkSpaces ? (
            <div className="drop-down-workspaces">
              {workSpaces.map((workSpace, index) =>
                workSpace.userId === currentWorkSpace._id ? null : (
                  <span
                    key={index}
                    style={{
                      backgroundColor:
                        currentTheme === "light" ? "#f0f0f0" : "",
                      color: currentTheme === "light" ? "black" : "",
                      border: currentTheme === "light" ? "2px solid black" : "",
                    }}
                    onClick={() =>
                      handleClick({
                        name: workSpace?.username,
                        _id: workSpace?.userId,
                      })
                    }
                  >
                    {workSpace?.username} Workspace
                  </span>
                )
              )}
              <span
                style={{
                  backgroundColor: currentTheme === "light" ? "#f0f0f0" : "",
                  color: currentTheme === "light" ? "black" : "",
                  border: currentTheme === "light" ? "2px solid black" : "",
                }}
                onClick={() => navigate("/settings")}
              >
                Settings
              </span>
              <span
                style={{
                  backgroundColor: currentTheme === "light" ? "#f0f0f0" : "",
                  color: currentTheme === "light" ? "black" : "",
                  border: currentTheme === "light" ? "2px solid black" : "",
                }}
                onClick={handleLogout}
                className="logout"
              >
                Log Out
              </span>
            </div>
          ) : null}
        </div>
        <div className="last-div">
          <div className="mode-change-btn">
            <span
              style={{
                color: currentTheme === "light" ? "black" : "",
              }}
            >
              Light
            </span>
            <input
              type="checkbox"
              id="mode-toggle"
              aria-label="Toggle light/dark mode"
              checked={currentTheme === "dark"}
              onChange={() => {
                setCurrentTheme((prevTheme) =>
                  prevTheme === "light" ? "dark" : "light"
                );
                localStorage.setItem(
                  "theme",
                  currentTheme === "light" ? "dark" : "light"
                );
              }}
            />
            <span
              style={{
                color: currentTheme === "light" ? "black" : "",
              }}
            >
              Dark
            </span>
          </div>

          <button
            className="share-btn"
            onClick={() => setShowInvitePopup(true)}
          >
            Share
          </button>
        </div>
      </nav>
      {showInvPopup && <InvitePopup close={() => setShowInvitePopup(false)} />}
      {loading && <Loader text={"Switching Workshops"} />}
    </>
  );
}

export default DashboardNav;
