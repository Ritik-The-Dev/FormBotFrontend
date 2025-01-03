import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import DashboardNav from "../components/DashboardNav";
import { IoIosAdd } from "react-icons/io";
import { FiFolderPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import CreateNewFolderPopUp from "../components/CreateNewFolderPopUp";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ACCESSTYPE, THEME, USERDATA } from "../recoil/recoil";
import {
  useCreateFolder,
  useCreateForm,
  useDeleteFolder,
  useDeleteForm,
} from "../api/hooks";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Dashboard() {
  const theme = useRecoilValue(THEME);
  const type = useRecoilValue(ACCESSTYPE);
  const navigate = useNavigate();
  const { folderID } = useParams();
  const token = localStorage.getItem("token");
  const { createFolder, loading } = useCreateFolder(token);
  const { deleteFolder, deleteloading } = useDeleteFolder(token);
  const { createForm, formloading } = useCreateForm(token);
  const { deleteForm, deleteFormloading } = useDeleteForm(token);
  const UserData = useRecoilValue(USERDATA);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showDeleteFolder, setShowDeleteFolder] = useState(undefined);
  const [showDeleteForm, setShowDeleteForm] = useState(undefined);
  const [Forms, setForms] = useState([]);

  const formCreation = async () => {
    if (!folderID) {
      return toast.error("select or create a folder to create form.");
    }
    const data = await createForm({
      folderId: folderID,
    });
    if (data.success) {
      navigate(`/create-form/${folderID}/${data.form._id}`);
    }
    window.location.reload();
  };

  useEffect(() => {
    if (!UserData._id && !token) {
      navigate("/login");
      alert("Login to use Dashboard.");
    }
  }, []);

  useEffect(() => {
    if (UserData?._id && folderID) {
      const folderForms = UserData?.folders?.filter((e) => e._id === folderID);
      setForms(folderForms[0]?.forms || []);
    }
  }, [UserData, folderID]);

  return (
    <>
      <div
        className="dashboard-page"
        style={{
          background: theme === "light" ? "#f0f0f0" : "",
        }}
      >
        <DashboardNav />
        <div className="folders-tagline">
          <div
            style={{
              background: theme === "light" ? "#848890" : "",
            }}
            className="folder-btn"
            onClick={() => {
              type !== "view" && setShowAddFolder(true);
            }}
          >
            <FiFolderPlus className="icons-png" />
            <span>
              {type === "view" ? "View Only Access" : "Create a folder"}
            </span>
          </div>
          {UserData?.folders?.length
            ? UserData?.folders.map((e, index) => (
                <div
                  style={{
                    background: theme === "light" ? "#848890" : "",
                    opacity: e._id === folderID ? "70%" : "",
                  }}
                  key={index}
                  className="folder-btn"
                  onClick={() => {
                    navigate(`/dashboard/${e._id}`);
                  }}
                >
                  <span>{e.folderName}</span>
                  {type !== "view" && (
                    <RiDeleteBinLine
                      onClick={() => setShowDeleteFolder(e)}
                      className="icons-png-del"
                    />
                  )}
                </div>
              ))
            : null}
        </div>
        <div className="forms-grid">
          <div className="form-relative">
            <div
              className="form-div"
              onClick={() => type !== "view" && formCreation()}
            >
              <IoIosAdd className="icons-form" />
              <span>
                {type === "view" ? "View Only Access" : "Create a typebot"}
              </span>
            </div>
          </div>
          {Forms &&
            Forms.map((e, index) => (
              <div key={index} className="form-relative">
                <div className="form-div">
                  <span
                    onClick={() =>
                      navigate(`/create-form/${folderID}/${e.formId._id}`)
                    }
                  >
                    {e.formId.formName}
                  </span>
                  {type != "view" && (
                    <RiDeleteBinLine
                      onClick={() => setShowDeleteForm(e.formId)}
                      className="icons-form-del"
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      {showAddFolder && (
        <CreateNewFolderPopUp
          createFolder={createFolder}
          close={() => setShowAddFolder(false)}
        />
      )}
      {showDeleteFolder && (
        <div className="popup-overlay">
          <div
            className="popup-container w-440px"
            style={{
              color: theme === "light" ? "black" : "",
              background: theme === "light" ? "#f0f0f0" : "",
            }}
          >
            <span
              className="delete-title"
              style={{
                color: theme === "light" ? "black" : "",
              }}
            >
              Are you sure you want to delete this folder ?
            </span>
            <div className="popup-actions">
              <button
                className="btn-done"
                onClick={() => {
                  deleteFolder(showDeleteFolder?._id);
                  window.location.reload();
                  setShowDeleteFolder(false);
                }}
              >
                Confirm
              </button>
              <div className="middle-line"></div>
              <button
                style={{
                  color: theme === "light" ? "black" : "",
                }}
                onClick={() => setShowDeleteFolder(false)}
                className="btn-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteForm && (
        <div className="popup-overlay">
          <div
            className="popup-container w-440px"
            style={{
              color: theme === "light" ? "black" : "",
              background: theme === "light" ? "#f0f0f0" : "",
            }}
          >
            <span
              className="delete-title"
              style={{
                color: theme === "light" ? "black" : "",
              }}
            >
              Are you sure you want to delete this form ?
            </span>
            <div className="popup-actions">
              <button
                className="btn-done"
                onClick={() => {
                  deleteForm(showDeleteForm?._id);
                  window.location.reload();
                  setShowDeleteFolder(false);
                }}
              >
                Confirm
              </button>
              <div className="middle-line"></div>
              <button
                onClick={() => setShowDeleteForm(false)}
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
      )}
      {(loading || deleteloading || formloading || deleteFormloading) && (
        <Loader />
      )}
    </>
  );
}

export default Dashboard;
