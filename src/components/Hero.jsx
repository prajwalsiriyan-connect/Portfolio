
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/Hero.css";
import { CloudCog, ArrowUpRight } from "lucide-react";
import cvPDF from "../assets/CV/Prajwal Resume04.pdf";

// Welcome Animation
function WelcomeAnimation() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let timer;

    const startAnimation = () => {
      setAnimate(false);
      clearTimeout(timer);

      timer = setTimeout(() => {
        setAnimate(true);
      }, 100);
    };

    startAnimation();

    window.addEventListener(
      "restart-welcome-animation",
      startAnimation
    );

    return () => {
      clearTimeout(timer);
      window.removeEventListener(
        "restart-welcome-animation",
        startAnimation
      );
    };
  }, []);

  const letters = ["W", "e", "l", "c", "o", "m", "e"];

  return (
    <div className="welcome-animation">
      <svg
        className="welcome-svg"
        viewBox="0 0 900 260"
        role="img"
        aria-label="Welcome"
      >
        <defs>
          <linearGradient
            id="welcomeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>

        <text
          x="50%"
          y="185"
          textAnchor="middle"
          className="welcome-script"
          fill="url(#welcomeGradient)"
        >
          {letters.map((letter, index) => (
            <tspan
              key={index}
              className={
                animate
                  ? "welcome-letter writing"
                  : "welcome-letter"
              }
              style={{
                animationDelay: `${index * 0.3}s`,
              }}
            >
              {letter}
            </tspan>
          ))}
        </text>
      </svg>

      <div className="welcome-glow" />
    </div>
  );
}

// Main Hero Component
export default function Hero() {
  const { hero } = PortfolioContent;
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = () => {
    setIsDownloading(true);

    setTimeout(() => {
      const link = document.createElement("a");
      link.href = cvPDF;
      link.download = "Prajwal_Siriyan_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 800);
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");

    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-badge"
            >
              <span className="badge-dot" />
              <span className="badge-text">{hero.badge}</span>
              <span className="badge-glow" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-title"
            >
              {hero.greeting}{" "}
              <span className="highlight">{hero.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-subtitle"
            >
              <span
                className="hero-role"
                style={{
                  display: "block",
                  width: "fit-content",
                  background:
                    "linear-gradient(120deg, #A78BFA 0%, #6366F1 50%, #3B82F6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  marginBottom: "12px",
                }}
              >
                {hero.title}
              </span>

              <span style={{ display: "block" }}>
                {hero.description}
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hero-actions"
            >
              <button
                className="btn-primary"
                onClick={handleDownloadCV}
                disabled={isDownloading}
              >
                <span className="btn-content">
                  {isDownloading ? (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="spinner"
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l-2.83-2.83M16.24 7.76l-2.83-2.83" />
                      </svg>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {hero.buttons.primary}
                    </>
                  )}
                </span>

                <span className="btn-glow-effect" />
              </button>

              <button
                className="btn-secondary"
                onClick={scrollToProjects}
              >
                {hero.buttons.secondary}

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </motion.div>
          </div>

          <Link
            to="/projects/inframanage"
            className="infra-card-link"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-stats inframanage-card"
            >
              <div className="infra-card-content">
                <div className="infra-card-heading">
                  <span className="infra-icon">
                    <CloudCog size={28} />
                  </span>

                  <div>
                    <span className="infra-status">
                      <span className="status-dot" />
                      Currently Building
                    </span>

                    <h3>InfraManage</h3>
                    <p>Cloud Infrastructure Management</p>
                  </div>
                </div>

                <p className="infra-description">
                  Building a Python-powered platform for AWS EC2 monitoring,
                  instance management and operational visibility.
                </p>

                <div className="infra-tech-stack">
                  <span>Python</span>
                  <span>AWS EC2</span>
                  <span>Monitoring</span>
                </div>
              </div>

              <div className="infra-card-arrow">
                <ArrowUpRight size={24} />
              </div>
            </motion.div>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hero-right"
        >
          <div className="avatar-container">
            <WelcomeAnimation />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
