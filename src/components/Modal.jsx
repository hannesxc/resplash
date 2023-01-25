import { useState, useEffect, useContext } from "react";
import { PropsContext } from "../contexts/PropsContext";

function Modal() {

  const [ showModal, setShowModal ] = useState(false)
  const { image, setImage } = useContext(PropsContext)
  const [ downloadURL, setDownloadURL ] = useState("")
  
  useEffect(() => {
    if (image) {
      setShowModal(true)
    }
  }, [image])

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
                  <button className="p-1" onClick={() => {
                    setImage(null)
                    setShowModal(false)
                  }}>
                    <span className="text-black h-6 w-6 block">×</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <img src={image.url} alt='Image' width='100%' />
                </div>
                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  <p>Created: {image.created.slice(0, image.created.indexOf('T'))}</p>
                  <p>Size: {image.size / 1000} KB</p>
                  <button className="p-1" onClick={handleDownload}>
                    <a href={downloadURL} download={image.name}>
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