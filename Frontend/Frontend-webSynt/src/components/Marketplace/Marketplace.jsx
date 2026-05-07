import { useState, useEffect } from 'react'
import './Marketplace.css'
import { useAuth } from '../../context/AuthContext'

export default function Marketplace() {
  const { isLoggedIn, token } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [showModal, setShowModal] = useState(false)
  const [newItem, setNewItem] = useState({ titre: '', description: '' })
  const [submitError, setSubmitError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items`)
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des items')
      }
      const data = await response.json()
      setItems(data.posts)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleAddItem = async (e) => {
    e.preventDefault()
    setSubmitError(null)
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newItem)
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la création')
      }

      await fetchItems()
      setShowModal(false)
      setNewItem({ titre: '', description: '' })
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="marketplace-page">
      {isLoggedIn && (
        <div className="marketplace-stripe">
          <span>Prêt à vendre ?</span>
          <button className="add-btn" onClick={() => setShowModal(true)}>+ Add</button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Ajouter un Item</h2>
            <form onSubmit={handleAddItem} className="modal-form">
              <div className="form-group">
                <label>Titre</label>
                <input 
                  type="text" 
                  value={newItem.titre} 
                  onChange={e => setNewItem({...newItem, titre: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={newItem.description} 
                  onChange={e => setNewItem({...newItem, description: e.target.value})}
                  required
                  rows="4"
                />
              </div>
              {submitError && <p className="error-msg">{submitError}</p>}
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Ajout...' : 'Soumettre'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="marketplace-content">
        <h1>Marketplace</h1>
        {error && <p className="error-msg">{error}</p>}
        
        {!loading && !error && items.length === 0 && (
          <p>Aucun item n'a été trouvé.</p>
        )}

        <div className="items-grid">
          {items.map(item => (
            <div className="item-card" key={item.id}>
              <h2>{item.titre}</h2>
              <p className="item-desc">{item.description}</p>
              
              <div className="item-creator-info">
                <span>Vendeur : </span>
                <span className="underline-info">{item.creator?.username || 'Inconnu'}</span>
              </div>
              <div className="item-creator-info">
                <span>Contact : </span>
                <span className="underline-info">{item.creator?.phoneNumber || 'Non renseigné'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
