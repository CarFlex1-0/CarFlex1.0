import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
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
// import Success from "@components/Success";
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
import ForumPage from "@pages/ForumPage";
import CarPartsMarketplace from "@components/maketplace_buyer/market-place";
import Success from "@components/maketplace_buyer/Success";
import SellerDashboard from "@components/marketplace_seller/SellerDashboard";
import Analytics from "@components/marketplace_seller/Analytics";
import UploadProduct from "@components/marketplace_seller/Products/UploadProduct";
import { Product } from "@components/marketplace_seller/Products/Product";
import { Sale } from "@components/marketplace_seller/Products/Sale";
import { Order } from "@components/marketplace_seller/Products/Order";
import EditProduct from "@components/marketplace_seller/Products/EditProduct";
// Create a QueryClient instance
const queryClient = new QueryClient();import CarPreviewCorolla from "@components/car_model_corolla/CarPreviewCorolla";
import CarPreviewSwift from "@components/car_model_swift/CarPreviewSwift";


import CarPreviewLambo from "@components/lambo-intro-dashboard/CarPreviewLambo";

import ModelSelectionPage from '@pages/ModelSelectionPage';
import ConfigurationViewer from '@components/ConfigurationViewer';

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <AuthProvider>
          <BrowserRouter>
            {/* <StickyNavbar /> */}
            {/* <Background /> */}
            <div className="flex-grow">
              {" "}
              {/* Allow content to grow */}
              <Routes>
                <Route path="/" element={<Welcome />} />

                <Route path="seller" element={<SellerDashboard />}>
                  <Route path="dashboard" element={<Analytics />} />
                  <Route
                    path="products"
                    element={<Product type="products" />}
                  />
                  <Route path="sales" element={<Sale />} />
                  <Route path="orders" element={<Order type="orders" />} />
                  <Route path="upload-products" element={<UploadProduct />} />
                  <Route path="products/edit-product/:id" element={<EditProduct />}
                  />
                </Route>

                <Route path="/car-enhancements" element={<CarEnhancements />} />

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
                      <Scrapper />
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
                      <PostPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog/author/:id"
                  element={
                    <ProtectedRoute>
                      <PostPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog/:id"
                  element={
                    <ProtectedRoute>
                      <SingleBlogPage />
                    </ProtectedRoute>
                  }
                />
                {/* Blog Author Routes */}
                <Route
                  path="/blog/actions/dashboard"
                  element={
                    <ProtectedRoute>
                      <AuthorPostPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog/create"
                  element={
                    <ProtectedRoute>
                      <NewBlog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog/:id/edit"
                  element={
                    <ProtectedRoute>
                      <EditBlog />
                    </ProtectedRoute>
                  }
                />
                {/* Blog User Route */}
                <Route
                  path="/feedback"
                  element={
                    <ProtectedRoute>
                      <FeedbackPage />
                    </ProtectedRoute>
                  }
                />
                {/* Forum User Routes */}
                <Route
                  path="/forum"
                  element={
                    <ProtectedRoute>
                      <ThreadsList />
                    </ProtectedRoute>
                  }
                />
                {/* Forum Author Routes */}
                <Route
                  path="/thread/:id"
                  element={
                    <ProtectedRoute>
                      <SingleThread />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create-question"
                  element={
                    <ProtectedRoute>
                      <CreateQuestion />
                    </ProtectedRoute>
                  }
                />
                {/* User Profiling User Route */}
                <Route
                  path="/profile-page"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                  path="/forgot-password"
                  element={
                    <ProtectedRoute>
                      <ForgotPassword />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reset-password"
                  element={
                    <ProtectedRoute>
                      <ResetPassword />
                    </ProtectedRoute>
                  }
                />

                {/* 3D Model User Route - Combine With Metric */}
                <Route
                  path="/model"
                  element={
                    <ProtectedRoute>
                      <div className="flex justify-center items-center h-[80vh]">
                        <ThreeDModel />
                      </div>
                    </ProtectedRoute>
                  }
                />
                {/* 3D Model User Route - Combine With Metric */}
                <Route
                  path="/model/civic"
                  element={
                    <ProtectedRoute>
                      <div className="flex justify-center items-center">
                        <CarPreview />
                      </div>
                    </ProtectedRoute>
                  }
                />

                {/* Subscription Routes */}
                <Route
                  path="/subscription"
                  element={
                    <ProtectedRoute>
                      {" "}
                      <SubscriptionSelect />
                    </ProtectedRoute>
                  }
                />
                {/* <Route
                  path="/success"
                  element={
                    <ProtectedRoute>
                      {" "}
                      <Success />
                    </ProtectedRoute>
                  }
                /> */}
                <Route
                  path="/failure"
                  element={
                    <ProtectedRoute>
                      {" "}
                      <Failure />
                    </ProtectedRoute>
                  }
                />
                <Route path="admin" element={<AdminDashboard />}>
                  <Route
                    path="dashboard"
                    element={<AdminDashoardAnalytics />}
                  />
                  <Route path="users" element={<Users />} />
                  <Route path="upload-3d-model" element={<Upload3DModel />} />
                </Route>

                <Route path="user" element={<UserDashboard />}>
                  <Route path="user-dashboard" element={<Dashboard />} />
                  <Route path="customize-3d-model" element={<CarPreview />} />
                  <Route
                    path="car-enhancements"
                    element={<CarEnhancements />}
                  />
                  <Route path="blog-dashboard" element={<PostPage />} />
                  <Route path="blog-create" element={<NewBlog />} />
                  <Route
                    path="blog-actions-dashboard"
                    element={<AuthorPostPage />}
                  />
                  <Route path="subscription" element={<SubscriptionSelect />} />
                  <Route path="profile-page" element={<ProfilePage />} />
                  <Route path="feedback" element={<FeedbackPage />} />
                  {/* Forum User Routes */}
                  <Route path="forum-page" element={<ForumPage />} />
                  <Route path="buy-parts" element={<CarPartsMarketplace />} />
                  <Route path="success" element={<Success />} />
                </Route>
              </Routes>
            </div>
            {/* <Footer /> */}
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
