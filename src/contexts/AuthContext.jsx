import { useEffect, useState, createContext } from "react"
import { app } from "../config"
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [ user, setUser ] = useState(null)
  const auth = getAuth(app)
  
  useEffect(() => {
    onAuthStateChanged( auth, user => {
      setUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, auth }}>{children}</AuthContext.Provider>
  )
}
