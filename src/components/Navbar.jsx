import { useState } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { PropsContext } from "../contexts/PropsContext"

function Navbar() {
  
  const { user, auth } = useContext(AuthContext)
  const { onSearch } = useContext(PropsContext)
  const [ search, setSearch ] = useState("")

  return (
    <nav className="flex justify-between items-center p-3 mx-4">
      <Link to='/resplash'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
        </svg>
      </Link>
      <div className="flex w-2/4 pl-2 items-center border-2 border-solid border-gray-400 rounded-xl h-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg>
        <input className="w-5/6 ml-5 focus:outline-none" type='text' placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
        <button className="text-white bg-black h-10 w-1/3 sm:w-1/6 rounded-r-xl" onClick={e => onSearch(search)}>Go</button>
      </div>
      {!user ? (
        <Link to="/resplash/signin">Sign-In</Link>
      ) : (
        <Link to="/resplash/home" onClick={() => auth.signOut()}>Sign Out</Link>
      )}
    </nav>
  )
}

export default Navbar
