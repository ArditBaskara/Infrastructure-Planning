import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import bg from "../assets/bgg.jpg";

const Prediction = () => {
  const [step, setStep] = useState(1); // Step state
  const [location, setLocation] = useState(""); // State for location input
  const navigate = useNavigate();

  useEffect(() => {
    const savedUserLoc = JSON.parse(localStorage.getItem("dataLocation"));
    if (savedUserLoc !== undefined) {
      setLocation(savedUserLoc);
    }
  }, []);

  const handleNextStep = () => {
    if (location.trim() !== "") {
      setStep(2); // Increment step
      navigate("/Sungai");
      localStorage.setItem("dataLocation", JSON.stringify(location));
    } else {
      alert("Harap masukkan lokasi terlebih dahulu!");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }} // Ganti dengan path gambar
      >
        {/* Horizontal Steps */}
        <div className="w-full h-screen flex flex-col justify-center items-center mt-4 ">
          <div className="w-full max-w-4xl mb-8">
            <ul className="steps steps-horizontal">
              <li className={`step ${step >= 1 ? "step-primary" : ""}`}></li>
            </ul>
          </div>

          <div className="w-full max-w-lg bg-purple-900 p-6 rounded-lg shadow-lg mt-8 sm:mt-6 md:mt-4 lg:mt-4 xl:mt-0">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Masukkan Lokasi
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Masukkan lokasi Anda"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 rounded border text-white bg-purple-800 placeholder-purple-300 border-purple-600 focus:outline-none focus:border-purple-500"
              />
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full mt-4 py-2 px-4 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Prediction;
