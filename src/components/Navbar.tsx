import { useState, useEffect, useRef } from 'react'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Hobbies', href: '#hobbies' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const lockRef = useRef(false)
  const lockTimer = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      if (lockRef.current) return
      const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
      if (!sections.length) return

      const center = window.scrollY + window.innerHeight / 2
      let bestId = sections[0].id
      let bestDist = Infinity
      for (const s of sections) {
        const sCenter = s.offsetTop + s.offsetHeight / 2
        const dist = Math.abs(center - sCenter)
        if (dist < bestDist) {
          bestDist = dist
          bestId = s.id
        }
      }
      setActive(`#${bestId}`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const lockActive = (href: string) => {
    setActive(href)
    lockRef.current = true
    if (lockTimer.current) window.clearTimeout(lockTimer.current)
    lockTimer.current = window.setTimeout(() => {
      lockRef.current = false
    }, 900)
  }

  const closeMobile = () => setMobileOpen(false)

  const onSectionClick = (href: string) => {
    lockActive(href)
    closeMobile()
  }

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
    history.replaceState(null, '', window.location.pathname)
    lockActive('#hero')
    closeMobile()
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (lockTimer.current) window.clearTimeout(lockTimer.current)
    }
  }, [])

  return (
    <header className={`site-header ${scrolled || mobileOpen ? 'is-scrolled' : ''}`}>
      <nav className="section-container nav-inner" aria-label="Main navigation">
        <a href="#hero" onClick={goHome} className="nav-brand" aria-label="Shivendra Bhagat, home">
          <span className="brand-symbol" aria-hidden="true">
            SB
          </span>
        </a>
        <ul className="desktop-nav">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={link.href === '#hero' ? goHome : () => onSectionClick(link.href)}
                className={active === link.href ? 'is-active' : ''}
                aria-current={active === link.href ? 'location' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="menu-toggle"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          <i className={mobileOpen ? 'fas fa-times' : 'fas fa-bars'} aria-hidden="true" />
        </button>
      </nav>
      {mobileOpen && (
        <div id="mobile-navigation" className="mobile-nav">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={link.href === '#hero' ? goHome : () => onSectionClick(link.href)}
              className={active === link.href ? 'is-active' : ''}
              aria-current={active === link.href ? 'location' : undefined}
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
