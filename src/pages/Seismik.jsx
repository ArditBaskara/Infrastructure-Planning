import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import bg from "../assets/bg_11.png";

const Seismik = () => {
  const [step, setStep] = useState(10);
  const [checkboxStates, setCheckboxStates] = useState(Array(10).fill(false));
  const navigate = useNavigate();

  const handleCheckboxChange = (index) => {
    const newStates = [...checkboxStates];
    newStates[index] = !newStates[index];
    setCheckboxStates(newStates);
  };

  const handleNextStep = () => {
    navigate("/Vulkanik");
  };

  const handlePrevStep = () => {
    setStep(9);
    navigate("/Longsor");
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
              <li className={`step ${step >= 4 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 5 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 6 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 7 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 8 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 9 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 10 ? "step-primary" : ""}`}></li>
              <li className={`step ${step >= 11 ? "step-primary" : ""}`}></li>
            </ul>
          </div>

          <div className="w-full max-w-lg bg-red-900 p-6 rounded-lg shadow-lg mt-8 sm:mt-6 md:mt-4 lg:mt-4 xl:mt-0 overflow-y-auto max-h-screen">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white text-center">
              Risiko Seismik dan Gempa Bumi
            </h2>
            <form className="space-y-4">
              <div className="space-y-3">
                {[
                  "Apakah wilayah ini berada dekat dengan sesar aktif?",
                  "Apakah terdapat aktivitas vulkanik di sekitar wilayah ini?",
                  "Apakah bangunan di wilayah ini dirancang tahan gempa?",
                  "Apakah wilayah ini memiliki riwayat gempa bumi yang signifikan?",
                  "Apakah jenis tanah di wilayah ini dapat memperkuat getaran gempa?",
                  "Apakah terdapat potensi likuifaksi di wilayah ini?",
                  "Apakah wilayah ini memiliki sistem peringatan dini untuk gempa bumi?",
                  "Apakah terdapat jalur evakuasi yang jelas untuk menghadapi gempa bumi?",
                  "Apakah penduduk di wilayah ini mendapatkan edukasi mengenai mitigasi gempa?",
                  "Apakah infrastruktur penting di wilayah ini memiliki proteksi terhadap gempa?",
                ].map((question, index) => (
                  <label
                    key={index}
                    className="flex items-start space-x-3 text-white cursor-pointer flex-wrap sm:flex-nowrap"
                  >
                    <input
                      type="checkbox"
                      checked={checkboxStates[index]}
                      onChange={() => handleCheckboxChange(index)}
                      className="w-4 h-4 rounded border-red-600 focus:ring-red-500 mt-1"
                    />
                    <span className="text-sm md:text-lg leading-tight">{question}</span>
                  </label>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full sm:w-auto mt-4 py-2 px-4 bg-red-700 text-white rounded hover:bg-red-800 transition-colors duration-200"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full sm:w-auto mt-4 py-2 px-4 bg-red-700 text-white rounded hover:bg-red-800 transition-colors duration-200"
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

export default Seismik;
