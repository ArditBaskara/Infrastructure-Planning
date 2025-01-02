import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Hero from "./pages/hero";
import Prediction from "./pages/Prediction";
import Weather from "./pages/Weather";
import Sungai from "./pages/Sungai";
import Lahan from "./pages/Lahan";
import Navbar from "./components/Navbar";
import Pantai from "./pages/Pantai";
import Morfologi from "./pages/Morfologi";
import Tsunami from "./pages/Tsunami";
import Ekstrem from "./pages/Ekstrem";
import Vegetasi from "./pages/Vegetasi";
import Longsor from "./pages/Longsor";
import Seismik from "./pages/Seismik";
import Vulkanik from "./pages/Vulkanik"
import Geologi from "./pages/Geologi"
import Hasil from "./pages/Hasil"
import DataProvider from "./DataContext";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <DataProvider>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Hero />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/Sungai" element={<Sungai />} />
        <Route path="/Lahan" element={<Lahan />} />
        <Route path="/Pantai" element={<Pantai />} />
        <Route path="/Morfologi" element={<Morfologi />} />
        <Route path="/Tsunami" element={<Tsunami />} />
        <Route path="/Seismik" element={<Seismik />} />
        <Route path="/Hasil" element={<Hasil />} />
      </Routes>
      </DataProvider>
    </AnimatePresence>
  );
};

const App = () => (
  <Router>
    <Navbar />
    <AnimatedRoutes />
  </Router>
);

export default App;