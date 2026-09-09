import { motion } from 'framer-motion'

interface SectionHeadingProps {
  number: string
  title: string
  note: string
}

export default function SectionHeading({ number, title, note }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="section-heading"
    >
      <div>
        <p className="eyebrow">
          <span className="section-number">{number}</span>
          {note}
        </p>
        <h2>
          {title}
          <span className="accent-dot">.</span>
        </h2>
      </div>
      <span className="section-mark" aria-hidden="true">
        ↙
      </span>
    </motion.div>
  )
}
