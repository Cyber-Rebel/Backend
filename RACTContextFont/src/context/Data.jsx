import React from 'react'
import { createContext ,useContext} from 'react'
import { advData } from "./AdvData.jsx";

export const  data = createContext(null)// defaule null hoti ni chaiye 

let obj = {
  name:"akash",
  age:20,
  gender:"male"
}
let ui =<>  <h1 style={{ color: "tomato" }}>🚀 My App Header</h1></>; // Context ke and ui ko render karn page Transtion ke wakt 
const Data = (props) => {
  const info = useContext(advData);
  console.warn('This Data From Parente Context')
  console.log("AdvData called:-",info)
return (
    // <data.Provider value={obj}> // Part-1
    <data.Provider value={[obj,ui]}>

{props.children}
    </data.Provider>
    
  )
}

export default Data

// do baar render matlb StickMood