import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebaseConfig";
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
  const [data, setData] = useState([]);
  const [listCF, setCF] = useState([]);
  const savedCF = [];
  const pickCF = {};
  const userCF = {};
  const [resultCF, setResultCF] = useState({});

  const savedWeather = JSON.parse(localStorage.getItem("checkboxWeather"));
  const savedSungai = JSON.parse(localStorage.getItem("checkboxSungai"));
  const savedLahan = JSON.parse(localStorage.getItem("checkboxLahan"));
  const savedPantai = JSON.parse(localStorage.getItem("checkboxPantai"));
  const savedMorfologi = JSON.parse(localStorage.getItem("checkboxMorfologi"));
  const savedTsunami = JSON.parse(localStorage.getItem("checkboxTsunami"));
  const savedSeismik = JSON.parse(localStorage.getItem("checkboxSeismik"));
  const savedData = [
    savedMorfologi,
    savedSungai,
    savedPantai,
    savedSeismik,
    savedLahan,
    savedTsunami,
    savedWeather
  ];
  const userData = [
    JSON.parse(localStorage.getItem("userMorfologi")),
    JSON.parse(localStorage.getItem("userSungai")),
    JSON.parse(localStorage.getItem("userPantai")),
    JSON.parse(localStorage.getItem("userSeismik")),
    JSON.parse(localStorage.getItem("userLahan")),
    JSON.parse(localStorage.getItem("userTsunami"))
  ];
  // A:0  -  B:1   -  G:2  -  J:3  -  L:4  -  T:5 
  const KB = {
    Banjir: [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7]],
    Gelombang_Tinggi: [[2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6]],
    Tsunami: [[2, 4], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5]],
    Longsor: [[1, 5], [4, 1], [4, 2], [4, 3], [4, 4]],
    Gempa_Bumi: [[3, 1], [3, 2], [3, 3], [3, 4], [3, 5]],
    Gunung_Api: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]]
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const colRef = collection(db, "cf-list");
        const snapshot = await getDocs(colRef);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(data);
        
        for (let i = 0; i < savedData.length; i++) {
          for (let j = 0; j < savedData[i].length; j++) {
            if(savedData[i][j]){
              savedCF.push(data[i][j+1]);
              Object.assign(pickCF, {
                [`${i},${j + 1}`]: data[i][j + 1]
              });
              Object.assign(userCF, {
                [`${i},${j + 1}`]: userData[i][j]
              });
            }
          }
        }
        setCF(savedCF.slice(0, Math.ceil(savedCF.length / 2)));

        let cf_total = 0; 
        let cfResults = {};
        let result = 0;
        
        console.log(pickCF);
        console.log(userCF);

        for (let key in KB) {
          for (let i in KB[key]) {
            if (pickCF.hasOwnProperty(KB[key][i])) {
              if (cfResults[key] === undefined) {
                result = pickCF[KB[key][i]] + parseFloat(userCF[KB[key][i]]) * (1 - pickCF[KB[key][i]]);
                result = Math.max(-1, Math.min(1, result));

                Object.assign(cfResults, {
                  [`${key}`]: result
                });
              } else {
                result = pickCF[KB[key][i]] + parseFloat(userCF[KB[key][i]]) * (1 - pickCF[KB[key][i]]);
                result = Math.max(-1, Math.min(1, result));

                cf_total = 0;
                cf_total = cfResults[key] + result * (1 - cfResults[key]);
                Object.assign(cfResults, {
                  [`${key}`]: cf_total
                });
              }
            }
          }
        }

        setResultCF(cfResults);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    
  }, []);

  let cf_total = 0;

  for (let i = 0; i < listCF.length; i++) {
    if (cf_total === 0) {
      cf_total = listCF[i]; 
    } else {
      cf_total = cf_total + listCF[i] * (1 - cf_total);
    }
  }


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
    sungai: "sungaiResponses",
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
              {Object.entries(resultCF).map(([key, value], index) => (
                <h3 key={index}>
                  {key}: {(value * 100).toFixed(1)}%
                </h3>
              ))}            
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
