import React from 'react'
import './UserPosts.css'

export default function UserPostsList({ posts = [], onDelete }) {
  const [selectedPost, setSelectedPost] = React.useState(null)

  if (posts.length === 0) {
    return <p className="no-user-posts-msg">Vous n'avez publié aucun item.</p>
  }

  return (
    <>
      <div className="user-posts-bubble-list">
        {posts.map(post => (
          <div className="user-post-bubble" key={post.id || post._id}>
            <span 
              className="user-post-bubble-title" 
              title={post.titre}
              onClick={() => setSelectedPost(post)}
              style={{ cursor: 'pointer' }}
            >
              {post.titre}
            </span>
            <button
              className="user-post-bubble-delete-btn"
              onClick={() => onDelete(post.id || post._id)}
              aria-label={`Supprimer ${post.titre}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedPost(null)}>&times;</button>
            <h2>{selectedPost.titre}</h2>
            <p className="modal-desc">{selectedPost.description}</p>
          </div>
        </div>
      )}
    </>
  )
}
