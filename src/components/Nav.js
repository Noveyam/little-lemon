import logo from '../logo.svg'
import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
export const navigation = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/menu', 'Menu'],
  ['/reservations', 'Reservations'],
  ['/order_online', 'Order Online'],
  ['/login', 'Login'],
]
function Nav() {
  const [expanded, setExpanded] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    setExpanded(false)
  }, [pathname])
  return (
    <nav className="navigation" aria-label="Main navigation">
      <Link to="/" aria-label="Little Lemon home">
        <img
          className="brand-logo"
          src={logo}
          width="200"
          height="60"
          alt="Little Lemon"
        />
      </Link>
      <button
        className="hamburger"
        type="button"
        aria-label="Toggle navigation"
        aria-controls="navigation-links"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setExpanded(false)
        }}
      >
        ☰
      </button>
      <div
        id="navigation-links"
        className={`navigation-menu ${expanded ? 'expanded' : ''}`}
      >
        <ul>
          {navigation.map(([to, name]) => (
            <li key={to}>
              <NavLink end={to === '/'} to={to} className="nav-link">
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
export default Nav
