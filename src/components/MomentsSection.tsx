import { moments } from '../data/moments'
import MomentsMarquee from './MomentsMarquee'
import SectionHeading from './SectionHeading'

export default function MomentsSection() {
  if (!moments.length) return null
  return (
    <section id="moments" className="page-section moments-section" aria-label="Moments">
      <div className="section-container">
        <SectionHeading title="Moments" />
        <MomentsMarquee moments={moments} />
      </div>
    </section>
  )
}
