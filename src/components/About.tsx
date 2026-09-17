import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
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

function CourseworkList({ items }: { items: string[] }) {
  const listRef = useRef<HTMLDivElement>(null)
  const [canScrollFurther, setCanScrollFurther] = useState(false)

  const updateScrollState = () => {
    const list = listRef.current
    if (!list) return
    setCanScrollFurther(list.scrollTop + list.clientHeight < list.scrollHeight - 2)
  }

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [])

  const scrollFurther = () => {
    const list = listRef.current
    if (!list) return
    list.scrollBy({
      top: Math.max(120, list.clientHeight * 0.72),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  return (
    <div className="coursework-scroll-wrap">
      <div
        ref={listRef}
        id="coursework-list"
        className="about-items coursework-scroll"
        tabIndex={0}
        role="region"
        aria-label="Coursework and grades"
        onScroll={updateScrollState}
      >
        {items.map((pill) => (
          <span key={pill} className="detail-pill">
            {pill}
          </span>
        ))}
      </div>
      {canScrollFurther && (
        <button
          type="button"
          className="coursework-scroll-button"
          onClick={scrollFurther}
          aria-controls="coursework-list"
        >
          <span>Scroll to see all courses</span>
          <i className="fas fa-arrow-down" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="page-section">
      <div className="section-container">
        <SectionHeading title="About Me" note="A little context" />
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
              </div>
              <h3>{card.title}</h3>
              {card.scrollable ? (
                <CourseworkList items={card.items} />
              ) : (
                <div className="about-items">
                  {card.items.map((pill) => (
                    <span key={pill} className="detail-pill">
                      {pill}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
