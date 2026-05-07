import './Settings.css'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
]

export default function Settings() {
  const { isDark, toggleTheme } = useTheme()
  const { t, i18n } = useTranslation()

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <main className="settings-page">
      <div className="settings-card">
        <h2>{t('settings')}</h2>

        <div className="settings-row">
          <label>{t('appearance')}</label>
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
          <label>{t('language')}</label>
          <select
            id="language-select"
            className="settings-select"
            value={i18n.resolvedLanguage || 'fr'}
            onChange={handleLanguageChange}
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
