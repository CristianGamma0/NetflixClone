// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./home/home.jsx";
import Details from "./pages/Details.jsx";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:mediaType/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;