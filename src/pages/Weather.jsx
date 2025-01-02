import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/bg_2.png";
import { DataContext } from "../DataContext";

const Weather = () => {
  const [step, setStep] = useState(2);
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext);
  const [dataPage, setDataP] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState([]);
  
  useEffect(() => {
    if (data && data[6]) {
      setDataP(data[6]);
      try {
        const savedCheckboxStates = JSON.parse(localStorage.getItem("checkboxWeather"));
        if (savedCheckboxStates && Array.isArray(savedCheckboxStates)) {
          setCheckboxStates(savedCheckboxStates);
        } else {
          setCheckboxStates(Array(Object.keys(data[6]).length).fill(false));
          console.log("Data baru1.");
        }
      } catch (error) {
        console.log("Data baru.");
        setCheckboxStates(Array(Object.keys(data[6]).length).fill(false));
      }
    }
  }, [data]);

  const handleCheckboxChange = (index) => {
    const newStates = [...checkboxStates];
    newStates[index] = !newStates[index];
    setCheckboxStates(newStates);
    console.log("Saved1 : ", JSON.parse(localStorage.getItem("checkboxWeather")));
  };

  const handleNextStep = () => {
    // Add navigation to next page
    navigate("/Sungai");
    localStorage.setItem("checkboxWeather", JSON.stringify(checkboxStates));
  };

  const handlePrevStep = () => {
    setStep(1);
    navigate("/prediction");
    localStorage.setItem("checkboxWeather", JSON.stringify(checkboxStates));
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
              {Object.entries(dataPage).map((question, index) => {
                  if (index === Object.entries(dataPage).length - 1) {
                    return null;  // Abaikan elemen terakhir
                  }
                  
                  return(
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
                      <span className="text-sm md:text-lg leading-tight">{question[1]}</span>
                    </label>
                  );
                })}
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