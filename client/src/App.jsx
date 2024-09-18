// prettier-ignore
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
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <StickyNavbar />
        <Background />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scrap" element={<Scrapper />} />
            <Route path="/metric" element={<Metric />} />
            <Route path="/blog/dashboard" element={<PostPage />} />
            <Route path="/blog/edit/dashboard" element={<PostPage />} />
            <Route path="/blog/delete/dashboard" element={<PostPage />} />
            <Route path="/blog/create" element={<NewBlog />} />
            <Route path="/blog/:id/edit" element={<EditBlog />} />
            <Route path="/blog/:id" element={<SingleBlogPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/form" element={<ThreadsList />} />
            <Route path="/thread/:id" element={<SingleThread />} />
            <Route path="/create-question" element={<CreateQuestion />} />
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
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

// prettier-ignore-end
