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
        <Link to='/'>
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
          {user ?
            <Link to='/resplash/home'>
              <button className="flex justify-center px-4 py-2 w-36 bg-blue-400/20 hover:bg-gray-400/30 rounded-3xl" type='button'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
                &ensp;Signed In
              </button>
            </Link> :
            <Link to='/resplash/signin'>
              <button className="flex justify-center px-4 py-2 w-32 bg-blue-400/20 hover:bg-gray-400/30 rounded-3xl" type='button'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
                &ensp;Sign In
              </button>
            </Link>
          }
        </div>
      </div>
      <footer className='text-white p-6 flex justify-center mt-14 z-0'>
        <a className='inline-flex items-center hover:underline hover:opacity-70' href='https://github.com/hannesxc/resplash' target='_blank' rel='noreferrer'>
          <svg xmlns="http://www.w3.org/2000/svg" height='32px' width='32px' fill='white' viewBox="0 0 496 512">
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
          </svg>
          <span className='ml-4'>Aditya Chakravorty</span>
        </a>
      </footer>
    </div>
  )
}

export default Welcome