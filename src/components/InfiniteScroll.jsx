import { useState, useContext, useEffect } from 'react'
import { PropsContext } from '../contexts/PropsContext'
import DisplayImages from './DisplayImages'

const ITEMS_PER_PAGE = 6

function InfiniteScrollPagination() {

  const [ currentSlice, setCurrentSlice ] = useState([])
  const [ sliceStart, setSliceStart ] = useState(6)
  const { images } = useContext(PropsContext)
  
  useEffect(() => {
    setCurrentSlice(images.slice(0, ITEMS_PER_PAGE))
  }, [images])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
    
    if (sliceStart + ITEMS_PER_PAGE > images.length) {
      setCurrentSlice(images)
    } else {
      setSliceStart(sliceStart + ITEMS_PER_PAGE)
      setCurrentSlice(images.slice(0, sliceStart + ITEMS_PER_PAGE))
    }
  }

  return (
    <DisplayImages data={currentSlice} />
  )
}

export default InfiniteScrollPagination
