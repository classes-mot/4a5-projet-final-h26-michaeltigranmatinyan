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
        // Demo Mode: Mock Fetch Items
        const storedItems = JSON.parse(localStorage.getItem('demo_items')) || [
          { _id: '1', titre: 'Mock Item 1', description: 'This is a mock item.', creator: { _id: 'mock_id_1', username: 'MockUser', phoneNumber: '1234567890' } },
          { _id: '2', titre: 'Mock Item 2', description: 'This is another mock item.', creator: { _id: 'mock_id_2', username: 'OtherUser', phoneNumber: '0987654321' } }
        ];

        const currentUserId = user?.id || user?._id || 'mock_id_1'
        const userPosts = storedItems.filter(post => {
          const creatorId = post.creator?.id || post.creator?._id
          return creatorId && currentUserId && creatorId === currentUserId
        })

        setPosts(userPosts)
      } catch (err) {
        setError(t('error_fetching'));
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchUserPosts()
    }
  }, [user])

  const handleDeletePost = async (postId) => {
    // Demo Mode: Mock Delete Post
    const storedItems = JSON.parse(localStorage.getItem('demo_items')) || [];
    const updatedItems = storedItems.filter(p => (p.id || p._id) !== postId);
    localStorage.setItem('demo_items', JSON.stringify(updatedItems));
    setPosts(prevPosts => prevPosts.filter(p => (p.id || p._id) !== postId));
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
