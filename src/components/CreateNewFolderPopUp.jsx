import React, { useState } from "react";
import "../styles/NewFolder.css";
import { useRecoilValue } from "recoil";
import { THEME } from "../recoil/recoil";

function CreateNewFolderPopUp({ close, createFolder }) {
  const theme = useRecoilValue(THEME);
  const [folderName, setFolderName] = useState("");
  return (
    <div className="popup-overlay">
      <div
        className="popup-container"
        style={{
          color: theme === "light" ? "black" : "",
          background: theme === "light" ? "#f0f0f0" : "",
        }}
      >
        <h2>Create New Folder</h2>
        <input
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          type="text"
          placeholder="Enter folder name"
          className="folder-input"
          style={{
            background: theme === "light" ? "#848890" : "",
          }}
        />
        <div className="popup-actions">
          <button
            className="btn-done"
            onClick={() => {
              createFolder({ folderName: folderName });
              window.location.reload();
              close();
            }}
          >
            Done
          </button>
          <div className="middle-line"></div>
          <button
            onClick={close}
            className="btn-cancel"
            style={{
              color: theme === "light" ? "black" : "",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewFolderPopUp;
