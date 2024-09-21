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
import ProtectedRoute from "./routes/protected_routes"; // Adjust the path if needed

function App() {
  return (
    <AuthProvider>
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
              {/* Protected Route */}
              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              {/* Admin Route */}
              <Route
                path="/scrap"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Scrapper />{" "}
                  </ProtectedRoute>
                }
              />
              {/* Miscellaneous Route */}
              <Route
                path="/metric"
                element={
                  <ProtectedRoute>
                    <Metric />
                  </ProtectedRoute>
                }
              />
              {/* Blog User Routes */}
              <Route
                path="/blog/dashboard"
                element={
                  <ProtectedRoute>
                    {" "}
                    <PostPage />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <ProtectedRoute>
                    {" "}
                    <SingleBlogPage />{" "}
                  </ProtectedRoute>
                }
              />
              {/* Blog Author Routes */}
              <Route
                path="/blog/edit/dashboard"
                element={
                  <ProtectedRoute>
                    {" "}
                    <PostPage />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/delete/dashboard"
                element={
                  <ProtectedRoute>
                    {" "}
                    <PostPage />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/create"
                element={
                  <ProtectedRoute>
                    {" "}
                    <NewBlog />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/:id/edit"
                element={
                  <ProtectedRoute>
                    {" "}
                    <EditBlog />{" "}
                  </ProtectedRoute>
                }
              />
              {/* Blog User Route */}
              <Route
                path="/feedback"
                element={
                  <ProtectedRoute>
                    {" "}
                    <FeedbackPage />{" "}
                  </ProtectedRoute>
                }
              />
              {/* Forum User Routes */}
              <Route
                path="/form"
                element={
                  <ProtectedRoute>
                    {" "}
                    <ThreadsList />{" "}
                  </ProtectedRoute>
                }
              />
              {/* Forum Author Routes */}
              <Route
                path="/thread/:id"
                element={
                  <ProtectedRoute>
                    {" "}
                    <SingleThread />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-question"
                element={
                  <ProtectedRoute>
                    {" "}
                    <CreateQuestion />{" "}
                  </ProtectedRoute>
                }
              />
              {/* User Profiling User Route */}
              <Route
                path="/profile-page"
                element={
                  <ProtectedRoute>
                    {" "}
                    <ProfilePage />{" "}
                  </ProtectedRoute>
                }
              />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/forgot-password"
                element={
                  <ProtectedRoute>
                    {" "}
                    <ForgotPassword />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <ProtectedRoute>
                    {" "}
                    <ResetPassword />{" "}
                  </ProtectedRoute>
                }
              />
              {/* 3D Model User Route - Combine With Metric */}
              <Route
                path="/model"
                element={
                  <ProtectedRoute>
                    <div className="flex justify-center items-center h-[80vh] z-50">
                      <ThreeDModel />
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
