import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL, getMetadata } from 'firebase/storage'
import { storage } from '../config'

function Post() {

  const [ image, setImage ] = useState({})

  const handleImage = (e) => {
    if (e.target.files[0]) {
      const imagesRef = ref(storage, 'images/' + e.target.files[0].name)
      const uploadTask = uploadBytes(imagesRef, e.target.files[0])
      uploadTask.then( snapshot => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          getMetadata(imagesRef).then( metadata => {
            setImage({url: downloadURL, name: metadata.name, size: metadata.size, created: metadata.timeCreated})
          }).catch( err => {})
        })
      }).catch( err => {})
    }
  }

  return (
    <>
      <input className='' type='file' onChange={handleImage}></input>
      {image ? 
        <img src={image.url} width='45%'/> :
        <p>No image selected.</p>
      }
    </>
  )
}

export default Post