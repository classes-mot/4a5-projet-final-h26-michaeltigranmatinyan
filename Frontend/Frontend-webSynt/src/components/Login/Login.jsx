import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import './Login.css'

export default function Login() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [validationError, setValidationError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidationError('')

    if (!form.username.trim() || !form.password.trim()) {
      setValidationError(t('all_fields_required') || 'Veuillez remplir tous les champs')
      return
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      login(responseData.token)
      navigate('/')
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>{t('login')}</h1>
        <p className="auth-sub">{t('welcome_msg')}</p>

        {validationError && <p className="error-msg" style={{color: '#e74c3c', fontSize: '0.9rem', marginBottom: '16px', textAlign: 'center'}}>{validationError}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>{t('username')}</label>
            <input
              id="login-username"
              className="auth-input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="votre nom d'utilisateur"
              autoComplete="username"
              required
            />
          </div>

          <div className="auth-field">
            <label>{t('password')}</label>
            <input
              id="login-password"
              className="auth-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button id="login-submit" className="auth-btn" type="submit">
            {t('login')}
          </button>
        </form>

        <p className="auth-footer">
          {t('no_account_yet')}{' '}
          <Link to="/signup" className="auth-link">{t('signup')}</Link>
        </p>
      </div>
    </main>
  )
}
