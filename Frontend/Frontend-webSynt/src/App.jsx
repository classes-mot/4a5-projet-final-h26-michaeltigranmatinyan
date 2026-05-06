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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const loginHandler = () => setIsLoggedIn(true)
  const logoutHandler = () => setIsLoggedIn(false)

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
      <AuthContext.Provider value={{ isLoggedIn, login: loginHandler, logout: logoutHandler }}>
        <RouterProvider router={isLoggedIn ? routerLoggedIn : router} />
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

export default App
