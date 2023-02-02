import { doc, getDoc } from 'firebase/firestore'
import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config'
import { AuthContext } from '../contexts/AuthContext'
import DisplayImages from './DisplayImages'

function Dashboard() {
  
  const { user } = useContext(AuthContext)
  const [ toggle, setToggle ] = useState(false)
  const [ data, setData ] = useState([])
  const [ noData, setNoData ] = useState(false)
  const [ posts, setPosts ] = useState(0)
  const [ uploads, setUploads ] = useState(true)

  useEffect(() => {
    if (user) {
      setNoData(false)
      fetchPosts()
    }
  }, [uploads])

  const fetchPosts = async () => {
    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)
    if (uploads && docSnap.exists() && docSnap.data().images.length) {
      setPosts(docSnap.data().images.length)
      setData(docSnap.data().images)
    } else if (!uploads && docSnap.exists() && docSnap.data().likes.length) {
      setData(docSnap.data().likes)
    } else {
      setNoData(true)
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      {user ?
        <>
          <nav className="max-w-[1920px] big-screen:mx-auto flex justify-between items-center p-3 mx-4">
            <Link to='/resplash/home'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
              </svg>
            </Link>
            <p className="text-lg font-medium tracking-wider">Dashboard</p>
            <div className="relative inline-block">
              <button type="button" onClick={() => setToggle(!toggle)} className="inline-flex mt-1">
                <img className="rounded-full h-11" src={user.photoURL} alt="profile" />
              </button>
              {toggle ?
                <div className="text-gray-700 absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="pt-4">
                    <p className="block px-4 text-sm">Signed in as:</p>
                    <div className="block px-4 py-2 text-sm">
                      <p>{user.displayName}</p>
                      <p>{user.email}</p>
                    </div>
                    <Link to="/resplash/home" className="block px-4 py-2 border-t border-gray-200 text-sm cursor-pointer hover:bg-black hover:text-white">Home</Link>
                  </div>
                  <Link to="/resplash/home" className="block px-4 py-3 text-sm border-t border-gray-200 hover:bg-black hover:text-white" onClick={() => auth.signOut()}>Sign Out</Link>
                </div> : null
              }
            </div>
          </nav>
          <section className="max-w-[1920px] flex mx-4 sm:mx-6 big-screen:mx-auto p-6 my-6 rounded-xl bg-black/20">
            <img className='rounded-md w-28 md:w-40' src={user.photoURL} alt={user.displayName} />
            <div className="flex flex-col justify-between px-3 sm:px-6 py-1 text-base sm:text-lg">
              <p className="flex"><span className="hidden sm:block">Name:&ensp;</span>{user.displayName}</p>
              <p className='flex'><span className="hidden sm:block">Email:&ensp;</span>{user.email}</p>
              <p>Posts:&ensp;{posts}</p>
              <p className="flex text-sm sm:text-lg"><span className="hidden sm:block">Last Login:&ensp;</span>{user.metadata.lastSignInTime}</p>
            </div>
          </section>
          <section className='max-w-[1920px] flex-grow big-screen:mx-auto'>
            <div className="flex justify-around py-6 mx-4">
              <button className={`w-1/3 pb-3 ${uploads ? "border-b-4  border-black" : ""}`} onClick={() => setUploads(true)}>Your Uploads</button>
              <button className={`w-1/3 pb-3 ${!uploads ? "border-b-4 border-black" : ""}`} onClick={() => setUploads(false)}>Liked Posts</button>
            </div>
            {!noData ? <DisplayImages data={data} /> : null}
            <p className={noData ? "text-lg text-center my-6" : "hidden"}>Nothing to display.</p>
          </section>
        </> :
        <section className="mx-4 sm:mx-6 p-6 my-6 rounded-xl bg-red-200">
          <p className='text-lg'>
            You are not authorized to view this page. Please return <Link to="/resplash/home">Home</Link>.
          </p>
        </section>
      }
      <footer className='bg-black text-white p-8 flex justify-center mt-14'>
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

export default Dashboard