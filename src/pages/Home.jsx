import React, { useEffect } from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import { Images } from "../asests";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useAcceptWorkspaceInvite } from "../api/hooks";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Home() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get("user");
  const type = params.get("type");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const { acceptWorkspaceInvite, loading } = useAcceptWorkspaceInvite(token);

  useEffect(() => {
    if (userId && type && !token) {
      toast.error("Login to Accept workspace Invite");
      navigate("/login" );
    }
    if (userId && type && token) {
      acceptWorkspaceInvite(userId, type);
      navigate('/')
    }
  }, [userId, type, token]);

  return (
    <div className="home-main-div">
      <Navbar />
      <div className="home-div-1">
        <img src={Images.traingle} alt="traingle" className="home-img-1" />
        <div className="home-div-mid">
          <span className="biggest-text">Build advanced chatbots visually</span>
          <span className="mid-text">
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them anywhere on your web/mobile apps and start collecting
            results like magic.
          </span>
          <button
            onClick={() => navigate("/dashboard")}
            className="create-form-btn-home"
          >
            Create a FormBot
          </button>
        </div>
        <img src={Images.halfC} alt="traingle" className="home-img-1" />
      </div>
      <div className="home-div-2">
        <img src={Images.circlemiddle1} className="img-middles-1" />
        <img src={Images.circlemiddle2} className="img-middles-1" />
        <img src={Images.homeImg} className="img-home-img" />
      </div>
      <Footer />
      {loading && <Loader text={"Accepting WorkSpace Invite."} />}
    </div>
  );
}

export default Home;
