import { motion } from 'framer-motion'
import { hobbies } from '../data'
import SectionHeading from './SectionHeading'

export default function Hobbies() {
  return (
    <section id="hobbies" className="page-section">
      <div className="section-container">
        <SectionHeading number="05" title="Hobbies" note="Away from the keyboard" />
        <div className="hobby-list">
          {hobbies.map((hobby, i) => (
            <motion.span
              key={hobby.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="hobby-chip"
            >
              <span aria-hidden="true">{hobby.emoji}</span>
              {hobby.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
