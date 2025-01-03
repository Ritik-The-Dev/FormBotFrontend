import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import CreateForm from "./pages/CreateForm";
import Analytics from "./pages/Analytics";
import Form from "./pages/Form";
import { useGetUserData } from "./api/hooks";
import {  useSetRecoilState } from "recoil";
import { ACCESSTYPE,  THEME,  USERDATA } from "./recoil/recoil";
import Loader from "./components/Loader";

function App() {
  const setTheme = useSetRecoilState(THEME)
  const setType = useSetRecoilState(ACCESSTYPE)
  const type = localStorage.getItem("type");
  const token = localStorage.getItem("token");
  const theme = localStorage.getItem("theme");
  const setUserData = useSetRecoilState(USERDATA);
  const { getUserData, userData, loading } = useGetUserData(token);

  const fetchData = async () => {
    await getUserData();
  };

  useEffect(() => {
    if (token) {
      fetchData()
    }
  }, [token]);

  useEffect(() => {
    if (userData?._id) {
      setUserData(userData);
    }
    if(type){
      setType(type)
    }
  }, [userData]);

  useEffect(()=>{
    if(theme){
      setTheme(theme)
    }
  },[theme])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:folderID" element={<Dashboard />} />
        <Route path="/create-form/:folderId/:formId" element={<CreateForm />} />
        <Route path="/analytics/:folderId/:formId" element={<Analytics />} />
        <Route path="/forms/:formId" element={<Form />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {loading && <Loader />}
    </>
  );
}

export default App;
