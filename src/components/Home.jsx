import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import { useContext, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Link } from 'react-router-dom'
import { db, storage } from '../config'
import { AuthContext } from '../contexts/AuthContext'
import { PropsContext } from '../contexts/PropsContext'
import DisplayImages from './DisplayImages'
import Navbar from './Navbar'
import Post from './Post'
import image1 from '../assets/images/a.jpg'
import image2 from '../assets/images/b.jpg'
import image3 from '../assets/images/c.jpg'
import image4 from '../assets/images/d.jpg'

function Home() {

  const { user } = useContext(AuthContext)
  const { images, imageSearch, setImages, setShowModal } = useContext(PropsContext)
  const collectionRef = collection(db, 'users')
  const imagesRef = ref(storage, 'images')

  useEffect(() => {
    fetchData()
  }, [imageSearch])

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
        images: [],
        likes: []
      })
    }
  }

  const fetchData = () => {
    setImages([])
    listAll(imagesRef).then( res => {
      res.items.forEach(itemRef => {
        getDownloadURL(itemRef).then( url => {
          getMetadata(itemRef).then(metadata => {
            if (metadata.name.includes(imageSearch) || metadata.customMetadata.description.includes(imageSearch)) {
              setImages(images => [...images, {
                url: url,
                name: metadata.name,
                size: metadata.size,
                created: metadata.timeCreated,
                description: metadata.customMetadata.description,
                uploadedBy: metadata.customMetadata.uploadedBy,
                profile: metadata.customMetadata.profile
              }])
            }
          })
        }).catch( err => {})
      })
    }).catch( err => {})
  }

  return (
    <>
      <Navbar />
      <section className="max-w-screen-big-screen mx-4 sm:mx-6 big-screen:mx-auto p-6 my-6 rounded-xl bg-black/10">
        {user ? 
          <>
            <div className="flex justify-between pb-3">
              <p className="text-lg">Welcome, {user.displayName}</p>
              <p className="text-lg hidden md:block">Last Login: {user.metadata.lastSignInTime}</p>
            </div>
            <div className="flex justify-between items-center">
              <Link to="/resplash/dashboard" className="flex justify-center items-center px-4 py-2 w-40 h-11 rounded-xl bg-white/50 hover:bg-gray-400/20">
                Dashboard
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
              </Link>
              <button className="flex justify-center items-center px-4 py-2 w-28 h-11 rounded-xl bg-white/50 hover:bg-gray-400/20" type='button' onClick={() => setShowModal(true)}>
                Post
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5 -rotate-45">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
              <Post />
            </div>
          </> :
          <div>
            Please sign in to upload or interact with the community.
          </div>
        }
      </section>
      <div className="relative max-w-screen-big-screen mx-6 big-screen:mx-auto">
        <Carousel showArrows={false} showThumbs={false} infiniteLoop={true} stopOnHover={false} animationHandler={'fade'} interval={5000} autoPlay>
          <img src={image1} alt='image'/>
          <img src={image2} alt='image'/>
          <img src={image3} alt='image'/>
          <img src={image4} alt='image' />
        </Carousel>
        <p className='absolute top-4 left-4 text-white text-base md:text-lg xl:text-xl'>Royalty free images, by the community, for the community.</p>
      </div>
      <DisplayImages data={images} />
    </>
  )
}

export default Home