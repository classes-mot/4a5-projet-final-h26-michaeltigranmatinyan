import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './SignUp.css'

export default function SignUp() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '', confirm: '', phoneNumber: '' })
  const [validationError, setValidationError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidationError('')

    if (!form.username.trim() || !form.phoneNumber.trim() || !form.password.trim() || !form.confirm.trim()) {
      setValidationError("Veuillez remplir tous les champs")
      return
    }

    if (form.password.length < 6) {
      setValidationError("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    if (form.password !== form.confirm) {
      setValidationError("Les mots de passe ne correspondent pas")
      return
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          phoneNumber: form.phoneNumber
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
        <h1 className="auth-title">Sign Up</h1>
        <p className="auth-sub">Créez votre compte Tech Marketplace.</p>

        {validationError && <p className="error-msg" style={{color: '#e74c3c', fontSize: '0.9rem', marginBottom: '16px', textAlign: 'center'}}>{validationError}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Nom d'utilisateur</label>
            <input
              id="signup-username"
              className="auth-input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="choisissez un nom d'utilisateur"
              autoComplete="username"
              required
              minLength={3}
            />
          </div>
          <div className="auth-field">
            <label>Numéro de téléphone</label>
            <input
              id="signup-phone"
              className="auth-input"
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="votre numéro de téléphone"
              autoComplete="tel"
              required
              pattern="^[0-9+\-\s()]{7,15}$"
              title="Veuillez entrer un numéro de téléphone valide"
            />
          </div>
          <div className="auth-field">
            <label>Mot de passe</label>
            <input
              id="signup-password"
              className="auth-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>
          <div className="auth-field">
            <label>Répéter le mot de passe</label>
            <input
              id="signup-confirm"
              className="auth-input"
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>
          <button id="signup-submit" className="auth-btn" type="submit">
            Créer un compte
          </button>
        </form>

        <p className="auth-footer">
          Déjà un compte?{' '}
          <Link to="/login" className="auth-link">Log In</Link>
        </p>
      </div>
    </main>
  )
}
