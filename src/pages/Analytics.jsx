import React, { useEffect, useState } from "react";
import "../styles/Analytics.css";
import FormNav from "../components/FormNav";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useParams } from "react-router-dom";
import { useGetFormData } from "../api/hooks";
import Loader from "../components/Loader";
import { useRecoilValue } from "recoil";
import { THEME } from "../recoil/recoil";

ChartJS.register(ArcElement, Tooltip, Legend);

function Analytics() {
  const theme = useRecoilValue(THEME)
  const token = localStorage.getItem("token");
  const { formId } = useParams();

  const [formAnalytics, setFormAnalytics] = useState({});
  const [responseHeaders, setResponseHeaders] = useState([]);
  const { getFormData, formData, loading } = useGetFormData(token);

  const data = {
    labels: ["Completed", "Started"],
    datasets: [
      {
        data: [
          formAnalytics?.completed || 0,
          (formAnalytics?.started || 0) - (formAnalytics?.completed || 0),
        ],
        backgroundColor: ["#3B82F6", "#909090"],
        hoverBackgroundColor: ["#0056b3", "#a9a9a9"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "70%",
  };

  useEffect(() => {
    getFormData(formId);
  }, [token, formId]);

  useEffect(() => {
    if (formData) {
      setFormAnalytics(formData);
      const index = formData?.formResponses.length - 1
      const firstResponse = formData?.formResponses?.[index]?.responses || [];
      const headers = firstResponse.map((resp) => resp.name);
      const newHeaders = ["", "Submitted At", ...headers];
      setResponseHeaders(newHeaders);
    }
  }, [formData]);

  const flattenResponses = (responses) => {
    const flattened = {};
    responses.forEach((resp) => {
      flattened[resp.name] = resp.value;
    });
    return flattened;
  };

  return (
    <div className="form-page">
      <FormNav formNameProp={false} page={"Response"} />
      {formAnalytics?._id ? (
        <div className="analytics-container"
        style={{
            backgroundColor: theme === "light" ? "#f0f0f0" : "",
        }}>
          <div className="stats-container">
            <div className="stat-box" 
            style={{
                background: theme === "light" ? "#848890" : "",
              }}>
              <p>Views</p>
              <h2>{formAnalytics.views}</h2>
            </div>
            <div className="stat-box" 
            style={{
                background: theme === "light" ? "#848890" : "",
              }}>
              <p>Starts</p>
              <h2>{formAnalytics.started}</h2>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead  style={{
                background: theme === "light" ? "#848890" : "",
              }}>
                <tr>
                  {responseHeaders.map((header, index) => (
                    <th style={{
                      border:'1px solid #37363e'
                    }} key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody  style={{
                background: theme === "light" ? "#848890" : "",
              }}>
                {formAnalytics?.formResponses?.map((row, index) => {
                  const flattened = flattenResponses(row.responses);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{new Date(row.createdAt).toLocaleString()}</td>
                      {responseHeaders.slice(2).map((header, idx) => (
                        <td key={idx}>{flattened[header] || "N/A"}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="chart-container">
            <div style={{ width: "250px", margin: "0 auto" }}>
              <Doughnut data={data} options={options} />
            </div>
            <div className="completion-rate"  style={{
                background: theme === "light" ? "#848890" : "",
              }}>
              <p>Completion rate</p>
              <h2>{`${((formAnalytics.completed /
                formAnalytics.started) *
                100 || 0).toFixed(2)}%`}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data-container">
          <span>No Response yet collected</span>
        </div>
      )}
      {loading && <Loader />}
    </div>
  );
}

export default Analytics;
