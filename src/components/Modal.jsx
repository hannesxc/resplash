import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { db } from "../config";
import { AuthContext } from "../contexts/AuthContext";
import { PropsContext } from "../contexts/PropsContext";

function Modal() {

  const [ showModal, setShowModal ] = useState(false)
  const { image, setImage } = useContext(PropsContext)
  const { user } = useContext(AuthContext)
  const [ like, setLike ] = useState(false)
  const [ downloadURL, setDownloadURL ] = useState("")

  useEffect(() => {
    if (image) {
      handleLikes()
      setShowModal(true)
    }
  }, [image])

  useEffect(() => {
    handleCurrentLike()
  }, [like])

  const handleLikes = async () => {
    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists() && docSnap.data().likes.length) {
      docSnap.data().likes.forEach( img => {
        if (img.name === image.name) {
          setLike(true)
        }
      })
    }
  }

  const handleCurrentLike = async () => {
    const docRef = doc(db, 'users', user.uid)
    if (like) {
      await updateDoc(docRef, {
        likes: arrayUnion(image)
      })
    } else {
      await updateDoc(docRef, {
        likes: arrayRemove(image)
      })
    }
  }

  const handleDownload = async () => {
    const result = await fetch(image.url, {
      method: "GET",
      headers: {},
    })
    const blob = await result.blob()
    const url = URL.createObjectURL(blob)
    setDownloadURL(url)
  }

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex mx-3 fixed inset-0 z-50">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">{image.name.slice(0, image.name.indexOf('.'))}</h3>
                  <div>
                    <button className="px-10" title="Like" type="button" onClick={() => setLike(!like)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill={like ? "red" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                    <button className="p-1" title="Close" type="button" onClick={() => {
                      setImage(null)
                      setShowModal(false)
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="relative p-6 flex-auto">
                  <img src={image.url} alt='Image' width='100%' />
                </div>
                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  <div>
                    <p>Uploaded: {image.created.slice(0, image.created.indexOf('T'))}</p>
                    <p className="flex items-center">
                      By: <img className="rounded-full h-10 m-2" src={image.profile} alt="image" />
                      {image.uploadedBy}
                    </p>
                  </div>
                  <p  className="hidden sm:block">Size: {image.size / 1000} KB</p>
                  <button className="p-1" onClick={handleDownload}>
                    <a href={downloadURL} download={image.name} title='Download'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal