import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { AuthContext } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import RootLayout from './navigation/RootLayout'
import Intro from './components/Intro/Intro'
import Marketplace from './components/Marketplace/Marketplace'
import Account from './components/Account/Account'
import Settings from './components/Settings/Settings'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import './i18n.js';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'))

  const loginHandler = (jwtToken) => {
    if (jwtToken) {
      localStorage.setItem('token', jwtToken)
      setToken(jwtToken)
      setIsLoggedIn(true)
    }
  }
  const logoutHandler = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsLoggedIn(false)
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Intro /> },
        { path: 'marketplace', element: <Marketplace /> },
        { path: 'settings', element: <Settings /> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <SignUp /> },
      ],
    },
  ])

  const routerLoggedIn = createBrowserRouter([
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

  return (
    <ThemeProvider>
      <AuthContext.Provider value={{ isLoggedIn, token, login: loginHandler, logout: logoutHandler }}>
        <RouterProvider router={isLoggedIn ? routerLoggedIn : router} />
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

export default App
