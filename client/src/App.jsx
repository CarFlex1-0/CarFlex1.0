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
import { AuthProvider } from "./contexts/auth_context";
import ProtectedRoute from "./routes/protected_routes"; // Adjust the path if needed;
import SubscriptionSelect from "@components/SubscriptionSelect";
import Success from "@components/Success";
import Failure from "@components/Failure";
import AuthorPostPage from "@pages/AuthorPostPage";
import CarEnhancements from "@pages/CarEnhancement";
import AdminDashboard from "@pages/AdminDashboard";
import Users from "@components/admin/Users";
import AdminDashoardAnalytics from "@components/admin/Dashboard";
import Upload3DModel from "@components/admin/Upload3DModel";
import UserDashboard from "@pages/UserDashboard";
import ForumCommunity from "@pages/ForumCommunity";
import { ThemeProvider } from '@contexts/ThemeContext';
import CarPreview from "@components/car_model/CarPreview";
import CarPreviewCorolla from "@components/car_model_corolla/CarPreviewCorolla";


import CarPreviewLambo from "@components/lambo-intro-dashboard/CarPreviewLambo";

function App() {
  return (
    <ThemeProvider>
      <div className="App flex flex-col min-h-screen">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        <AuthProvider>
          <BrowserRouter>
            {/* <StickyNavbar /> */}
            {/* <Background /> */}
            <div className="flex-grow">
              {/* Allow content to grow */}
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/car-enhancements" element={<CarEnhancements />} />
                <Route path="/user-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/scrap" element={<ProtectedRoute><Scrapper /></ProtectedRoute>} />
                <Route path="/metric" element={<ProtectedRoute><Metric /></ProtectedRoute>} />
                <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
                <Route path="/forum" element={<ProtectedRoute><ThreadsList /></ProtectedRoute>} />
                <Route path="/thread/:id" element={<ProtectedRoute><SingleThread /></ProtectedRoute>} />
                <Route path="/create-question" element={<ProtectedRoute><CreateQuestion /></ProtectedRoute>} />
                <Route path="/profile-page" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
                <Route path="/reset-password" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
                <Route path="/model" element={<ProtectedRoute><div className="flex justify-center items-center h-[80vh]"><ThreeDModel /></div></ProtectedRoute>} />
                <Route path="/model/civic" element={<ProtectedRoute><div className="flex justify-center items-center"><CarPreview /></div></ProtectedRoute>} />
                <Route path="/subscription" element={<ProtectedRoute><SubscriptionSelect /></ProtectedRoute>} />
                <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
                <Route path="/failure" element={<ProtectedRoute><Failure /></ProtectedRoute>} />
                <Route path="admin" element={<AdminDashboard />}>
                  <Route path="dashboard" element={<AdminDashoardAnalytics />} />
                  <Route path="users" element={<Users />} />
                  <Route path="upload-3d-model" element={<Upload3DModel />} />
                </Route>
                <Route path="user" element={<UserDashboard />}>
                  {/* Intro Dashboard to User */}
                  <Route path="dashboard" element={<CarPreviewLambo />} />
                  {/* <Route path="dashboard" element={<div className="flex justify-center items-center h-screen text-5xl">Hi</div>} /> */}
                  <Route path="user-dashboard" element={<Dashboard />} />
                  <Route path="customize-3d-model" element={<CarPreview />} />
                  <Route path="customize-3d-model-corolla" element={<CarPreviewCorolla />} />
                  <Route path="car-enhancements" element={<CarEnhancements />} />
                  <Route path="blog-dashboard" element={<PostPage />} />
                  <Route path="blog-create" element={<NewBlog />} />
                  <Route path="blog/:id/edit" element={<EditBlog />} />
                  <Route path="blog-actions-dashboard" element={<AuthorPostPage />} />
                  <Route path="blog/author/:id" element={<PostPage />} />
                  <Route path="blog/:id" element={<SingleBlogPage />} />
                  <Route path="subscription" element={<SubscriptionSelect />} />
                  <Route path="profile-page" element={<ProfilePage />} />
                  <Route path="feedback" element={<FeedbackPage />} />
                  <Route path="forum" element={<ForumCommunity />} />
                </Route>
              </Routes>
            </div>
            {/* <Footer /> */}
          </BrowserRouter>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
