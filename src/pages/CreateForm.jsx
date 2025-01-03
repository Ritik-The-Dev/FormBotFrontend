import React, { useEffect, useState } from "react";
import FormNav from "../components/FormNav";
import "../styles/Form.css";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { CiImageOn, CiText, CiCalendarDate } from "react-icons/ci";
import { LuListVideo } from "react-icons/lu";
import { MdGif, MdOutlineAlternateEmail, MdOutlinePhone } from "react-icons/md";
import { FaRegStar, FaHashtag } from "react-icons/fa";
import { AiOutlineSelect } from "react-icons/ai";
import { RiDeleteBin5Line, RiFlagLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useGetFormData, useUpdateFormData } from "../api/hooks";
import Loader from "../components/Loader";
import { useRecoilValue } from "recoil";
import { ACCESSTYPE, THEME} from "../recoil/recoil";

function CreateForm() {
  const theme = useRecoilValue(THEME)
  const type = useRecoilValue(ACCESSTYPE);
  const { folderId, formId } = useParams();
  const token = localStorage.getItem("token");
  const { getFormData, formData, loading } = useGetFormData(token);
  const { updateFormData, loading: formDataLoading } = useUpdateFormData(token);
  const [formFlow, setFormFlow] = useState([]);

  const Bubbles = [
    { name: "Text", img: BsFillChatLeftTextFill },
    { name: "Image", img: CiImageOn },
    { name: "Video", img: LuListVideo },
    { name: "GIF", img: MdGif },
  ];

  const Inputs = [
    { name: "Text", img: CiText },
    { name: "Number", img: FaHashtag },
    { name: "Email", img: MdOutlineAlternateEmail },
    { name: "Phone", img: MdOutlinePhone },
    { name: "Date", img: CiCalendarDate },
    { name: "Rating", img: FaRegStar },
    { name: "Buttons", img: AiOutlineSelect },
  ];

  const addValueInForm = (e, id) => {
    const value = e.target.value;
    const newData = formFlow.map((e) => {
      if (e._id === id) return { ...e, value: value };
      return e;
    });
    setFormFlow(newData);
  };

  const deleteFormField = (id) => {
    const filterData = formFlow.filter((e) => e._id !== id);
    setFormFlow(filterData);
  };

  const saveForm = (name) => {
    const newFlow = formFlow.map(({ _id, ...rest }) => rest);
    const payload = {
      formName: name,
      formData: newFlow,
      folderId: folderId,
      formId: formId,
    };
    updateFormData(payload);
    window.location.reload();

  };

  useEffect(() => {
    getFormData(formId);
  }, [token, formId]);

  useEffect(() => {
    if (formData) {
      setFormFlow(formData.formData);
    }
  }, [formData]);

  return (
    <div className="form-page">
      <FormNav formNameProp={formData?.formName} saveForm={saveForm} />
      <div className="form-page-main"
       style={{
        background: theme === "light" ? "#f0f0f0" : "",
      }}>
        {/* left side */}
        <div className="form-left-navs"  style={{
                background: theme === "light" ? "#848890" : "",
              }}>
          <div className="left-navs-items">
            <span>Bubbles</span>
            <div className="grid-nav-items">
              {Bubbles.map((e, index) => (
                <div
                  key={index}
                  className="nav-inner-item"
                  onClick={() =>
                    type !== "view" && setFormFlow((prev) => [
                      ...prev,
                      {
                        name: e.name,
                        icons: e.img,
                        _id: Date.now(),
                        type: "bubble",
                        value: "",
                      },
                    ])
                  }
                >
                  <e.img className="blue-item" />
                  <span>{e.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="left-navs-items">
            <span>Inputs</span>
            <div className="grid-nav-items">
              {Inputs.map((e, index) => (
                <div
                  key={index}
                  className="nav-inner-item"
                  onClick={() =>
                    type !== "view" && setFormFlow((prev) => [
                      ...prev,
                      {
                        name: e.name,
                        icons: e.img,
                        _id: Date.now(),
                        type: "input",
                      },
                    ])
                  }
                >
                  <e.img className="yellow-item" />
                  <span>{e.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="form-right-navs">
          <div className="right-navs-items">
            <div className="start-div"  style={{
                background: theme === "light" ? "#848890" : "",
              }}>
              <RiFlagLine />
              <span>Start</span>
            </div>
            {formFlow.map((form) => (
              <div className="delete-form-flow-div">
                <div className="form-flow-div"  style={{
                background: theme === "light" ? "#848890" : "",
              }}>
                  <span>{form.name}</span>
                  {form.type === "bubble" ? (
                    <div className="input-group" >
                      <span className="iconleft">
                        {form.name === "Text" ? (
                          <BsFillChatLeftTextFill />
                        ) : form.name === "Image" ? (
                          <CiImageOn />
                        ) : form.name === "Video" ? (
                          <LuListVideo />
                        ) : form.name === "GIF" ? (
                          <MdGif />
                        ) : null}
                        {/* <form.icons /> */}
                      </span>
                      <input
                       style={{
                        background: theme === "light" ? "#848890" : "",
                      }}
                        placeholder="Click here to edit"
                        value={form.value}
                        onChange={(e) =>
                          type !== "view" && addValueInForm(e, form._id)
                        }
                      />
                    </div>
                  ) : (
                    <span className="hint-text"  style={{
                      color: theme === "light" ? "black" : "",
                    }}>
                      Hint : User will input a {form.name} on his form
                    </span>
                  )}
                </div>
                {type !== "view" && (
                  <span className="delte-form-span">
                    <RiDeleteBin5Line
                      className="delete-form-field"
                      onClick={() => deleteFormField(form._id)}
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {(loading || formDataLoading) && <Loader />}
    </div>
  );
}

export default CreateForm;
