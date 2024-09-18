<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from '../public/assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
       <h1 className="text-3xl font-bold underline">
      Welcome to CarFlex
    </h1>
    </>
  )
}

export default App
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import StickyNavbar from "./components/StickyNavbar";
import Background from "./components/Background";
import Footer from "./components/Footer";
import ThreeDModel from "./components/ThreeDModel";
import Scrapper from "./components/Scrapper";
import Metric from "./components/Metric";
import Dashboard from "./components/Dashboard";
import PostPage from "./pages/PostPage";
import NewBlog from "./pages/NewBlog";
import SingleBlogPage from "./pages/SingleBlogPage";
import EditBlog from "./pages/EditBlog";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <StickyNavbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Background />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/model"
              element={
                <>
                  {/* <Background /> */}
                  <Background></Background>
                  <div className="flex justify-center items-center h-[80vh] z-50 ">
                    <ThreeDModel />
                  </div>
                </>
              }
            />
            <Route
              path="/scrap"
              element={
                <>
                  <Scrapper />
                  <Background />
                </>
              }
            />
            <Route
              path="/metric"
              element={
                <>
                  <Metric />
                  <Background />
                </>
              }
            />
            <Route
              path="/blog/dashboard"
              element={
                <>
                  <Background />
                  <PostPage />
                </>
              }
            />
            <Route
              path="/blog/edit/dashboard"
              element={
                <>
                  <Background />
                  <PostPage />
                </>
              }
            />
            <Route
              path="/blog/delete/dashboard"
              element={
                <>
                  <Background />
                  <PostPage />
                </>
              }
            />
            <Route
              path="/blog/create"
              element={
                <>
                  <Background />
                  <NewBlog />
                </>
              }
            />
            <Route
              path="/blog/:id/edit"
              element={
                <>
                  <Background />
                  <EditBlog />
                </>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <>
                  <Background />
                  <SingleBlogPage />
                </>
              }
            />
            <Route
              path="/feedback"
              element={
                <>
                  <Background />
                  <FeedbackPage />
                </>
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
>>>>>>> origin/mohid
