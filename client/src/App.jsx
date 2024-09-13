import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import StickyNavbar from "./components/StickyNavbar";
import Background from "./components/Background";
import Footer from "./components/Footer";
import ThreeDModel from "./components/ThreeDModel";
import Scrapper from "./components/Scrapper";
import Metric from "./components/Metric";

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
                  <h2 className="w-screen min-h-screen flex items-center justify-center">
                    Welcome to CarFlex Dashboard
                  </h2>
                </>
              }
            />
            <Route
              path="/model"
              element={
                <>
                  {/* <Background /> */}
                  <div className="flex justify-center items-center h-[80vh] z-50">
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
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
