import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Typed from 'typed.js'

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !typedRef.current) return
    const typed = new Typed(typedRef.current, {
      strings: ['Full-Stack Software Developer', 'Intel Ambassador', 'AI Agents & Systems'],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 3200,
      loop: true,
      smartBackspace: true,
    })
    return () => typed.destroy()
  }, [reducedMotion])

  return (
    <section id="hero" className="hero-section">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="section-container hero-container">
        <div className="hero-layout">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="hero-copy"
          >
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              Hello, I'm
            </p>
            <h1>
              Shivendra
              <br />
              <span>Bhagat</span>
              <span className="accent-dot">.</span>
            </h1>
            <div className="hero-role">
              <span className="role-prefix" aria-hidden="true">
                ↳
              </span>
              <span className="sr-only">
                Full-Stack Software Developer, Intel Ambassador, AI Agents &amp; Systems
              </span>
              {reducedMotion ? (
                <span aria-hidden="true">Full-Stack Software Developer</span>
              ) : (
                <span ref={typedRef} aria-hidden="true" />
              )}
            </div>
            <div className="hero-education">
              <p>Major: B.S. Computer Science, Minor: Applied Mathematics</p>
              <p>Honors College, Texas State University</p>
              <p className="hero-gpa">
                <span>
                  4.0 <small>CS Major GPA</small>
                </span>
                <span className="gpa-divider" />
                <span>
                  3.90 <small>Overall GPA</small>
                </span>
              </p>
            </div>
            <div className="hero-personal">
              <p>Building software that solves real problems.</p>
              <p>
                I write code. Coffee writes me. <span aria-label="coffee">☕</span>
              </p>
            </div>
          </motion.div>
          <motion.figure
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hero-portrait"
          >
            <div className="portrait-frame">
              <img
                src="/assets/portrait.jpg"
                alt="Shivendra Bhagat standing beside the water at dusk"
                width="960"
                height="1440"
                fetchPriority="high"
              />
              <span className="portrait-corner corner-top" aria-hidden="true" />
              <span className="portrait-corner corner-bottom" aria-hidden="true" />
            </div>
            <figcaption>
              <span>THE PERSON BEHIND THE CODE</span>
              <span aria-hidden="true">↗</span>
            </figcaption>
          </motion.figure>
        </div>
        <div className="hero-baseline">
          <span>SOFTWARE · AI · HUMAN CURIOSITY</span>
          <a href="#about">
            SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
