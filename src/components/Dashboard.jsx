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
    <>
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
          <section className='max-w-[1920px] big-screen:mx-auto'>
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
    </>
  )
}

export default Dashboard