import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import './Header.css'

export default function Header() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-spacer" />

      <div className="header-brand">
        <NavLink to="/" className="header-brand-text">{t('brand')}</NavLink>
      </div>

      <nav className="header-nav">
        <NavLink
          to="/marketplace"
          className={({ isActive }) =>
            isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'
          }
        >
          {t('market_inventory')}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'
          }
        >
          {t('settings')}
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'
              }
            >
              {t('account')}
            </NavLink>
            <button
              id="header-logout-btn"
              className="header-nav-link header-logout-btn"
              onClick={handleLogout}
            >
              {t('logout')}
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
              {t('login')}
            </NavLink>
            <NavLink
              to="/signup"
              id="header-signup-btn"
              className="header-nav-link header-signup-btn"
            >
              {t('signup')}
            </NavLink>
          </>
        )}
      </nav>
    </header>
  )
}
