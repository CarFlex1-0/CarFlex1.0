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
import { ThemeProvider } from "@contexts/ThemeContext";
import CarPreview from "@components/car_model/CarPreview";
import ForumPage from "@pages/ForumPage";
import CarPartsMarketplace from "@components/maketplace_buyer/market-place";
import Success from "@components/maketplace_buyer/Success";
import SellerDashboard from "@components/marketplace_seller/SellerDashboard";
import Analytics from "@components/marketplace_seller/Analytics";
import SellerProfilePage from "@components/marketplace_seller/SellerProfilePage";
// import UploadProduct from "@components/marketplace_seller/Products/UploadProduct";
import { Product } from "@components/marketplace_seller/Products/Product";
import Order from "@components/marketplace_seller/Orders/Order";
import EditProduct from "@components/marketplace_seller/Products/EditProduct";
import CarPreviewCorolla from "@components/car_model_corolla/CarPreviewCorolla";
import CarPreviewSwift from "@components/car_model_swift/CarPreviewSwift";
import CarPreviewLambo from "@components/lambo-intro-dashboard/CarPreviewLambo";
import ModelSelectionPage from "@pages/ModelSelectionPage";
import ConfigurationViewer from "@components/ConfigurationViewer";
import AdminLoginPage from "@pages/AdminLoginPage";
import OrderDetailsPage from "@components/maketplace_buyer/OrderDetailsPage";
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
              <Routes>
                <Route path="/" element={<Welcome />} />
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

                <Route
                  path="admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    path="dashboard"
                    element={
                      <ProtectedRoute>
                        <AdminDashoardAnalytics />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="users"
                    element={
                      <ProtectedRoute>
                        <Users />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="upload-3d-model"
                    element={
                      <ProtectedRoute>
                        <Upload3DModel />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                <Route
                  path="seller"
                  element={
                    <ProtectedRoute>
                      <SellerDashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    path="dashboard"
                    element={
                      <ProtectedRoute>
                        <Analytics />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="profile"
                    element={
                      <ProtectedRoute>
                        <SellerProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="products"
                    element={
                      <ProtectedRoute>
                        <Product type="products" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="orders"
                    element={
                      <ProtectedRoute>
                        <Order type="orders" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="products/edit-product/:id"
                    element={
                      <ProtectedRoute>
                        <EditProduct />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                <Route
                  path="user"
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    path="order-details"
                    element={
                      <ProtectedRoute>
                        <OrderDetailsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="profile-page"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="dashboard"
                    element={
                      <ProtectedRoute>
                        <CarPreviewLambo />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="user-dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="customize-3d-model"
                    element={
                      <ProtectedRoute>
                        <CarPreview />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="customize-3d-model-corolla"
                    element={
                      <ProtectedRoute>
                        <CarPreviewCorolla />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="customize-3d-model-swift"
                    element={
                      <ProtectedRoute>
                        <CarPreviewSwift />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="models"
                    element={
                      <ProtectedRoute>
                        <ModelSelectionPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="models/:id"
                    element={
                      <ProtectedRoute>
                        <ConfigurationViewer />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="model/civic"
                    element={
                      <ProtectedRoute>
                        <CarPreview />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="blog-dashboard"
                    element={
                      <ProtectedRoute>
                        <PostPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="blog/author/:id"
                    element={
                      <ProtectedRoute>
                        <PostPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="blog/:id"
                    element={
                      <ProtectedRoute>
                        <SingleBlogPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="blog-create"
                    element={
                      <ProtectedRoute>
                        <NewBlog />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="blog/:id/edit"
                    element={
                      <ProtectedRoute>
                        <EditBlog />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="blog-actions-dashboard"
                    element={
                      <ProtectedRoute>
                        <AuthorPostPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="success"
                    element={
                      <ProtectedRoute>
                        <Success />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="failure"
                    element={
                      <ProtectedRoute>
                        <Failure />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="buy-parts"
                    element={
                      <ProtectedRoute>
                        <CarPartsMarketplace />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="subscription"
                    element={
                      <ProtectedRoute>
                        <SubscriptionSelect />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="feedback"
                    element={
                      <ProtectedRoute>
                        <FeedbackPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="forum-page"
                    element={
                      <ProtectedRoute>
                        <ForumPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="car-enhancements"
                    element={
                      <ProtectedRoute>
                        <CarEnhancements />
                      </ProtectedRoute>
                    }
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
