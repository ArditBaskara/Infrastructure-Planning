import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../DataContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/bg_5.png";

const Pantai = () => {
  const [step, setStep] = useState(5);
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext);
  const [dataPage, setDataP] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [rangeValues, setRangeValues] = useState([]);
  const [isNearBeach, setIsNearBeach] = useState(null); // State untuk pertanyaan awal

  useEffect(() => {
    if (data && data[2]) {
      setDataP(data[2]);
      try {
        const savedCheckboxStates = JSON.parse(
          localStorage.getItem("checkboxPantai")
        );
        const savedUserStates = JSON.parse(localStorage.getItem("userPantai"));
        if (savedCheckboxStates && Array.isArray(savedCheckboxStates)) {
          setCheckboxStates(savedCheckboxStates);
          if (savedUserStates && Array.isArray(savedUserStates)) {
            setRangeValues(savedUserStates);
          }
        } else {
          setCheckboxStates(Array(Object.keys(data[2]).length - 1).fill(false));
          setRangeValues(Array(Object.keys(data[2]).length - 1).fill(1));
        }
      } catch (error) {
        console.log("Data baru.");
        setCheckboxStates(Array(Object.keys(data[2]).length - 1).fill(false));
        setRangeValues(Array(Object.keys(data[2]).length - 1).fill(1));
      }
    }
  }, [data]);

  const handleRangeChange = (index, value) => {
    const newRangeValues = [...rangeValues];
    newRangeValues[index] = value;
    setRangeValues(newRangeValues);
  };

  const getRangeLabel = (value) => {
    if (value <= 0.2) return "Kurang Yakin";
    if (value <= 0.5) return "Cukup Yakin";
    if (value <= 0.9) return "Yakin Ajah";
    return "Sangat Yakin";
  };

  const handleCheckboxChange = (index) => {
    const newStates = [...checkboxStates];
    newStates[index] = !newStates[index];
    setCheckboxStates(newStates);
  };

  const handleNextStep = () => {
    navigate("/Morfologi");
    localStorage.setItem("checkboxPantai", JSON.stringify(checkboxStates));
    localStorage.setItem("userPantai", JSON.stringify(rangeValues));
  };

  const handlePrevStep = () => {
    setStep(3);
    navigate("/Lahan");
    localStorage.setItem("checkboxPantai", JSON.stringify(checkboxStates));
    localStorage.setItem("userPantai", JSON.stringify(rangeValues));
  };

  const handleBeachQuestion = (answer) => {
    setIsNearBeach(answer);
    if (!answer) {
      handleNextStep(); // Langsung ke langkah berikutnya jika bukan di dekat pantai
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
        style={{ backgroundImage: `url(${bg})` }}
      >
        {isNearBeach === null ? (
          <div className="w-full h-full flex flex-col justify-center items-center px-4">
            <div className="bg-blue-900 p-6 rounded-lg shadow-lg text-center text-white max-w-md">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Apakah lokasi Anda berada di dekat pantai?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleBeachQuestion(true)}
                  className="w-full sm:w-auto py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-200"
                >
                  Ya
                </button>
                <button
                  onClick={() => handleBeachQuestion(false)}
                  className="w-full sm:w-auto py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-200"
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-start items-center px-1 mt-1">
            <div className="w-full max-w-4xl mb-8">
              <ul className="steps steps-horizontal flex-wrap gap-2 justify-center sm:justify-start">
                <li className={`step ${step >= 1 ? "step-primary" : ""}`}></li>
                <li className={`step ${step >= 2 ? "step-primary" : ""}`}></li>
                <li className={`step ${step >= 3 ? "step-primary" : ""}`}></li>
                <li className={`step ${step >= 4 ? "step-primary" : ""}`}></li>
                <li className={`step ${step >= 5 ? "step-primary" : ""}`}></li>
              </ul>
            </div>

            <div className="w-full max-w-lg bg-blue-900 p-6 rounded-lg shadow-lg mt-8 sm:mt-6 md:mt-4 lg:mt-4 xl:mt-0 overflow-y-auto max-h-screen">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-white text-center">Karakteristik Pantai</h2>
              <form className="space-y-4">
                <div className="space-y-3">
                  {Object.entries(dataPage).map((question, index) => {
                    if (index === Object.entries(dataPage).length - 1) {
                      return null; // Abaikan elemen terakhir
                    }
                    return (
                      <div key={index}>
                        <label className="flex items-start space-x-3 text-white cursor-pointer flex-wrap sm:flex-nowrap">
                          <input
                            type="checkbox"
                            checked={checkboxStates[index]}
                            onChange={() => handleCheckboxChange(index)}
                            className="w-4 h-4 rounded border-purple-600 focus:ring-purple-500 mt-1"
                          />
                          <span className="text-sm md:text-lg leading-tight">{question[1]}</span>
                        </label>

                        {checkboxStates[index] && (
                          <div>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={rangeValues[index]}
                              onChange={(e) => handleRangeChange(index, e.target.value)}
                              className="w-full mt-2"
                            />
                            <div className="mt-2">{getRangeLabel(rangeValues[index])}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
        )}
      </motion.div>
    </>
  );
};

export default Pantai;
