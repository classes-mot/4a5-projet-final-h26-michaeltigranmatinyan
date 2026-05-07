import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './SignUp.css'

export default function SignUp() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '', confirm: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (form.password !== form.confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/inscription', {
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

      login()
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
