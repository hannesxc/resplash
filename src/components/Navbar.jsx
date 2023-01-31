import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { PropsContext } from "../contexts/PropsContext"
import Post from "./Post"

function Navbar() {
  
  const { user, auth } = useContext(AuthContext)
  const { setImageSearch, setShowModal } = useContext(PropsContext)
  const [ toggle, setToggle ] = useState(false)
  const [ search, setSearch ] = useState("")
  
  const onSearch = () => {
    setImageSearch(search)
  }

  return (
    <nav className="max-w-screen-big-screen flex justify-between items-center p-3 mx-4 big-screen:mx-auto">
      <Link to='/resplash'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
        </svg>
      </Link>
      <div className="flex w-2/4 pl-2 items-center border-2 border-solid border-gray-400 rounded-xl h-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg>
        <input className="w-5/6 ml-5 bg-inherit focus:outline-none" type='text' placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
        <button className="text-white bg-black hover:opacity-60 h-10 w-1/3 sm:w-1/5 rounded-r-xl" type="button" onClick={onSearch}>Go</button>
      </div>
      <div className="relative inline-block">     
        <button type="button" onClick={() => setToggle(!toggle)} className="inline-flex mt-1" title="Account">
          {!user ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg> :
            <img className="rounded-full h-12" src={user.photoURL} alt="profile" />
          }
        </button>
        {toggle ?
          <div className="text-gray-700 absolute right-0 z-10 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            {user ?
              <>
                <div className="pt-4">
                  <p className="block px-4 text-sm">Signed in as:</p>
                  <div className="block px-4 py-2 text-sm">
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                  </div>
                  <div className="py-1 border-t border-gray-200">
                    <Link to="/resplash/dashboard" className="block px-4 py-2 text-sm hover:bg-black hover:text-white" >Dashboard</Link>
                    <p className="block px-4 py-2 text-sm cursor-pointer hover:bg-black hover:text-white" onClick={() => setShowModal(true)} >Upload</p>
                    <Post />
                  </div>
                </div>
                <button className="w-full block px-4 py-3 text-left text-sm border-t border-gray-200 hover:bg-black hover:text-white" onClick={() => {
                  auth.signOut()
                  setToggle(false)
                }}>
                  Sign Out
                </button>
              </> :
              <Link to="/resplash/signin" className="block px-4 py-3 text-sm border-t border-gray-200 hover:bg-red-100">Sign In</Link>
            }
          </div>: null
        }
      </div>
    </nav>
  )
}

export default Navbar
