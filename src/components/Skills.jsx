
import SkillCubeShowcase from "./SkillCubeShowcase";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/Skills.css";

export default function Skills() {
  const { skills } = PortfolioContent;

  const [activeCategory, setActiveCategory] = useState(null);

  // Category names used by the technology cards
  const categoryLabels = Object.fromEntries(
    skills.categories.map((category) => [
      category.id,
      category.label,
    ])
  );

  // Get technologies for the selected category
  const visibleSkills = !activeCategory
    ? []
    : activeCategory === "all"
      ? Object.entries(skills.skills).flatMap(
          ([categoryId, items]) =>
            Array.isArray(items)
              ? items.map((item) => ({
                  ...item,
                  categoryLabel: categoryLabels[categoryId],
                }))
              : []
        )
      : (
          Array.isArray(skills.skills[activeCategory])
            ? skills.skills[activeCategory]
            : []
        ).map((item) => ({
          ...item,
          categoryLabel: categoryLabels[activeCategory],
        }));

  return (
    <section className="skills-page" id="skills">
      <div className="skills-page-container">

        {/* MAIN HEADING: VISIBLE ONLY IN OVERVIEW */}

        {activeCategory === null && (
          <motion.div
            className="skills-page-header"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="section-tag">
              {skills.tag}
            </span>

            <h2 className="section-title">
              {skills.title}{" "}
              <span className="highlight">
                {skills.titleHighlight}
              </span>
            </h2>

            <p className="section-subtitle">
              {skills.description}
            </p>
          </motion.div>
        )}

        {/* SINGLE CATEGORY NAVIGATION */}

        <div
          className={`skills-categories ${
            activeCategory !== null
              ? "skills-categories-selected"
              : ""
          }`}
        >
          <button
            type="button"
            aria-pressed={activeCategory === null}
            className={`category-btn ${
              activeCategory === null ? "active" : ""
            }`}
            onClick={() => setActiveCategory(null)}
          >
            Overview
          </button>

          {skills.categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={activeCategory === category.id}
              className={`category-btn ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* ONLY THE CONTENT BELOW THE NAVIGATION CHANGES */}

        <AnimatePresence mode="wait">

          {activeCategory === null ? (

            /* OVERVIEW: 3D TECHNOLOGY CUBES */

            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SkillCubeShowcase />

              <p className="skills-select-prompt">
                Select a category to explore its technologies.
              </p>
            </motion.div>

          ) : (

            /* SELECTED STACK: TECHNOLOGY CARDS ONLY */

            <motion.div
              key={activeCategory}
              className="skills-category-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >

              <div className="skills-grid-page">

                {visibleSkills.map((skill, index) => (
                  <motion.article
                    key={`${activeCategory}-${skill.name}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.035,
                    }}
                    whileHover={{ y: -5 }}
                    className="skill-card-page"
                  >

                    {/* CARD CATEGORY AND NUMBER */}

                    <div className="skill-card-top">
                      <span className="technology-category">
                        {skill.categoryLabel}
                      </span>

                      <span className="technology-card-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* TECHNOLOGY LOGO */}

                    <div className="technology-icon-wrap">

                      {skill.icon && (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="skill-card-icon"
                          width="38"
                          height="38"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";

                            const fallback =
                              event.currentTarget.parentElement
                                ?.querySelector(
                                  ".technology-icon-fallback"
                                );

                            if (fallback) {
                              fallback.style.display = "grid";
                            }
                          }}
                        />
                      )}

                      <span
                        className="technology-icon-fallback"
                        style={{
                          display: skill.icon ? "none" : "grid",
                        }}
                      >
                        {skill.mark || skill.name.slice(0, 2)}
                      </span>

                    </div>

                    {/* TECHNOLOGY NAME */}

                    <h3 className="skill-card-name">
                      {skill.name}
                    </h3>

                    {/* TECHNOLOGY DESCRIPTION */}

                    <p className="skill-card-description">
                      {skill.description}
                    </p>

                    <div className="technology-card-accent" />

                  </motion.article>
                ))}

              </div>
            </motion.div>

          )}

        </AnimatePresence>

        {/* FOOTER NOTE */}

        <div className="skills-footer-note">
          Continuously learning. Always building.
        </div>

      </div>
    </section>
  );
}
