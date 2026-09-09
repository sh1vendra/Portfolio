import { motion } from 'framer-motion'
import { about } from '../data'
import SectionHeading from './SectionHeading'

const cards = [
  {
    icon: 'fas fa-book-open',
    title: 'Courseworks Taken & Grades Earned',
    items: about.coursework,
    scrollable: true,
  },
  { icon: 'fas fa-trophy', title: 'Achievements', items: about.achievements },
  { icon: 'fas fa-users', title: 'Involvement', items: about.involvement },
]

export default function About() {
  return (
    <section id="about" className="page-section">
      <div className="section-container">
        <SectionHeading number="01" title="About Me" note="A little context" />
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card about-card"
            >
              <div className="card-topline">
                <i className={card.icon} aria-hidden="true" />
                <span>0{i + 1}</span>
              </div>
              <h3>{card.title}</h3>
              <div
                className={`about-items ${card.scrollable ? 'coursework-scroll' : ''}`}
                tabIndex={card.scrollable ? 0 : undefined}
                role={card.scrollable ? 'region' : undefined}
                aria-label={card.scrollable ? 'Coursework and grades' : undefined}
              >
                {card.items.map((pill) => (
                  <span key={pill} className="detail-pill">
                    {pill}
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
