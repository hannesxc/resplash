import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

function Welcome() {

  const { user } = useContext(AuthContext)

  return (
    <div className="h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex-grow flex justify-center items-center flex-col">
        <Link to='/resplash'>
          <h1 className="tracking-wider font-bold bg-clip-text text-transparent bg-gradient-to-r to-yellow-300 from-red-400 hover:to-black hover:from-lime-700 text-6xl leading-loose italic">
            resplash
          </h1>
        </Link>
        <div className="flex gap-6">
          <Link to='/resplash/home'>
            <button className="flex justify-center px-4 py-2 w-32 bg-orange-300 hover:opacity-70 rounded-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              &ensp;Home
            </button>
          </Link>
          <Link to={user ? '/resplash/home' : '/resplash/signin'}>
            <button className="flex justify-center px-4 py-2 w-32 bg-orange-300 hover:opacity-70 rounded-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
              &ensp;Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome