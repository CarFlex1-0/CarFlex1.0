// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThreadsList from "./components/ThreadList";
import SingleThread from "./components/SingleThread";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ThreadsList />} />
        <Route path="/thread/:id" element={<SingleThread />} />
      </Routes>
    </Router>
  );
};

export default App;
