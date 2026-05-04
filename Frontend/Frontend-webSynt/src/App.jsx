import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import RootLayout from './navigation/RootLayout'
import Intro from './components/Intro/Intro'
import Marketplace from './components/Marketplace/Marketplace'
import Account from './components/Account/Account'
import Settings from './components/Settings/Settings'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Intro /> },
      { path: 'marketplace', element: <Marketplace /> },
      { path: 'account', element: <Account /> },
      { path: 'settings', element: <Settings /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
    ],
  },
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
