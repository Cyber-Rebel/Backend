import React from 'react'
import { useSelector } from 'react-redux'

const SysncData = () => {
    const data = useSelector(state=>state)
    console.log(data.couter) // esay liye acess able kidar bhi 
  return (
    <div>SysncData</div>
  )
}

export default SysncData
