import { memo, useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Moment } from '../data/moments'

interface MomentCardProps {
  moment: Moment
  index: number
  expanded: boolean
  duplicate: boolean
  onToggle: (index: number) => void
}

function MomentCard({ moment, index, expanded, duplicate, onToggle }: MomentCardProps) {
  const ref = useRef<HTMLElement>(null)
  const [nearby, setNearby] = useState(false)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearby(true)
        observer.disconnect()
      }
    }, { root: element.closest('.moments-viewport'), rootMargin: '600px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <figure
      ref={ref}
      className={`moment-card${expanded ? ' is-expanded' : ''}`}
      style={{ '--moment-ratio': moment.width / moment.height } as CSSProperties}
    >
      <button
        type="button"
        className="moment-image-button"
        data-moment-index={index}
        tabIndex={duplicate ? -1 : 0}
        aria-label={`${expanded ? 'Collapse' : 'Expand'} ${moment.caption}`}
        aria-expanded={expanded}
        onClick={() => onToggle(index)}
        // Decorative loop copies remain pointer-operable without stealing keyboard focus.
        onMouseDown={duplicate ? (event) => event.preventDefault() : undefined}
      >
        {nearby && !failed && (
          <img
            src={moment.src}
            srcSet={moment.srcSet}
            sizes={`(max-width: 767px) min(${Math.ceil(moment.width / moment.height * (expanded ? 50 : 30))}svh, calc(100vw - ${expanded ? 48 : 80}px)), ${Math.ceil(moment.width / moment.height * (expanded ? 50 : 33))}vh`}
            width={moment.width}
            height={moment.height}
            alt={moment.caption}
            loading="eager"
            decoding="async"
            draggable={false}
            onError={() => setFailed(true)}
          />
        )}
        {failed && <span className="moment-image-fallback">Image unavailable</span>}
        <span className="moment-expand-mark" aria-hidden="true">{expanded ? '−' : '+'}</span>
      </button>
      <figcaption>{moment.caption}</figcaption>
    </figure>
  )
}

export default memo(MomentCard)
