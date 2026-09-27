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
        // Demo Mode: Mock User Profile
        setUser({ username: 'MockUser', phoneNumber: '1234567890', id: 'mock_id_1' });
      } catch (err) {
        setError('Erreur lors de la récupération du profil');
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
