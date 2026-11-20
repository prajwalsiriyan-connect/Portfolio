
import { motion } from "framer-motion";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/SkillCubeShowcase.css";

const groupOrder = [
  "cloud",
  "backend",
  "frontend",
  "database",
  "tools",
];

const skillGroups = PortfolioContent.skills.skills;

const cubeSkills = groupOrder.flatMap((group) =>
  Array.isArray(skillGroups[group])
    ? skillGroups[group].map((skill) => ({
        ...skill,
        key: `${group}-${skill.name}`,
      }))
    : []
);

export default function SkillCubeShowcase() {
  return (
    <div className="skill-cube-showcase">
      <div className="skill-cube-grid">
        {cubeSkills.map((skill, index) => (
          <motion.div
            key={skill.key}
            className="skill-cube-tile"
            title={skill.name}
            aria-label={skill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: [0, -3, 0],
            }}
            whileHover={{
              scale: 1.08,
              y: -5,
            }}
            transition={{
              opacity: { duration: 0.4 },
              y: {
                duration: 3 + (index % 4) * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index % 6) * 0.12,
              },
              scale: { duration: 0.18 },
            }}
          >
            <div className="skill-cube-scene">
              <div className="skill-cube">

                <div className="skill-cube-face skill-cube-front">
                  {skill.icon && (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      draggable="false"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";

                        const fallback =
                          event.currentTarget.parentElement
                            ?.querySelector(".skill-cube-fallback");

                        if (fallback) {
                          fallback.style.display = "grid";
                        }
                      }}
                    />
                  )}

                  <span
                    className="skill-cube-fallback"
                    style={{
                      display: skill.icon ? "none" : "grid",
                    }}
                  >
                    {skill.mark || skill.name.slice(0, 2)}
                  </span>
                </div>

                <div className="skill-cube-face skill-cube-back" />
                <div className="skill-cube-face skill-cube-right" />
                <div className="skill-cube-face skill-cube-left" />
                <div className="skill-cube-face skill-cube-top" />
                <div className="skill-cube-face skill-cube-bottom" />

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
