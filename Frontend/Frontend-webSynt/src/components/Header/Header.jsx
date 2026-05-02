import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-spacer" />

      <div className="header-brand">
        <span className="header-brand-text">Tech Marketplace</span>
      </div>

      <nav className="header-nav">
        <a className="header-nav-link">Marketplace</a>
        <a className="header-nav-link">Account</a>
        <a className="header-nav-link">Settings</a>
      </nav>
    </header>
  )
}
