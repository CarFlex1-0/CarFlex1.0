import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import StickyNavbar from "@components/StickyNavbar";
import Background from "@components/Background";
import Footer from "@components/Footer";
import ThreeDModel from "@components/ThreeDModel";
import Scrapper from "@components/Scrapper";
import Metric from "@components/Metric";
import Dashboard from "@components/Dashboard";
import PostPage from "@pages/PostPage";
import NewBlog from "@pages/NewBlog";
import SingleBlogPage from "@pages/SingleBlogPage";
import EditBlog from "@pages/EditBlog";
import FeedbackPage from "@pages/FeedbackPage";
import ThreadsList from "@components/forum/ThreadList";
import SingleThread from "@components/forum/SingleThread";
import CreateQuestion from "@components/forum/CreateQuestion";
import ProfilePage from "@pages/ProfilePage";
import SignUp from "@pages/SignUp";
import SignIn from "@pages/SignIn";
import ForgotPassword from "@pages/ForgetPassword";
import ResetPassword from "@pages/ResetPassword";
import Welcome from "@pages/Welcome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <BrowserRouter>
        <StickyNavbar />
        <Background />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/user-dashboard" element={<Dashboard />} />
            {/* Admin Route */}
            <Route path="/scrap" element={<Scrapper />} />
            {/* Miscellaneous Route */}
            <Route path="/metric" element={<Metric />} />
            {/* Blog User Routes */}
            <Route path="/blog/dashboard" element={<PostPage />} />
            <Route path="/blog/:id" element={<SingleBlogPage />} />
            {/* Blog Author Routes */}
            <Route path="/blog/edit/dashboard" element={<PostPage />} />
            <Route path="/blog/delete/dashboard" element={<PostPage />} />
            <Route path="/blog/create" element={<NewBlog />} />
            <Route path="/blog/:id/edit" element={<EditBlog />} />
            {/* Blog User Route */}
            <Route path="/feedback" element={<FeedbackPage />} />
            {/* Forum User Routes */}
            <Route path="/form" element={<ThreadsList />} />
            {/* Forum Author Routes */}
            <Route path="/thread/:id" element={<SingleThread />} />
            <Route path="/create-question" element={<CreateQuestion />} />
            {/* User Profiling User Route */}
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* 3D Model User Route - Combine With Metric */}
            <Route
              path="/model"
              element={
                <div className="flex justify-center items-center h-[80vh] z-50">
                  <ThreeDModel />
                </div>
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
