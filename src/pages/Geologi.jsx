import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/bg_13.png";

const Geologi = () => {
  const [step, setStep] = useState(12);
  const [checkboxStates, setCheckboxStates] = useState(Array(4).fill(false));
  const navigate = useNavigate();

  const handleCheckboxChange = (index) => {
    const newStates = [...checkboxStates];
    newStates[index] = !newStates[index];
    setCheckboxStates(newStates);
  };

  const handleNextStep = () => {
    navigate("/Hasil");
  };

  const handlePrevStep = () => {
    setStep(11);
    navigate("/Vulkanik");
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
        <div className="w-full h-screen flex flex-col justify-center items-center px-1 mt-1">
          <div className="w-full max-w-4xl mb-8">
            <ul className="steps steps-horizontal flex-wrap gap-2 justify-center sm:justify-start">
              <li className={`step ${step >= 1 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 2 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 3 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 4 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 5 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 6 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 7 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 8 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 9 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 10 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 11 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 12 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 13 ? "step-primary" : ""}`}></li>
            </ul>
          </div>

          <div className="w-full max-w-lg bg-blue-900 p-6 rounded-lg shadow-lg mt-8 sm:mt-6 md:mt-4 lg:mt-4 xl:mt-0">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white text-center">
              Klasifikasi Geologi dan Struktur Tanah
            </h2>
            <form className="space-y-4">
              <div className="space-y-3">
                {[
                  "Apakah jenis tanah di wilayah ini memiliki daya dukung yang baik?",
                  "Apakah terdapat struktur geologi yang dapat memicu bencana alam?",
                  "Apakah wilayah ini memiliki lapisan tanah yang stabil untuk pembangunan?",
                  "Apakah terdapat potensi likuifaksi pada kondisi tanah di wilayah ini?",
                ].map((question, index) => (
                  <label
                    key={index}
                    className="flex items-start space-x-3 text-white cursor-pointer flex-wrap sm:flex-nowrap"
                  >
                    <input
                      type="checkbox"
                      checked={checkboxStates[index]}
                      onChange={() => handleCheckboxChange(index)}
                      className="w-4 h-4 rounded border-blue-600 focus:ring-blue-500 mt-1"
                    />
                    <span className="text-sm md:text-lg leading-tight">{question}</span>
                  </label>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full sm:w-auto mt-4 py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors duration-200"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full sm:w-auto mt-4 py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors duration-200"
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

export default Geologi;
