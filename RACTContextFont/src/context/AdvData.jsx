import React from 'react'
import { createContext } from 'react'

export const  advData = createContext(null)// defaule null hoti ni chaiye 

let advobj = {
  name:"Nilesh ",
  age:20,
  gender:"male"
}
const AdvData = (props) => {
return (
    <advData.Provider value={advobj}>

{props.children}
    </advData.Provider>
    
  )
}

export default AdvData