import { useState } from 'react'
import './Account.css'

export default function Account() {
  const [newPassword, setNewPassword] = useState('')

  const handleConfirm = () => {
    console.log('Password change confirmed:', newPassword)
  }

  return (
    <main className="account-page">
      <div className="account-card">
        <h2>Compte</h2>

        <div className="account-field">
          <label>Nom d'utilisateur</label>
          <p>username</p>
        </div>

        <div className="account-field">
          <label>ID du compte</label>
          <p>#000000</p>
        </div>

        <div className="account-field">
          <label>Changer le mot de passe</label>
          <input
            id="new-password"
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>

        <button id="confirm-password" className="account-confirm-btn" onClick={handleConfirm}>
          Confirmer
        </button>
      </div>
    </main>
  )
}
