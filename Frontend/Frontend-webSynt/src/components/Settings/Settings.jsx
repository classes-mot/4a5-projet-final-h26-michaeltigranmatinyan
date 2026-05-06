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
    <main className="settings-page">
      <div className="settings-card">
        <h2>Paramètres</h2>

        <div className="settings-row">
          <label>Apparence</label>
          <button
            id="theme-toggle"
            className={`toggle ${isDark ? 'toggle--on' : 'toggle--off'}`}
            onClick={toggleTheme}
            aria-label="Basculer le thème"
          >
            <span className="toggle-thumb" />
          </button>
        </div>

        <div className="settings-row">
          <label htmlFor="language-select">Langue</label>
          <select
            id="language-select"
            className="settings-select"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            {LANGUAGES.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

      </div>
    </main>
  )
}
