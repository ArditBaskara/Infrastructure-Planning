import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import bg from "../assets/bg_3.png";

const Sungai = () => {
  const [step, setStep] = useState(3);
  const [checkboxStates, setCheckboxStates] = useState(Array(9).fill(false));
  const navigate = useNavigate();

  const handleCheckboxChange = (index) => {
    const newStates = [...checkboxStates];
    newStates[index] = !newStates[index];
    setCheckboxStates(newStates);
  };

  const handleNextStep = () => {
    navigate("/Lahan");
  };

  const handlePrevStep = () => {
    setStep(1);
    navigate("/Weather");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="w-full h-full flex flex-col justify-start items-center px-1 mt-1">
          <div className="w-full max-w-4xl mb-8">
            <ul className="steps steps-horizontal flex-wrap gap-2 justify-center sm:justify-start">
              <li className={`step ${step >= 1 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 2 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 3 ? "step-primary" : ""}`}></li>
            </ul>
          </div>

          <div className="w-full max-w-lg bg-purple-900 p-6 rounded-lg shadow-lg mt-8 sm:mt-6 md:mt-4 lg:mt-4 xl:mt-0 overflow-y-auto max-h-screen">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white text-center">Kondisi Sungai dan Ngarai</h2>
            <form className="space-y-4">
              <div className="space-y-3">
                {[
                  "Apakah lokasi anda lebih tinggi dari dasar sungai terdekat?",
                  "Apakah lokasi anda berada dekat dengan sungai?",
                  "Apakah sungai di sekitar lokasi berkelok-kelok?",
                  "Apakah sungai di sekitar lokasi memiliki ukuran yang besar?",
                  "Apakah dasar sungai terdiri dari material batuan padat?",
                  "Apakah terdapat fitur khas di sekitar sungai ini yang berpotensi berbahaya?",
                  "Apakah cekungan ngarai di lokasi anda berada pada ketinggian yang signifikan?",
                  "Apakah ngarai di lokasi ini memiliki kemiringan yang curam?",
                  "Apakah aliran air di ngarai ini hanya mengalir secara musiman?",
                ].map((question, index) => (
                  <label
                    key={index}
                    className="flex items-start space-x-3 text-white cursor-pointer flex-wrap sm:flex-nowrap"
                  >
                    <input
                      type="checkbox"
                      checked={checkboxStates[index]}
                      onChange={() => handleCheckboxChange(index)}
                      className="w-4 h-4 rounded border-purple-600 focus:ring-purple-500 mt-1"
                    />
                    <span className="text-sm md:text-lg leading-tight">{question}</span>
                  </label>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full sm:w-auto mt-4 py-2 px-4 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors duration-200"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full sm:w-auto mt-4 py-2 px-4 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sungai;
