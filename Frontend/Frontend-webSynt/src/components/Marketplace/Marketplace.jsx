import './Marketplace.css'
import { useAuth } from '../../context/AuthContext'

export default function Marketplace() {
  const { isLoggedIn } = useAuth()

  return (
    <main className="marketplace-page">
      {isLoggedIn && (
        <div className="marketplace-stripe">
          <span>Prêt à vendre ?</span>
          <button className="add-btn">+ Add</button>
        </div>
      )}
      
      <div className="marketplace-content">
        {/*TEMP*/}
        <div className="items-grid">
          <div className="item-card">Item 1</div>
          <div className="item-card">Item 2</div>
          <div className="item-card">Item 3</div>
        </div>
      </div>
    </main>
  )
}
