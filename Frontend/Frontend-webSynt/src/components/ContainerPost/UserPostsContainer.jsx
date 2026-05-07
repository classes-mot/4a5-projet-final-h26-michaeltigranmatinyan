import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import UserPostsList from '../../UserPostsBubble/UserPostsList'
import '../../UserPostsBubble/UserPosts.css'

export default function UserPostsContainer({ token, user }) {
  const { t } = useTranslation()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items`)
        if (!response.ok) {
          throw new Error(t('error_fetching'))
        }
        const data = await response.json()

        const currentUserId = user?.id || user?._id
        const userPosts = data.posts.filter(post => {
          const creatorId = post.creator?.id || post.creator?._id
          return creatorId && currentUserId && creatorId === currentUserId
        })

        setPosts(userPosts)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchUserPosts()
    }
  }, [user])

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || t('error_deleting'))
      }

      setPosts(prevPosts => prevPosts.filter(p => (p.id || p._id) !== postId))
    } catch (err) {
      alert(err.message)
    }
  }
  if (error) {
    return <div className="user-posts-error">{t('error')}{error}</div>
  }

  return (
    <div className="user-posts-container">
      <h3>{t('my_posts')}</h3>
      <UserPostsList posts={posts} onDelete={handleDeletePost} />
    </div>
  )
}
