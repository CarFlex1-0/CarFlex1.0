// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThreadsList from "@components/forum/ThreadList";
import SingleThread from "@components/forum/SingleThread";
import Header from "@components/forum/Header";
import CreateQuestion from "@components/forum/CreateQuestion";
import ProfilePage from "@pages/ProfilePage";
import SignUp from "@pages/SignUp";
import SignIn from "@pages/SignIn";
import ForgotPassword from "@pages/ForgetPassword";
import ResetPassword from "@pages/ResetPassword";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ThreadsList />} />
        <Route path="/thread/:id" element={<SingleThread />} />
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
