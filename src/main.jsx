import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SignIn from './components/SignIn'
import Welcome from './components/Welcome'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route path='/resplash/signin' element={ <SignIn /> } />
        <Route path='/resplash' element={ <Welcome /> } />
        <Route path='/resplash/home' element={ <App /> } />
      </Routes>
    </Router>
  </AuthProvider>
)
