import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import resplashd from '../assets/videos/resplashd.mp4'
import resplashm from '../assets/videos/resplashm.mp4'

function Welcome() {

  const { user } = useContext(AuthContext)

  return (

    <div className="h-screen flex flex-col">
      <video className="hidden sm:block h-screen object-cover w-full absolute" autoPlay loop muted>
        <source src={resplashd} type="video/mp4" />
        Video isn't supported, please upgrade your browser.
      </video>
      <video className="h-screen sm:hidden object-fill w-full absolute" autoPlay loop muted>
        <source src={resplashm} type="video/mp4" />
        Video isn't supported, please upgrade your browser.
      </video>
      <div className="relative w-fit m-4 md:ml-40 flex-grow flex justify-center items-center md:items-start flex-col">
        <Link to='/resplash'>
          <h1 className="tracking-wider font-bold bg-clip-text text-transparent bg-gradient-to-r hover:bg-gradient-to-t to-teal-400 from-lime-700 text-6xl leading-loose italic">
            resplash
          </h1>
        </Link>
        <p className="text-2xl text-center mb-8 text-yellow-50">The internet's source for visuals. Powered by creators everywhere!</p>
        <div className="flex gap-6 text-gray-300">
          <Link to='/resplash/home'>
            <button className="flex justify-center px-4 py-2 w-32 -t bg-blue-400/20 hover:bg-gray-400/30 rounded-3xl" type='button'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              &ensp;Home
            </button>
          </Link>
          <Link to={user ? '/resplash/home' : '/resplash/signin'}>
            <button className="flex justify-center px-4 py-2 w-32 bg-blue-400/20 hover:bg-gray-400/30 rounded-3xl" type='button'>
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