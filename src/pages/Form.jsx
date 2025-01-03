import React, { useEffect, useState } from "react";
import "../styles/Forms.css";
import { IoSend } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetFormData,
  useSubmitFormResponse,
  useUpdateFormStartedCount,
  useUpdateFormViewCount,
} from "../api/hooks";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Form() {
  const navigate = useNavigate();
  const { formId } = useParams();
  const viewed = localStorage.getItem(`viewed${formId}`);
  const started = localStorage.getItem(`started${formId}`);
  const token = localStorage.getItem("token");
  const { getFormData, formData: apiData, loading } = useGetFormData(token);
  const { updateFormStartedCount, loading: startLoading } =
    useUpdateFormStartedCount(token);
  const { updateFormViewCount, loading: viewLoading } =
    useUpdateFormViewCount(token);
  const { submitFormResponse, loading: responseLoading } =
    useSubmitFormResponse(token);

  const [formData, setFormData] = useState([]);
  const [currentFlow, setCurrentFlow] = useState([]);
  const [currentQues, setCurrentQues] = useState(
    formData.length ? formData[0] : {}
  );

  const handleInputChange = (value) => {
    if (!started) {
      updateFormStartedCount(formId);
      localStorage.setItem(`started${formId}`, true);
    }
    setCurrentQues((prev) => ({
      ...prev,
      value: value,
    }));
  };

  const goToNextQuestion = () => {
    setCurrentFlow((prev) => [...prev, currentQues]);
    const currentIndex = formData.findIndex(
      (item) => item._id === currentQues._id
    );

    if (currentIndex < formData.length - 1) {
      setCurrentQues(formData[currentIndex + 1]);
    } else {
      const formData = [...currentFlow, currentQues];
      submitFormResponse({ formId, responses: formData });
      navigate("/");
    }
  };

  useEffect(() => {
    if (currentQues?.type?.toLowerCase() === "bubble") {
      const timer = setTimeout(() => {
        goToNextQuestion();
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [currentQues]);

  useEffect(() => {
    getFormData(formId);
  }, [token, formId]);

  useEffect(() => {
    if (apiData) {
      setFormData(apiData.formData);
      setCurrentQues(apiData.formData[0]);
    }
  }, [apiData]);

  useEffect(() => {
    if (!viewed) {
      updateFormViewCount(formId);
      localStorage.setItem(`viewed${formId}`, true);
    }
  }, [viewed, formId]);

  return (
    <>
      <div className="form-container">
        <div className="form-inner-outer">
          <div className="form-inner">
            <div className="form-message">
              <div className="message-flow">
                {currentFlow?.map((e, index) => (
                  <div
                    key={index}
                    className={`bubble ${
                      e.name.toLowerCase() === "image" ? "buble-height" : ""
                    } ${
                      e.type.toLowerCase() === "bubble"
                        ? "bubble-left"
                        : "bubble-right"
                    }`}
                  >
                    {e.type === "bubble" ? (
                      e.name.toLowerCase() === "image" ? (
                        <img src={e.value} alt="Dynamic content" />
                      ) : (
                        <div className="bot-reply">
                          <FaCircleUser className="bot-img" />
                          <span>{e.value}</span>
                        </div>
                      )
                    ) : (
                      <span>{e.value}</span>
                    )}
                  </div>
                ))}
              </div>
              {currentQues?.type === "bubble" ? (
                <div className="bubble bubble-left">
                  {currentQues.name.toLowerCase() === "image" ? (
                    <img src={currentQues.value} alt="Dynamic content" />
                  ) : (
                    <span>{currentQues.value}</span>
                  )}
                </div>
              ) : (
                <div className="input-wrapper">
                  <div style={{
                    width:'100%'
                  }}>
                  {currentQues.name === "Number" ? (
                    <input
                      type="number"
                      placeholder="Enter a number"
                      value={currentQues?.value}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="form-input"
                    />
                  ) : currentQues.name === "Email" ? (
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={currentQues?.value}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="form-input"
                    />
                  ) : currentQues.name === "Phone" ? (
                    <input
                      type="tel"
                      placeholder="Enter your phone"
                      value={currentQues?.value}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="form-input"
                    />
                  ) : currentQues.name === "Date" ? (
                    <input
                      type="date"
                      placeholder="Select a date"
                      value={currentQues?.value}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="form-input"
                    />
                  ) : currentQues.name === "Rating" ? (
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => handleInputChange(star)}
                          style={{
                            fontSize: "3rem",
                            cursor: "pointer",
                            color:
                              star <= currentQues?.value ? "orange" : "gray",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  ) : currentQues.name === "Buttons" ? (
                    <button
                      className="button-input"
                      style={{
                        padding:'10px'
                      }}
                      onClick={() => handleInputChange("Clicked")}
                    >
                      {currentQues?.label || "Click me"}
                    </button>
                  ) : (
                    <input
                      type="text"
                      placeholder="Enter you text"
                      value={currentQues?.value}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="form-input"
                    />
                  )}
                  </div>
                  {currentQues?.type === "input" && (
                    <button onClick={() => currentQues.value && goToNextQuestion()} className="next-button">
                      <IoSend />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {(loading || viewLoading || startLoading || responseLoading) && (
        <Loader />
      )}
    </>
  );
}

export default Form;
