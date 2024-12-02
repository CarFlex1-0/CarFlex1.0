import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Scrapper from "@components/Scrapper";
import Metric from "@components/Metric";
import Dashboard from "@components/Dashboard";
import PostPage from "@pages/PostPage";
import NewBlog from "@pages/NewBlog";
import SingleBlogPage from "@pages/SingleBlogPage";
import EditBlog from "@pages/EditBlog";
import FeedbackPage from "@pages/FeedbackPage";
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
import Failure from "@components/Failure";
import AuthorPostPage from "@pages/AuthorPostPage";
import CarEnhancements from "@pages/CarEnhancement";
import AdminDashboard from "@pages/AdminDashboard";
import Users from "@components/admin/Users";
import AdminDashoardAnalytics from "@components/admin/Dashboard";
import Upload3DModel from "@components/admin/Upload3DModel";
import UserDashboard from "@pages/UserDashboard";
import { ThemeProvider } from '@contexts/ThemeContext';
import CarPreview from "@components/car_model/CarPreview";
import ForumPage from "@pages/ForumPage";
import CarPartsMarketplace from "@components/maketplace_buyer/market-place";
import Success from "@components/maketplace_buyer/Success";
import SellerDashboard from "@components/marketplace_seller/SellerDashboard";
import Analytics from "@components/marketplace_seller/Analytics";
import SellerProfilePage from "@components/marketplace_seller/SellerProfilePage";
// import UploadProduct from "@components/marketplace_seller/Products/UploadProduct";
import {Product}  from "@components/marketplace_seller/Products/Product";
import Order  from "@components/marketplace_seller/Orders/Order";
import EditProduct from "@components/marketplace_seller/Products/EditProduct";
import CarPreviewCorolla from "@components/car_model_corolla/CarPreviewCorolla";
import CarPreviewSwift from "@components/car_model_swift/CarPreviewSwift";
import CarPreviewLambo from "@components/lambo-intro-dashboard/CarPreviewLambo";
import ModelSelectionPage from '@pages/ModelSelectionPage';
import ConfigurationViewer from '@components/ConfigurationViewer';
import AdminLoginPage from "@pages/AdminLoginPage";
import OrderDetailsPage from "@components/maketplace_buyer/OrderDetailsPage"
// import OrderDetailsPage from "@pages/OrderDetailsPage";


// Extra! Should be Deleted along with files
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import StickyNavbar from "@components/StickyNavbar";
// import Background from "@components/Background";
// import Footer from "@components/Footer";
// import ThreeDModel from "@components/ThreeDModel";
// import ThreadsList from "@components/forum/ThreadList";
// import SingleThread from "@components/forum/SingleThread";
// import CreateQuestion from "@components/forum/CreateQuestion";
// import Success from "@components/Success";


function App() {
  return (
    <ThemeProvider>
      <div className="App flex flex-col min-h-screen">
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
            <div className="flex-grow">
              {/* Allow content to grow */}
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route
                  path="/user-dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/scrap"
                  element={
                    <ProtectedRoute>
                      <Scrapper />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/metric"
                  element={
                    <ProtectedRoute>
                      <Metric />
                    </ProtectedRoute>
                  }
                />

                {/* Ahmad Raza - Forum & Community */}
                {/* <Route path="/thread/:id" element={<ProtectedRoute><SingleThread /></ProtectedRoute>} />
                <Route path="/create-question" element={<ProtectedRoute><CreateQuestion /></ProtectedRoute>} />
                <Route path="/forum" element={<ProtectedRoute><ThreadsList /></ProtectedRoute>} /> */}

                {/* Combination - User Profiling */}

                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in-admin" element={<AdminLoginPage />} />
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

                <Route path="admin" element={<AdminDashboard />}>
                  <Route
                    path="dashboard"
                    element={<AdminDashoardAnalytics />}
                  />
                  <Route path="users" element={<Users />} />
                  <Route path="upload-3d-model" element={<Upload3DModel />} />
                </Route>

                <Route path="seller" element={<SellerDashboard />}>
                  <Route path="dashboard" element={<Analytics />} />
                  <Route path="profile" element={<SellerProfilePage />} />
                  <Route
                    path="products"
                    element={<Product type="products" />}
                  />
                  <Route path="orders" element={<Order type="orders" />} />
                  {/* <Route path="upload-products" element={<UploadProduct />} /> */}
                  <Route
                    path="products/edit-product/:id"
                    element={<EditProduct />}
                  />
                </Route>

                <Route path="user" element={<UserDashboard />}>
                <Route
                    path="order-details"
                    element={<OrderDetailsPage />}
                  />
                  {/* Profiling */}
                  <Route path="profile-page" element={<ProfilePage />} />
                  {/* Intro Dashboard to User */}
                  <Route path="dashboard" element={<CarPreviewLambo />} />
                  <Route path="user-dashboard" element={<Dashboard />} />

                  {/* 3D Model Routes - Mohid */}
                  <Route path="customize-3d-model" element={<CarPreview />} />
                  <Route
                    path="customize-3d-model-corolla"
                    element={<CarPreviewCorolla />}
                  />
                  <Route
                    path="customize-3d-model-swift"
                    element={<CarPreviewSwift />}
                  />
                  <Route path="models" element={<ModelSelectionPage />} />
                  <Route path="models/:id" element={<ConfigurationViewer />} />
                  <Route
                    path="model/civic"
                    element={
                      <ProtectedRoute>
                        <div className="flex justify-center items-center">
                          <CarPreview />
                        </div>
                      </ProtectedRoute>
                    }
                  />

                  {/* Mohid Anwar Blog Routes */}
                  <Route path="blog-dashboard" element={<PostPage />} />
                  <Route path="blog/author/:id" element={<PostPage />} />
                  <Route path="blog/:id" element={<SingleBlogPage />} />
                  <Route path="blog-create" element={<NewBlog />} />
                  <Route path="blog/:id/edit" element={<EditBlog />} />
                  <Route
                    path="blog-actions-dashboard"
                    element={<AuthorPostPage />}
                  />

                  {/* Ahmad Marketplace  */}
                  <Route path="success" element={<Success />} />
                  <Route path="failure" element={<Failure />} />
                  <Route path="buy-parts" element={<CarPartsMarketplace />} />
                  <Route path="subscription" element={<SubscriptionSelect />} />

                  {/* Mohid Anwar Feedback */}
                  <Route path="feedback" element={<FeedbackPage />} />
                  {/* Forum Page */}
                  <Route path="forum-page" element={<ForumPage />} />
                  {/* Ai Ahmad */}
                  <Route
                    path="car-enhancements"
                    element={<CarEnhancements />}
                  />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
