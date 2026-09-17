import { useEffect, useLayoutEffect, useRef } from 'react'

interface MotionOptions {
  reducedMotion: boolean
  paused: boolean
  expandedIndex: number
  count: number
}

const BASE_SPEED = 48 // pixels per second, toward the left
const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value))
const wrap = (value: number, width: number) => ((value % width) + width) % width

export function useMarqueeMotion(options: MotionOptions) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const latest = useRef(options)
  latest.current = options
  const controls = useRef<{
    center: (index: number, followLayout?: boolean) => void
    step: (direction: number) => void
    suppressClick: () => boolean
  }>({
    center: (_index: number, _followLayout = false) => {},
    step: (_direction: number) => {},
    suppressClick: () => false,
  })

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    const group = groupRef.current
    if (!viewport || !track || !group || !options.count) return

    const reduced = options.reducedMotion
    if (!reduced) viewport.scrollLeft = 0
    let groupWidth = group.getBoundingClientRect().width
    let viewportWidth = viewport.clientWidth
    let position = 0
    let velocity = 0
    let frame = 0
    let lastTime = 0
    let visible = false
    let anchor: { index: number; until: number } | null = null
    let suppressUntil = 0
    let focused = false
    let pointer: {
      id: number; startX: number; startY: number; lastX: number; lastTime: number; dragging: boolean
    } | null = null

    const paint = () => {
      if (!reduced) track.style.transform = `translate3d(${-groupWidth - position}px, 0, 0)`
    }
    const itemCenter = (index: number) => {
      const card = group.children[index] as HTMLElement | undefined
      return card ? card.offsetLeft + card.offsetWidth / 2 - viewportWidth / 2 : 0
    }
    const center = (index: number, followLayout = false) => {
      if (index < 0 || index >= latest.current.count) return
      velocity = 0
      if (reduced) {
        viewport.scrollTo({ left: itemCenter(index), behavior: 'auto' })
      } else {
        // Map a visible clone to the corresponding original without a visible jump.
        const target = itemCenter(index)
        if (groupWidth) position = target + wrap(position - target + groupWidth / 2, groupWidth) - groupWidth / 2
        anchor = { index, until: performance.now() + (followLayout ? 500 : 350) }
      }
    }
    controls.current = {
      center,
      step: (direction) => {
        const current = reduced ? viewport.scrollLeft : position
        const candidates = Array.from(group.children, (_, index) => ({ index, center: itemCenter(index) }))
        const nearest = candidates.reduce((best, item) =>
          Math.abs(item.center - current) < Math.abs(best.center - current) ? item : best)
        center((nearest.index + direction + latest.current.count) % latest.current.count)
      },
      suppressClick: () => performance.now() < suppressUntil,
    }

    const tick = (time: number) => {
      const dt = Math.min((time - (lastTime || time)) / 1000, 0.05)
      lastTime = time
      if (anchor) {
        const target = itemCenter(anchor.index)
        position += (target - position) * (1 - Math.exp(-16 * dt))
        if (time >= anchor.until) {
          position = target
          anchor = null
        }
      } else if (!pointer?.dragging) {
        const stopped = latest.current.paused || latest.current.expandedIndex >= 0 || focused
        const target = stopped ? 0 : BASE_SPEED
        velocity += (target - velocity) * (1 - Math.exp(-3.5 * dt))
        position += velocity * dt
        if (groupWidth && ((!focused && latest.current.expandedIndex < 0)
          || position < -viewportWidth || position > groupWidth + viewportWidth)) {
          position = wrap(position, groupWidth)
        }
      }
      paint()
      frame = requestAnimationFrame(tick)
    }
    const updateRunning = () => {
      cancelAnimationFrame(frame)
      lastTime = 0
      if (visible && !document.hidden && !reduced) frame = requestAnimationFrame(tick)
    }
    const resize = new ResizeObserver(() => {
      groupWidth = group.getBoundingClientRect().width
      viewportWidth = viewport.clientWidth
      if (reduced && latest.current.expandedIndex >= 0) center(latest.current.expandedIndex)
      paint()
    })
    resize.observe(group)
    resize.observe(viewport)
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      updateRunning()
    })
    intersection.observe(viewport)

    const wheel = (event: WheelEvent) => {
      // Never consume vertical/diagonal page scrolling or pinch-to-zoom.
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY) || reduced) return
      event.preventDefault()
      anchor = null
      const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1
      velocity = clamp(velocity + event.deltaX * scale * 8, 1500)
    }
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || (reduced && event.pointerType === 'touch')) return
      pointer = {
        id: event.pointerId, startX: event.clientX, startY: event.clientY,
        lastX: event.clientX, lastTime: performance.now(), dragging: false,
      }
    }
    const move = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return
      const dx = event.clientX - pointer.startX
      const dy = event.clientY - pointer.startY
      if (!pointer.dragging) {
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) { pointer = null; return }
        if (Math.abs(dx) < 6) return
        pointer.dragging = true
        anchor = null
        viewport.setPointerCapture(event.pointerId)
        viewport.dataset.dragging = 'true'
      }
      event.preventDefault()
      const now = performance.now()
      const delta = pointer.lastX - event.clientX
      if (reduced) viewport.scrollLeft += delta
      else {
        position += delta
        if (groupWidth) position = wrap(position, groupWidth)
        velocity = clamp(delta / Math.max((now - pointer.lastTime) / 1000, 0.008), 1500)
        paint()
      }
      pointer.lastX = event.clientX
      pointer.lastTime = now
    }
    const up = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return
      if (pointer.dragging) {
        suppressUntil = performance.now() + 350
        if (performance.now() - pointer.lastTime > 100 || event.type === 'pointercancel') velocity = 0
      }
      pointer = null
      delete viewport.dataset.dragging
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId)
    }
    const focusIn = (event: FocusEvent) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-moment-index]')
      // Pointer focus must not shift a card before its click can complete.
      if (!button?.matches(':focus-visible')) return
      focused = true
      viewport.scrollLeft = reduced ? viewport.scrollLeft : 0
      center(Number(button.dataset.momentIndex))
    }
    const focusOut = (event: FocusEvent) => {
      if (!viewport.contains(event.relatedTarget as Node | null)) focused = false
    }
    paint()
    viewport.addEventListener('wheel', wheel, { passive: false })
    viewport.addEventListener('pointerdown', down)
    viewport.addEventListener('pointermove', move)
    viewport.addEventListener('pointerup', up)
    viewport.addEventListener('pointercancel', up)
    viewport.addEventListener('lostpointercapture', up)
    viewport.addEventListener('focusin', focusIn)
    viewport.addEventListener('focusout', focusOut)
    document.addEventListener('visibilitychange', updateRunning)
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      intersection.disconnect()
      track.style.transform = ''
      viewport.removeEventListener('wheel', wheel)
      viewport.removeEventListener('pointerdown', down)
      viewport.removeEventListener('pointermove', move)
      viewport.removeEventListener('pointerup', up)
      viewport.removeEventListener('pointercancel', up)
      viewport.removeEventListener('lostpointercapture', up)
      viewport.removeEventListener('focusin', focusIn)
      viewport.removeEventListener('focusout', focusOut)
      document.removeEventListener('visibilitychange', updateRunning)
    }
  }, [options.reducedMotion, options.count])

  const previousExpanded = useRef(-1)
  useLayoutEffect(() => {
    const index = options.expandedIndex >= 0 ? options.expandedIndex : previousExpanded.current
    if (index >= 0) controls.current.center(index, true)
    previousExpanded.current = options.expandedIndex
  }, [options.expandedIndex, options.reducedMotion])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const keys = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        const direction = event.key === 'ArrowLeft' ? -1 : 1
        const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-moment-index]')
        if (button) {
          const index = (Number(button.dataset.momentIndex) + direction + latest.current.count) % latest.current.count
          groupRef.current?.children[index]?.querySelector('button')?.focus({ preventScroll: true })
          controls.current.center(index)
        } else controls.current.step(direction)
      }
    }
    viewport.addEventListener('keydown', keys)
    return () => viewport.removeEventListener('keydown', keys)
  }, [])

  return { viewportRef, trackRef, groupRef, controls }
}
