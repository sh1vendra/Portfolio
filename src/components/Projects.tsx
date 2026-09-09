import { motion } from 'framer-motion'
import { projects } from '../data'
import SectionHeading from './SectionHeading'

export default function Projects() {
  return (
    <section id="projects" className="page-section projects-section">
      <div className="section-container">
        <SectionHeading number="03" title="Projects" note="Ideas, made real" />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
              className="card project-card group"
            >
              <div className="project-chrome">
                <span className="project-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>PROJECT / {String(i + 1).padStart(2, '0')}</span>
                <span aria-hidden="true">↗</span>
              </div>
              <div className="project-image">
                <img src={project.screenshot} alt={project.alt} loading="lazy" />
              </div>
              <div className="project-content">
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
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
                  <span className="link-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
