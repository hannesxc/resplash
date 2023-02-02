import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import { useContext, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Link } from 'react-router-dom'
import { db, storage } from '../config'
import { AuthContext } from '../contexts/AuthContext'
import { PropsContext } from '../contexts/PropsContext'
import InfiniteScrollPagination from './InfiniteScroll'
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
        <Carousel showArrows={false} showThumbs={false} swipeable={false} infiniteLoop={true} stopOnHover={false} animationHandler={'fade'} interval={5000} autoPlay>
          <img src={image1} alt='image'/>
          <img src={image2} alt='image'/>
          <img src={image3} alt='image'/>
          <img src={image4} alt='image' />
        </Carousel>
        <p className='hidden sm:block absolute top-4 left-4 text-white text-lg'>Royalty free images, by the community, for the community.</p>
      </div>
      <InfiniteScrollPagination />
      <footer className='bg-black text-white p-8 flex justify-center mt-14'>
        <a className='inline-flex items-center hover:underline hover:opacity-70' href='https://github.com/hannesxc/resplash' target='_blank' rel='noreferrer'>
          <svg xmlns="http://www.w3.org/2000/svg" height='32px' width='32px' fill='white' viewBox="0 0 496 512">
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
          </svg>
          <span className='ml-4'>Aditya Chakravorty</span>
        </a>
      </footer>
    </>
  )
}

export default Home