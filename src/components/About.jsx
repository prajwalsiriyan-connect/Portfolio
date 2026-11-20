import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/About.css";

export default function About() {
  const { about } = PortfolioContent;

  return (
    <section className="about" id="about">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="about-header"
        >
          <span className="section-tag">{about.tag}</span>
          <h2 className="section-title">
            {about.title} <span className="highlight">{about.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="about-content"
          >
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="about-text">
                {paragraph}
              </p>
            ))}
            
          </motion.div>

          
<motion.div
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  viewport={{ once: true }}
  className="education-container"
>
  <div className="education-heading">
    <span>ACADEMIC BACKGROUND</span>
    <h3>Education</h3>
  </div>

  <div className="education-list">

    {/* MCA */}
    <div className="education-card">
      <div className="education-card-top">
        <span className="education-level">
  <GraduationCap size={16} />
  POSTGRADUATE
</span>
        <span className="education-degree">MCA</span>
      </div>

      <h4>Master of Computer Applications</h4>

      <p className="education-institution">
        Nitte Meenakshi Institute of Technology
      </p>

      <span className="education-location">
        Bengaluru, Karnataka
      </span>
    </div>

    {/* BCA */}
    <div className="education-card">
      <div className="education-card-top">
        <span className="education-level">
  <GraduationCap size={16} />
  UNDERGRADUATE
</span>
        <span className="education-degree">BCA</span>
      </div>

      <h4>Bachelor of Computer Applications</h4>

      <p className="education-institution">
        Srinivas Institute of Technology
      </p>

      <span className="education-location">
        Mangaluru, Karnataka
      </span>
    </div>

  </div>
</motion.div>

           
        </div>
      </div>
    </section>
  );
}