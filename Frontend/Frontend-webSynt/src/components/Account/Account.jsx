import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import UserPostsContainer from '../ContainerPost/UserPostsContainer'
import './Account.css'
//commit
export default function Account() {
  const { token } = useAuth()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du profil')
        }
        const data = await response.json()
        setUser(data.user)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchUserProfile()
    }
  }, [token])

  if (error) {
    return (
      <main className="account-page">
        <div className="account-card error-card">
          <h2>Erreur</h2>
          <p>{error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="account-page">
      <div className="account-card">
        <h2>Compte</h2>

        <div className="account-field">
          <label>Nom d'utilisateur</label>
          <p className="account-val">{user?.username}</p>
        </div>

        <div className="account-field">
          <label>Numéro de téléphone</label>
          <p className="account-val">{user?.phoneNumber || 'Non renseigné'}</p>
        </div>

        <div className="account-field">
          <label>ID du compte</label>
          <p className="account-val">#{user?.id || user?._id}</p>
        </div>

        <UserPostsContainer token={token} user={user} />
      </div>
    </main>
  )
}
