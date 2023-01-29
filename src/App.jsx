import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import SignIn from './components/SignIn'
import Welcome from './components/Welcome'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthContext, AuthProvider } from './contexts/AuthContext'
import { PropsContext } from './contexts/PropsContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './config'
import { useContext } from 'react'

function App() {

  const [ images, setImages ] = useState([])
  const [ image, setImage ] = useState(null)
  const [ showModal, setShowModal ] = useState(false)
  const { user } = useContext(AuthContext)

  const onSearch = async (search) => {
    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setImages([])
      docSnap.data().images.forEach(img => {
        if (img.name.includes(search)) {
          setImages(images => [...images, img])
        }
      })
    } else {
      setImages([])
    }
  }

  return (
    <PropsContext.Provider value={{ images, setImages, onSearch, image, setImage, showModal, setShowModal }}>
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
