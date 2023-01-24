import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { useContext, useEffect, useState } from 'react'
import { db, storage } from '../config'
import { AuthContext } from '../contexts/AuthContext'
import { PropsContext } from '../contexts/PropsContext'
import Navbar from './Navbar'
import Post from './Post'

function Home() {

  const { user } = useContext(AuthContext)
  const [ images, setImages ] = useState([])
  const [ search, setSearch ] = useState('')
  const imagesRef = ref(storage, 'images')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setImages([])
    listAll(imagesRef).then( res => {
      res.items.forEach( itemRef => {
        getDownloadURL(itemRef).then( url => {
          setImages( images => [...images, { url: url }])
        }).catch( err => {})
      })
    }).catch( err => {})
  }

  const onSearch = (search) => {
    console.log(search)
  }

  return (
    <PropsContext.Provider value={{ onSearch }}>
      <Navbar />
      {user ?
        <section className="mx-4 sm:mx-6 p-6 my-6 rounded-xl bg-red-100">
          <div className="flex justify-between pb-3">
            <p className="text-lg">Welcome, {user.displayName}</p>
            <p className="text-lg hidden md:block">Last Login: {user.metadata.lastSignInTime}</p>
          </div>
          <div className="flex justify-between items-center">
            <img className="rounded-full h-16" src={user.photoURL} alt='profile picture' />
            <button className="flex justify-center items-center px-4 py-2 w-28 h-11 rounded-xl bg-red-400">
              Post
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5 -rotate-45">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </section> :
        <section>

        </section>
      }
      {images.length ?
        <section className="sm:container mx-4 sm:mx-auto my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, idx) => {
              return <img className="object-cover" key={idx} src={image.url} />
            })}
          </div>
        </section> :
        <section className='flex justify-center items-center my-40'>
          <svg className="inline w-10 h-10 mr-2 text-red-300 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <p>Loading...</p>
        </section>
      }
    </PropsContext.Provider>
  )
}

export default Home