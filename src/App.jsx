import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import SignIn from './components/SignIn'
import Welcome from './components/Welcome'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PropsContext } from './contexts/PropsContext'

function App() {

  const [ images, setImages ] = useState([])
  const [ image, setImage ] = useState(null)
  const [ showModal, setShowModal ] = useState(false)
  const [ imageSearch, setImageSearch ] = useState("")

  return (
    <PropsContext.Provider value={{ images, setImages, imageSearch, setImageSearch, image, setImage, showModal, setShowModal }}>
      <Router>
        <Routes>
          <Route path='/resplash/signin' element={ <SignIn /> } />
          <Route path='/resplash' element={ <Welcome /> } />
          <Route path='/resplash/home' element={ <Home /> } />
          <Route path='/resplash/dashboard' element={ <Dashboard /> } />
        </Routes>
      </Router>
    </PropsContext.Provider>
  )
}

export default App
