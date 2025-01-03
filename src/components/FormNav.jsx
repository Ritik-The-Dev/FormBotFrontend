import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import InvitePopup from "./InvitePopup";
import { useNavigate, useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { ACCESSTYPE, THEME } from "../recoil/recoil";

function FormNav({ saveForm, formNameProp = "Form Name", page = "Flow" }) {
  const [currentTheme, setCurrentTheme] = useRecoilState(THEME);
  const type = useRecoilValue(ACCESSTYPE);
  const { folderId, formId } = useParams();
  const navigate = useNavigate();

  const [formName, setFormName] = useState("");

  const [currentPage, setCurrentPage] = useState(page);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin + `/forms/${formId}`);
    toast.success("Form Bot Link Copied To Clipboard.");
  };

  useEffect(() => {
    setFormName(formNameProp);
  }, [formNameProp]);

  return (
    <>
      <nav
        className="form-nav"
        style={{
          backgroundColor: currentTheme === "light" ? "#f0f0f0" : "",
          borderBottom:currentTheme === "light" ? '2px solid' : ''
        }}
      >
        <div className="left-nav">
          {formName ? (
            <input
              disabled={type === "view"}
              value={formName}
              style={{
                color: currentTheme === "light" ? "black" : "white",
                backgroundColor: currentTheme === "light" ? "#f0f0f0" : "",
                border: currentTheme === "light" ? "2px solid black" : "",
              }}
              onChange={(e) => setFormName(e.target.value)}
              type="text"
              placeholder="Enter Form Name"
              className="form-names"
            />
          ) : null}
        </div>
        <div className="all-workspaces">
          <div className="form-btns">
            <button
              className={`forms-btns-styles ${
                currentPage.toLowerCase() === "flow" ? "form-btn-active" : ""
              }`}
              style={{
                color: currentTheme === "light" ? "black" : ""
              }}
              onClick={() => {
                setCurrentPage("Flow");
                navigate(`/create-form/${folderId}/${formId}`);
              }}
            >
              Flow
            </button>
            <button
              style={{
                color: currentTheme === "light" ? "black" : ""
              }}
              className={`forms-btns-styles ${
                currentPage.toLowerCase() === "response"
                  ? "form-btn-active"
                  : ""
              }`}
              onClick={() => {
                setCurrentPage("Response");
                navigate(`/analytics/${folderId}/${formId}`);
              }}
            >
              Response
            </button>
          </div>
        </div>
        <div className="last-div">
          <div className="mode-change-btn">
            <span
              style={{
                color: currentTheme === "light" ? "black" : "white",
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
                color: currentTheme === "light" ? "black" : "white",
              }}
            >
              Dark
            </span>
          </div>

          <div className="btns">
            <button className="share-btn" onClick={() => copyToClipboard()}>
              Share
            </button>
            {formNameProp
              ? type !== "view" && (
                  <button
                    onClick={() => saveForm(formName)}
                    className="save-btn"
                  >
                    Save
                  </button>
                )
              : null}
            <button
              className="close-form-btn"
              onClick={() => navigate("/dashboard")}
            >
              <IoClose />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default FormNav;
