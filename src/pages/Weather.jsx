import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/bg_2.png";

const Weather = () => {
  const [step, setStep] = useState(2);
  const [isRainySeason, setIsRainySeason] = useState(false);
  const navigate = useNavigate();

  const handleNextStep = () => {
    // Add navigation to next page
    navigate("/Sungai");
  };

  const handlePrevStep = () => {
    setStep(1);
    navigate("/prediction");
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
        <div className="w-full h-screen flex flex-col justify-center items-center mt-4">
          <div className="w-full max-w-4xl mb-8">
            <ul className="steps steps-horizontal">
              <li className={`step ${step >= 1 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 2 ? "step-primary" : ""}`}></li>
            </ul>
          </div>

          <div className="w-full max-w-lg bg-purple-900 p-6 rounded-lg shadow-lg mt-8 sm:mt-6 md:mt-4 lg:mt-4 xl:mt-0">
            <h2 className="text-2xl font-bold mb-4 text-white">Pilih Kondisi Cuaca</h2>
            <form className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center space-x-3 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRainySeason}
                    onChange={() => setIsRainySeason(!isRainySeason)}
                    className="w-4 h-4 rounded border-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-lg">Apakah saat ini musim penghujan?</span>
                </label>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full mt-4 py-2 px-4 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors duration-200"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full mt-4 py-2 px-4 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors duration-200"
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

export default Weather;