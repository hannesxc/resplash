import { collection, doc, getDoc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import { useContext, useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { db, storage } from '../config'
import { AuthContext } from '../contexts/AuthContext'
import { PropsContext } from '../contexts/PropsContext'
import Modal from './Modal'
import Navbar from './Navbar'
import Post from './Post'

function Home() {

  const { user } = useContext(AuthContext)
  const [ images, setImages ] = useState([])
  const [image, setImage] = useState(null)
  const collectionRef = collection(db, 'users')
  const imagesRef = ref(storage, 'images')

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (user) {
      registerUser()
    }
  }, [user])

  const registerUser = async () => {
    const newUser = doc(collectionRef, user.uid)
    const userSnap = await getDoc(newUser)
    if (!userSnap.exists()) {
      await setDoc(newUser, {
        uid: user.uid,
        images: []
      })
    }
  }

  const fetchData = () => {
    setImages([])
    listAll(imagesRef).then( res => {
      res.items.forEach(itemRef => {
        getDownloadURL(itemRef).then( url => {
          getMetadata(itemRef).then( metadata => {
            setImages( images => [...images, { url: url, name: metadata.name, size: metadata.size, created: metadata.timeCreated }])
          })
        }).catch( err => {})
      })
    }).catch( err => {})
  }

  const onSearch = (search) => {
    console.log(search)
  }

  return (
    <PropsContext.Provider value={{ onSearch, image, setImage }}>
      <Navbar />
      <section className="mx-4 sm:mx-6 p-6 my-6 rounded-xl bg-red-100">
        {user ? 
          <>
            <div className="flex justify-between pb-3">
              <p className="text-lg">Welcome, {user.displayName}</p>
              <p className="text-lg hidden md:block">Last Login: {user.metadata.lastSignInTime}</p>
            </div>
            <div className="flex justify-between items-center">
              <img className="rounded-full h-16" src={user.photoURL} alt='profile picture' />
              <Post />
            </div>
          </> :
          <div>
            Please sign in to upload or interact with the community.
          </div>
        }
      </section>
      {images.length ?
        <section className="max-w-screen-2xl mx-auto my-5 px-4">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 600: 2, 1000: 3 }}>
            <Masonry gutter="10px">
              {images.map( (image, idx) => {
                return <img className="cursor-pointer" key={idx} src={image.url} alt={image.name} onClick={() => setImage(image)} />
              })}
            </Masonry>
          </ResponsiveMasonry>
          <Modal />
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