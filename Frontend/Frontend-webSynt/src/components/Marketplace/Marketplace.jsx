import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './Marketplace.css'
import { useAuth } from '../../context/AuthContext'
import Posts from '../Posts/Posts'

export default function Marketplace() {
  const { t } = useTranslation()
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
      // Demo Mode: Mock Fetch Items
      const storedItems = JSON.parse(localStorage.getItem('demo_items')) || [
        { _id: '1', titre: 'Mock Item 1', description: 'This is a mock item.', creator: { _id: 'mock_id_1', username: 'MockUser', phoneNumber: '1234567890' } },
        { _id: '2', titre: 'Mock Item 2', description: 'This is another mock item.', creator: { _id: 'mock_id_2', username: 'OtherUser', phoneNumber: '0987654321' } }
      ];
      localStorage.setItem('demo_items', JSON.stringify(storedItems));
      setItems(storedItems)
      setError(null);
    } catch (err) {
      setError(t('error_fetching_items'));
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

    if (!newItem.titre.trim()) {
      setSubmitError(t('title_required') || "Le titre est requis")
      return
    }

    setIsSubmitting(true)
    
    // Demo Mode: Mock Add Item
    const storedItems = JSON.parse(localStorage.getItem('demo_items')) || [];
    const newItemData = { 
      _id: Date.now().toString(), 
      titre: newItem.titre, 
      description: newItem.description, 
      creator: { _id: 'mock_id_1', username: 'MockUser', phoneNumber: '1234567890' } 
    };
    const updatedItems = [...storedItems, newItemData];
    localStorage.setItem('demo_items', JSON.stringify(updatedItems));
    
    await fetchItems()
    setShowModal(false)
    setNewItem({ titre: '', description: '' })
    setIsSubmitting(false)
  }

  return (
    <main className="marketplace-page">
      {isLoggedIn && (
        <div className="marketplace-stripe">
          <span>{t('ready_to_sell')}</span>
          <button className="add-btn" onClick={() => setShowModal(true)}>{t('add')}</button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{t('add_item_title')}</h2>
            <form onSubmit={handleAddItem} className="modal-form">
              <div className="form-group">
                <label>{t('title')}</label>
                <input 
                  type="text" 
                  value={newItem.titre} 
                  onChange={e => setNewItem({...newItem, titre: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('description')}</label>
                <textarea 
                  value={newItem.description} 
                  onChange={e => setNewItem({...newItem, description: e.target.value})}
                  required
                  rows="4"
                />
              </div>
              {submitError && <p className="error-msg">{submitError}</p>}
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>{t('cancel')}</button>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? t('adding') : t('submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="marketplace-content">
        <h1>{t('marketplace')}</h1>
        {error && <p className="error-msg">{error}</p>}
        
        {!loading && !error && <Posts items={items} />}
      </div>
    </main>
  )
}
