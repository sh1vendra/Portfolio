import { useCallback, useEffect, useState } from 'react'
import type { Moment } from '../data/moments'
import { useMarqueeMotion } from '../hooks/useMarqueeMotion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import MomentCard from './MomentCard'

export default function MomentsMarquee({ moments }: { moments: Moment[] }) {
  const reducedMotion = usePrefersReducedMotion()
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const [paused, setPaused] = useState(false)
  const { viewportRef, trackRef, groupRef, controls } = useMarqueeMotion({
    reducedMotion, paused, expandedIndex, count: moments.length,
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
      <div className="moments-toolbar">
        <p className="moments-hint">Drag or swipe · Click to {expandedIndex >= 0 ? 'collapse' : 'expand'}</p>
        <div className="moments-controls">
          <button type="button" onClick={() => controls.current.step(-1)} aria-label="Previous moment">←</button>
          {!reducedMotion && (
            <button
              type="button"
              className="moments-pause"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
              aria-label={paused ? 'Resume automatic Moments scrolling' : 'Pause automatic Moments scrolling'}
              disabled={expandedIndex >= 0}
            >
              {expandedIndex >= 0 ? 'Paused' : paused ? 'Play' : 'Pause'}
            </button>
          )}
          <button type="button" onClick={() => controls.current.step(1)} aria-label="Next moment">→</button>
        </div>
      </div>
      <p id="moments-instructions" className="sr-only">
        Use left and right arrow keys to browse. Tab to a photo and press Enter or Space to expand it.
        Press Escape or activate the photo again to collapse it. Automatic motion pauses while a photo is expanded or has keyboard focus.
      </p>
      <div
        ref={viewportRef}
        className={`moments-viewport${reducedMotion ? ' is-reduced-motion' : ''}`}
        role="region"
        aria-label="Moments photos"
        aria-describedby="moments-instructions"
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
