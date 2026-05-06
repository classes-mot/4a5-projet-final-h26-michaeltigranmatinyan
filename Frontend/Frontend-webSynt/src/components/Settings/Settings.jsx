import { useState } from 'react'
import './Settings.css'
import { useTheme } from '../../context/ThemeContext'

const LANGUAGES = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
]

export default function Settings() {
  const { isDark, toggleTheme } = useTheme()
  const [language, setLanguage] = useState('fr')

  return (
    <main className="page settings-page">
      <div className="page-content">
        <h1 className="page-title">Paramètres</h1>

        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-label">
              <div>
                <p className="settings-row-title">Apparence</p>
                <p className="settings-row-desc">{isDark ? 'Mode sombre activé' : 'Mode clair activé'}</p>
              </div>
            </div>
            <button
              id="theme-toggle"
              className={`toggle ${isDark ? 'toggle--on' : 'toggle--off'}`}
              onClick={toggleTheme}
              aria-label="Basculer le thème"
            >
              <span className="toggle-thumb" />
            </button>
            </div >
          <div className="settings-row">
            <div className="settings-label">
              <div>
                <p className="settings-row-title">Langue</p>
              </div>
            </div>

            <select
              id="language-select"
              className="settings-select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              aria-label="Sélectionner la langue"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </main>
  )
}
