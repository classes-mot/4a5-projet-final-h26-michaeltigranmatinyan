import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Header.css'

export default function Header() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-spacer" />

      <div className="header-brand">
        <NavLink to="/" className="header-brand-text">Tech Marketplace</NavLink>
      </div>

      <nav className="header-nav">
        <NavLink
          to="/marketplace"
          className={({ isActive }) =>
            isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'
          }
        >
          Marché/Inventaire
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'
          }
        >
          Paramètres
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'
              }
            >
              Compte
            </NavLink>
            <button
              id="header-logout-btn"
              className="header-nav-link header-logout-btn"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'
              }
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              id="header-signup-btn"
              className="header-nav-link header-signup-btn"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </nav>
    </header>
  )
}
