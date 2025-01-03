import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import bgImage from "/src/assets/bgg.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; 

// Full-screen background container
const HeroContainer = styled.div`
  width: 100vw; /* Full width of the viewport */
  height: 100vh; /* Full height of the viewport */
  background-image: url(${bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  position: relative;
`;

// Overlay with a semi-transparent black background
const HeroOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Content in the center of the Hero section
const HeroContent = styled.div`
  text-align: center;
  color: white;
  padding: 10px;
`;

// Title of the Hero section
const HeroTitle = styled.h1`
  font-size: 4rem; /* Large for a striking title */
  font-weight: bold;
  margin-bottom: 1rem;
`;

// Subtitle under the title
const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Include Navbar */}
      <HeroContainer>
        <HeroOverlay>
          <HeroContent>
            <HeroTitle>
              <TypeAnimation
                sequence={[
                  "Sistem Pakar Diagnosa Kemungkinan Bencana Alam sebagai Sarana Upaya Perencanaan Infrastruktur",
                  2000,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </HeroTitle>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <HeroSubtitle>
               Sistem ini dirancang sebagai alat bantu dalam perencanaan dan pengelolaan
               proyek infrastruktur tahan bencana, berdasarkan informasi Geomorfologi dan Geologi.
              </HeroSubtitle>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => navigate("/prediction")}
                  className="btn btn-ghost text-cyan-50 text-xl hover:bg-green-600 border-2 border-cyan-200 rounded-md transition duration-300"
                >
                  Mulai Prediksi
                </button>
              </div>
            </motion.div>
          </HeroContent>
        </HeroOverlay>
      </HeroContainer>
    </>
  );
};

export default Hero;
