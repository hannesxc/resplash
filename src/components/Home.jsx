import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { useContext, useEffect, useState } from 'react'
import { db, storage } from '../config'
import { AuthContext } from '../contexts/AuthContext'
import Post from './Post'

function Home() {

  const { user } = useContext(AuthContext)
  const [ images, setImages ] = useState([])
  const imagesRef = ref(storage, 'images')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setImages([])
    listAll(imagesRef).then( res => {
      res.items.forEach( itemRef => {
        getDownloadURL(itemRef).then( url => {
          setImages( images => [...images, { url: url }])
        })
      })
    }).catch( err => {})
  }

  return (
    <section className="container mx-auto my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, idx) => {
          return <img className="object-cover" key={idx} src={image.url} />
        })}
      </div>
    </section>
  )
}

export default Home