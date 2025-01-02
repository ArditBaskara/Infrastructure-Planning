import React, { useEffect, useState } from "react";
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
            if (savedData[i][j]) {
              savedCF.push(data[i][j + 1]);
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

        let cfResults = {};
        let result = 0;

        for (let key in KB) {
          for (let i in KB[key]) {
            if (pickCF.hasOwnProperty(KB[key][i])) {
              if (cfResults[key] === undefined) {
                result = pickCF[KB[key][i]] + parseFloat(userCF[KB[key][i]]) * (1 - pickCF[KB[key][i]]);
                result = Math.max(-1, Math.min(1, result));

                Object.assign(cfResults, {
                  [key]: result
                });
              } else {
                result = pickCF[KB[key][i]] + parseFloat(userCF[KB[key][i]]) * (1 - pickCF[KB[key][i]]);
                result = Math.max(-1, Math.min(1, result));

                cfResults[key] = cfResults[key] + result * (1 - cfResults[key]);
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

  const location = useLocation();
  const { 
    isRainySeason, 
    locationName
  } = location.state || {};

  const recommendationsPerDisaster = {
    Banjir: {
      color: "bg-blue-200",
      image: "path/to/flood.jpg",
      recommendations: ["Pastikan adanya sistem drainase yang baik dan terawat.", "Membangun tanggul dan penampungan air untuk mengurangi risiko banjir.", "Lakukan reboisasi di daerah hulu sungai untuk menjaga keseimbangan ekosistem.","Evakuasi ke daerah yang lebih tinggi saat banjir terjadi.",
    "Simpan makanan dan air bersih dalam kemasan kedap udara.",
    "Hindari mengkonsumsi makanan dan air yang terkontaminasi setelah banjir.",
    "Laporkan kerusakan dan kebutuhan bantuan kepada otoritas setempat."]
    },
    Gelombang_Tinggi: {
      color: "bg-teal-200",
      image: "path/to/high-waves.jpg",
      recommendations: ["Pasang peringatan dini untuk masyarakat pesisir terkait potensi gelombang tinggi.",
    "Membangun infrastruktur yang tahan gelombang tinggi, seperti penahan gelombang.",
    "Evakuasi ke tempat yang lebih aman saat gelombang tinggi terjadi.",
    "Hindari berada di dekat pantai atau tepi laut saat peringatan diberikan.",
    "Ikuti instruksi dari otoritas lokal terkait keamanan dan evakuasi.",
    "Lakukan penilaian kerusakan dan bantu masyarakat yang terdampak setelah gelombang surut.",
    "Siapkan peralatan darurat dan perlengkapan evakuasi untuk setiap keluarga."]
    },
    Tsunami: {
      color: "bg-indigo-200",
      image: "path/to/tsunami.jpg",
      recommendations: ["1. Membangun sistem peringatan dini tsunami di daerah rawan.",
  "Identifikasi dan buat rencana evakuasi untuk komunitas pesisir.",
  "Segera evakuasi ke daerah tinggi saat ada peringatan tsunami.",
  "Jangan kembali ke pantai sampai diberitahu aman oleh pihak berwenang.",
  "Lindungi diri dari debu dan kontaminasi setelah tsunami.",
  "Laporkan kerusakan infrastruktur dan kebutuhan bantuan kepada pihak berwenang.",
  "Berikan dukungan kepada komunitas yang terdampak untuk proses pemulihan."]
    },
    Longsor: {
      color: "bg-green-200",
      image: "path/to/landslide.jpg",
      recommendations: ["1. Membangun tembok penahan dan drainase untuk mencegah longsor.",
    "Melakukan survei geologi untuk mengidentifikasi daerah rawan longsor.",
    "Evakuasi segera jika ada tanda-tanda longsor (retakan tanah, suara gemuruh).",
    "Hindari area di bawah lereng yang curam saat hujan deras.",
    "Laporkan kerusakan ke otoritas setempat setelah longsor terjadi.",
    "Berikan informasi kepada masyarakat tentang cara mengenali tanda-tanda longsor.",
    "Siapkan rencana evakuasi yang jelas untuk daerah yang berisiko longsor."]
    },
    Gempa_Bumi: {
      color: "bg-yellow-200",
      image: "path/to/earthquake.jpg",
      recommendations: ["1. Mengembangkan bangunan tahan gempa sesuai dengan standar yang ditetapkan.",
    "Melakukan latihan evakuasi secara berkala untuk masyarakat.",
    "Berlindung di bawah meja atau struktur yang kuat saat gempa terjadi.",
    "Jangan menggunakan lift dan menjauh dari jendela saat gempa.",
    "Periksa diri dan orang di sekitar untuk cedera setelah gempa.",
    "Laporkan kerusakan dan kebutuhan bantuan kepada pihak berwenang.",
    "Siapkan kit darurat yang mencakup makanan, air, dan perlengkapan pertolongan pertama."]
    },
    Gunung_Api: {
      color: "bg-red-200",
      image: "path/to/volcano.jpg",
      recommendations: ["1. Memantau aktivitas gunung berapi melalui lembaga geologi secara berkala.",
    "Mengembangkan rencana evakuasi untuk masyarakat sekitar gunung berapi.",
    "Ikuti instruksi evakuasi dan pergi ke tempat yang aman saat letusan terjadi.",
    "Lindungi pernapasan dari abu vulkanik dengan masker atau kain.",
    "Hindari mengonsumsi makanan yang terkontaminasi debu vulkanik setelah letusan.",
    "Laporkan kerusakan dan kebutuhan bantuan kepada pihak berwenang.",
    "Berikan dukungan kepada masyarakat yang terkena dampak dalam proses pemulihan."]
    }
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

        <div className="w-full max-w-lg bg-blue-900 p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-xl font-bold mb-4 text-white text-center">Disaster Risk Assessment Results</h2>

          <h3 className="text-lg font-bold text-white">Location: {locationName || "Unknown"}</h3>
          <p className="text-white">Current Season: <span className="font-bold">{isRainySeason ? "Rainy" : "Dry"}</span></p>
        </div>

        <div className="w-full max-w-5xl mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(resultCF).map(([disaster, riskValue]) => (
            <div
              key={disaster}
              className="relative group card shadow-xl bg-gray-600 overflow-hidden rounded-lg transform transition-transform hover:scale-105"
            >
              <figure>
                <img
                  src={recommendationsPerDisaster[disaster]?.image || "path/to/default.jpg"}
                  alt={disaster}
                  className="w-full h-40 object-cover"
                />
              </figure>
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4 transition-all transform translate-y-full group-hover:translate-y-0">
                <h2 className="text-lg font-bold text-gray-700">
                  {disaster} ({(riskValue * 100).toFixed(1)}%)
                </h2>
                <ul className="mt-2 text-sm text-gray-600">
                  {recommendationsPerDisaster[disaster]?.recommendations.map((rec, idx) => (
                    <li key={idx}>- {rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Hasil;
