import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { recommendations, type Recommendation } from '../data/recommendations'
import SectionHeading from './SectionHeading'

export default function Recommendations() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null)
  const modalRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!selectedRecommendation) return

    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusCloseButton = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setSelectedRecommendation(null)
        return
      }

      if (event.key !== 'Tab' || !modalRef.current) return
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])'),
      ).filter((element) => !element.hasAttribute('disabled'))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(focusCloseButton)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [selectedRecommendation])

  return (
    <>
      <section id="recommendations" className="page-section recommendations-section">
        <div className="section-container">
          <SectionHeading title="Recommendations" note="What people I've worked with say" />
          <div className="recommendations-grid">
            {recommendations.map((recommendation, index) => (
              <motion.article
                key={recommendation.id}
                className="card recommendation-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
              >
                <button
                  type="button"
                  className="card-open-button"
                  onClick={() => setSelectedRecommendation(recommendation)}
                  aria-haspopup="dialog"
                  aria-label={`Read recommendation from ${recommendation.name}`}
                />
                <div className="recommendation-person">
                  <span className="recommendation-initials" aria-hidden="true">
                    {recommendation.initials}
                  </span>
                  <div>
                    <h3>{recommendation.name}</h3>
                    <p>{recommendation.role}</p>
                  </div>
                </div>
                <div className="recommendation-traits">
                  {recommendation.traits.map((trait) => (
                    <span key={trait} className="recommendation-trait">{trait}</span>
                  ))}
                </div>
                <p className="recommendation-preview">&quot;{recommendation.text}&quot;</p>
                <button
                  type="button"
                  className="project-see-more recommendation-see-more"
                  onClick={() => setSelectedRecommendation(recommendation)}
                  aria-haspopup="dialog"
                  aria-label={`See more from ${recommendation.name}`}
                >
                  See More
                </button>
              </motion.article>
            ))}
          </div>
          <a
            className="recommendations-verify"
            href="https://www.linkedin.com/in/shivendrabhagat/details/recommendations/?detailScreenTabIndex=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Verify on LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedRecommendation && (
              <motion.div
                className="project-modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(event) => {
                  if (event.target === event.currentTarget) setSelectedRecommendation(null)
                }}
              >
                <motion.article
                  ref={modalRef}
                  className="recommendation-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="recommendation-modal-title"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    ref={closeButtonRef}
                    type="button"
                    className="project-modal-close"
                    onClick={() => setSelectedRecommendation(null)}
                    aria-label="Close recommendation"
                  >
                    <i className="fas fa-times" aria-hidden="true" />
                  </button>
                  <h3 id="recommendation-modal-title">{selectedRecommendation.name}</h3>
                  <p className="recommendation-modal-role">{selectedRecommendation.role}</p>
                  <div className="recommendation-traits">
                    {selectedRecommendation.traits.map((trait) => (
                      <span key={trait} className="recommendation-trait">{trait}</span>
                    ))}
                  </div>
                  <p className="recommendation-full-text">&quot;{selectedRecommendation.text}&quot;</p>
                </motion.article>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
