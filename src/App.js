
import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Certifications from "./components/Certifications";
import InfraManage from "./pages/InfraManage";

import "./App.css";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [isHovering, setIsHovering] = useState(false);
  const appRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="app" ref={appRef}>
      <div className="app-background" />
      <div className="grid-pattern-global" />

      <div
      
        className="dark-overlay"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px,
            transparent 0%,
            rgba(6, 6, 14, 0.85) 35%,
            rgba(6, 6, 14, 0.95) 60%,
            #06060e 100%)`,
          opacity: 1,
          transition: "background 0.15s ease-out",
  }}
/>

<div
  className="global-spotlight"
  style={{
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px,
      rgba(38, 59, 117, 0.25) 0%,
      rgba(38, 59, 117, 0.12) 15%,
      rgba(38, 59, 117, 0.04) 30%,
      transparent 55%)`,
    opacity: isHovering ? 1 : 0,
    transition: "opacity 0.4s ease",
  }}
/>

<div
  className="global-spotlight-secondary"
  style={{
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px,
      rgba(38, 59, 117, 0.12) 0%,
      rgba(38, 59, 117, 0.04) 25%,
      transparent 50%)`,
    opacity: isHovering ? 1 : 0,
    transition: "opacity 0.4s ease",
  }}
/>

      <div className="orb-global orb-global-1" />
      <div className="orb-global orb-global-2" />
      <div className="orb-global orb-global-3" />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/projects/inframanage"
          element={<InfraManage />}
        />
      </Routes>
    </div>
  );
}

export default App;
