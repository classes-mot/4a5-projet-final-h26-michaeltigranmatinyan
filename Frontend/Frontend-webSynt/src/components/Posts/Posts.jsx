import React from 'react'
import './Posts.css'

export default function Posts({ items = [] }) {
  const [selectedItem, setSelectedItem] = React.useState(null)

  if (items.length === 0) {
    return <p className="no-posts-msg">Aucun item n'a été trouvé.</p>
  }

  return (
    <>
      <div className="items-grid">
        {items.map(item => (
          <div 
            className="item-card" 
            key={item.id || item._id}
            onClick={() => setSelectedItem(item)}
            style={{ cursor: 'pointer' }}
          >
            <h2>{item.titre}</h2>
            <p className="item-desc">{item.description}</p>
            
            <div className="item-creator-divider" />
            
            <div className="item-creator-info">
              <span className="info-label">Vendeur</span>
              <span className="underline-info">{item.creator?.username || 'Inconnu'}</span>
            </div>
            <div className="item-creator-info">
              <span className="info-label">Contact</span>
              <span className="underline-info">{item.creator?.phoneNumber || 'Non renseigné'}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedItem(null)}>&times;</button>
            <h2>{selectedItem.titre}</h2>
            <p className="modal-desc">{selectedItem.description}</p>
            <div className="item-creator-divider" style={{ margin: '20px 0' }} />
            <div className="item-creator-info">
              <span className="info-label">Vendeur</span>
              <span className="underline-info">{selectedItem.creator?.username || 'Inconnu'}</span>
            </div>
            <div className="item-creator-info">
              <span className="info-label">Contact</span>
              <span className="underline-info">{selectedItem.creator?.phoneNumber || 'Non renseigné'}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
