import { motion } from 'framer-motion'

const links = [
  {
    label: 'LinkedIn',
    icon: 'fab fa-linkedin-in',
    href: 'https://www.linkedin.com/in/shivendrabhagat/',
  },
  { label: 'GitHub', icon: 'fab fa-github', href: 'https://github.com/sh1vendra' },
  { label: 'Email', icon: 'fas fa-envelope', href: 'mailto:shivendra@txstate.edu' },
  { label: 'X', icon: 'fab fa-x-twitter', href: 'https://x.com/Shiv_endra_007' },
]

export default function Contact() {
  return (
    <section id="contact" className="page-section contact-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="eyebrow">
            <span className="section-number">06</span>Start a conversation
          </p>
          <div className="contact-heading">
            <h2>
              Get in Touch<span className="accent-dot">.</span>
            </h2>
            <a
              href="mailto:shivendra@txstate.edu"
              className="contact-cta"
              aria-label="Email Shivendra"
            >
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="contact-intro">
            Open to collaborations, internships, and full-time opportunities.
          </p>
          <a className="contact-email" href="mailto:shivendra@txstate.edu">
            shivendra@txstate.edu
          </a>
        </motion.div>
        <div className="contact-links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
            >
              <span>
                <i className={link.icon} aria-hidden="true" />
                {link.label}
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
