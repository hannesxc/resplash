import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL, getMetadata } from 'firebase/storage'
import { storage } from '../config'

function Post() {

  const [ image, setImage ] = useState(null)
  const [ showModal, setShowModal ] = useState(false)
  
  const handlePreview = (e) => {
    if (e.target.files[0]) {
      setImage(e)
    }
  }

  const handleImage = (e) => {
    if (e.target.files[0]) {
      const imagesRef = ref(storage, 'images/' + e.target.files[0].name)
      const uploadTask = uploadBytes(imagesRef, e.target.files[0])
      uploadTask.then( snapshot => {
        setImage(null)
      }).catch( err => {})
    }
  }

  return (
    <>
      <button className="flex justify-center items-center px-4 py-2 w-28 h-11 rounded-xl bg-red-400" type='button' onClick={() => setShowModal(true)}>
        Post
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5 -rotate-45">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 mx-3">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Upload</h3>
                  <button className="p-1 text-black text-3xl font-semibold" onClick={() => {
                    setImage(null)
                    setShowModal(false)
                  }}>
                    <span className="text-black h-6 w-6 block">×</span>
                  </button>
                </div>
                <div className="relative p-3  mx-5 flex flex-col">
                  <p>Custom tags:</p>
                  <textarea className="w-full p-2 my-2 border-red-700 border-2" />
                  <input className='my-4' type='file' onChange={handlePreview}></input>
                  {image ? 
                    <img src={URL.createObjectURL(image.target.files[0])} width='45%'/> :
                    <p>No image selected.</p>
                  }
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => {
                    setImage(null)
                    setShowModal(false)
                  }}>
                    Close
                  </button>
                  <button className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => {
                    handleImage(image)
                    setShowModal(false)
                  }} disabled={image ? false : true}>
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default Post