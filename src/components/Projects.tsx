import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data'
import SectionHeading from './SectionHeading'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null)
  const modalRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!selectedProject) return

    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusCloseButton = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setSelectedProject(null)
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
  }, [selectedProject])

  return (
    <>
      <section id="projects" className="page-section projects-section">
        <div className="section-container">
          <SectionHeading title="Projects" note="Ideas, made real" />
          <div className="projects-grid">
            {projects.map((project, i) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
                className="card project-card group"
              >
                <button
                  type="button"
                  className="card-open-button"
                  onClick={() => setSelectedProject(project)}
                  aria-haspopup="dialog"
                  aria-label={`View details for ${project.name}`}
                />
                <div className="project-chrome">
                  <span className="project-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <div className="project-image">
                  <img src={project.screenshot} alt={project.alt} loading="lazy" />
                </div>
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <button
                    type="button"
                    className="project-see-more"
                    onClick={() => setSelectedProject(project)}
                    aria-haspopup="dialog"
                    aria-label={`See more about ${project.name}`}
                  >
                    See More
                  </button>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label={`View ${project.name} on GitHub`}
                    >
                      <span>
                        <i className="fab fa-github" aria-hidden="true" /> View on GitHub
                      </span>
                    </a>
                    {project.youtube && (
                      <a
                        href={project.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label={`Watch ${project.name} on YouTube`}
                      >
                        <span>
                          <i className="fab fa-youtube" aria-hidden="true" /> View on YouTube
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <a
            href="https://github.com/sh1vendra"
            target="_blank"
            rel="noopener noreferrer"
            className="projects-more-link"
          >
            More projects on GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="project-modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(event) => {
                  if (event.target === event.currentTarget) setSelectedProject(null)
                }}
              >
                <motion.article
                  ref={modalRef}
                  className="project-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="project-modal-title"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    ref={closeButtonRef}
                    type="button"
                    className="project-modal-close"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close project details"
                  >
                    <i className="fas fa-times" aria-hidden="true" />
                  </button>
                  <div className="project-modal-image">
                    <img src={selectedProject.screenshot} alt={selectedProject.alt} />
                  </div>
                  <div className="project-modal-content">
                    <p className="eyebrow">Project details</p>
                    <h3 id="project-modal-title">{selectedProject.name}</h3>
                    <p className="project-modal-description">{selectedProject.description}</p>
                    <div className="project-modal-tags">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="tech-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-modal-actions">
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-modal-link"
                      >
                        <i className="fab fa-github" aria-hidden="true" /> View on GitHub
                      </a>
                      {selectedProject.youtube && (
                        <a
                          href={selectedProject.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-modal-link"
                        >
                          <i className="fab fa-youtube" aria-hidden="true" /> View on YouTube
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
