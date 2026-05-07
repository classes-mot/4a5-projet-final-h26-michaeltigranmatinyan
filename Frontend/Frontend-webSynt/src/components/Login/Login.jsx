import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Login.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:5000/api/users/connexion', {
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
        <h1>Log In</h1>
        <p className="auth-sub">Bienvenue sur Tech Marketplace.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Nom d'utilisateur</label>
            <input
              id="login-username"
              className="auth-input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="votre nom d'utilisateur"
              autoComplete="username"
            />
          </div>

          <div className="auth-field">
            <label>Mot de passe</label>
            <input
              id="login-password"
              className="auth-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button id="login-submit" className="auth-btn" type="submit">
            Log In
          </button>
        </form>

        <p className="auth-footer">
          Pas encore de compte?{' '}
          <Link to="/signup" className="auth-link">Sign Up</Link>
        </p>
      </div>
    </main>
  )
}
