import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/bg_14.png";

const getRiskLevel = (responses) => {
  const totalQuestions = Object.values(responses).flat().length;
  const selectedCount = Object.values(responses).flat().filter(Boolean).length;
  const riskScore = selectedCount / totalQuestions;

  if (riskScore >= 0.75) return "Very High";
  if (riskScore >= 0.5) return "High"; 
  if (riskScore >= 0.25) return "Moderate";
  return "Low";
};

const Hasil = () => {
  const location = useLocation();
  const { 
    isRainySeason, 
    sungaiResponses,
    lahanResponses,
    pantaiResponses,
    morfologiResponses, 
    ekstremResponses,
    tsunamiResponses,
    vegetasiResponses,
    longsorResponses,
    seismikResponses,
    vulkanikResponses,
    geologiResponses,
  } = location.state || {};

  const responses = {
    sungai: sungaiResponses,
    lahan: lahanResponses, 
    pantai: pantaiResponses,
    morfologi: morfologiResponses,
    ekstrem: ekstremResponses,
    tsunami: tsunamiResponses,
    vegetasi: vegetasiResponses,
    longsor: longsorResponses,
    seismik: seismikResponses, 
    vulkanik: vulkanikResponses,
    geologi: geologiResponses,
  };

  const riskLevel = getRiskLevel(responses);

  const riskColors = {
    "Very High": "text-red-500",
    "High": "text-orange-500", 
    "Moderate": "text-yellow-500",
    "Low": "text-green-500"
  };

  const recommendations = {
    "Very High": [
      "Perform comprehensive hazard and risk assessments",
      "Develop robust early warning systems", 
      "Conduct regular disaster preparedness drills",
      "Strengthen critical infrastructure to withstand extreme events",
      "Consider relocation of vulnerable populations and assets"  
    ],
    "High": [
      "Assess and reinforce key infrastructure",
      "Establish emergency response and evacuation plans", 
      "Increase public awareness of disaster risks",
      "Implement nature-based solutions for risk reduction where feasible"
    ],
    "Moderate": [
      "Incorporate disaster risk into land-use planning",
      "Promote community-based disaster risk management", 
      "Invest in resilient construction practices",
      "Maintain and upgrade drainage and flood control systems"
    ],
    "Low": [
      "Integrate risk considerations into development projects",
      "Enforce building codes and zoning regulations",
      "Monitor hazards and maintain updated contingency plans", 
      "Foster a culture of safety and preparedness" 
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center px-1 mt-1">

        <div className="w-full max-w-lg bg-blue-900 p-6 rounded-lg shadow-lg mt-8 sm:mt-6 md:mt-4 lg:mt-4 xl:mt-0">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white text-center">Disaster Risk Assessment Results</h2>

          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-white">Location: {location.state?.locationName || "Unknown"}</h3>
              <p className="text-white">Current Season: <span className="font-bold">{isRainySeason ? "Rainy" : "Dry"}</span></p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-white">Overall Risk Level: <span className={`font-bold ${riskColors[riskLevel]}`}>{riskLevel}</span></h3>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-white">Recommendations:</h3>
              <ul className="list-disc pl-6 text-white">
                {recommendations[riskLevel].map((rec, index) => (
                  <li key={index} className="mb-2">{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto mt-4 py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors duration-200"
          >
            Kembali
          </button>
          <button
            onClick={() => alert("Submitting results")}
            className="w-full sm:w-auto mt-4 py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Hasil;
