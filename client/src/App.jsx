// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThreadsList from "./components/forum/ThreadList";
import SingleThread from "./components/forum/SingleThread";
import Header from "./components/forum/Header";
import CreateQuestion from "./components/forum/CreateQuestion";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ThreadsList />} />
        <Route path="/thread/:id" element={<SingleThread />} />
        <Route path="/create-question" element={<CreateQuestion />} />
      </Routes>
    </Router>
  );
};

export default App;
