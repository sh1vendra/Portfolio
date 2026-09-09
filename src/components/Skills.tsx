import { motion } from 'framer-motion'
import { skills } from '../data'
import SectionHeading from './SectionHeading'

export default function Skills() {
  return (
    <section id="skills" className="page-section">
      <div className="section-container">
        <SectionHeading title="Skills" note="The tools behind the work" />
        <div className="skills-list">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="card skill-row"
            >
              <span className="skill-category">{group.category}</span>
              <div className="skill-items">
                {group.items.map((skill) => (
                  <span key={skill.label} className="skill-chip">
                    <i className={skill.icon} aria-hidden="true" />
                    {skill.label}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
