import { motion } from 'framer-motion'
import { experience } from '../data'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="page-section">
      <div className="section-container">
        <SectionHeading title="Experience" note="Learning by building" />
        <div className="experience-timeline">
          {experience.map((job, i) => (
            <motion.div
              key={`${job.company}-${i}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="timeline-entry"
            >
              <span className="timeline-dot" aria-hidden="true" />
              <div className="card experience-card">
                <div className="experience-header">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="company-name">{job.company}</p>
                  </div>
                  <span className="period">{job.period}</span>
                </div>
                <ul className="experience-bullets">
                  {job.bullets.map((bullet, j) => (
                    <li key={j}>
                      <span aria-hidden="true">↳</span>
                      <p>{bullet}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
