import { useCallback, useEffect, useState } from 'react'
import type { Moment } from '../data/moments'
import { useMarqueeMotion } from '../hooks/useMarqueeMotion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import MomentCard from './MomentCard'

export default function MomentsMarquee({ moments }: { moments: Moment[] }) {
  const reducedMotion = usePrefersReducedMotion()
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const { viewportRef, trackRef, groupRef, controls } = useMarqueeMotion({
    reducedMotion, paused: false, expandedIndex, count: moments.length,
  })
  const toggle = useCallback((index: number) => {
    if (!controls.current.suppressClick()) setExpandedIndex((current) => current === index ? -1 : index)
  }, [controls])

  useEffect(() => {
    if (expandedIndex < 0) return
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedIndex(-1)
    }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [expandedIndex])

  // Three copies allow motion in either direction. Only the middle is exposed
  // to assistive technology; reduced-motion mode uses a single native scroller.
  const copies = reducedMotion ? [1] : [0, 1, 2]
  return (
    <div className="moments-marquee">
      <div
        ref={viewportRef}
        className={`moments-viewport${reducedMotion ? ' is-reduced-motion' : ''}`}
        role="region"
        aria-label="Moments photos"
        tabIndex={0}
        onClickCapture={(event) => {
          if (controls.current.suppressClick()) { event.preventDefault(); event.stopPropagation() }
        }}
      >
        <div ref={trackRef} className="moments-track">
          {copies.map((copy) => (
            <div
              key={copy}
              ref={copy === 1 ? groupRef : undefined}
              className="moments-group"
              aria-hidden={copy !== 1 ? true : undefined}
            >
              {moments.map((moment, index) => (
                <MomentCard key={moment.id} moment={moment} index={index}
                  expanded={expandedIndex === index} duplicate={copy !== 1} onToggle={toggle} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
