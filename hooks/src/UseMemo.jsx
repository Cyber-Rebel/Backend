import React, { useMemo, useState } from 'react'

const App = () => {
  const [add,setadd] = useState(0)
  const [sub,setsub] = useState(99)
  // whay not useEffect because useEffect ko value return nahi kar sakte  useEffect return nahi karta  useEffect side effect ke liye hota hae 
  // product hame ese fucation chahiye jo value return kare ese liye useMemo ka use karte hae
  const product = useMemo(() =>{
    console.log("product function called");
    return add * 2;
    // here problem is agar + plus prouct fuction call ho rhae hae but - minus pr bhi product function call ho rhae hae  this is problem ese componet kama ka render hota hae 
    // jab ki hae funcation ka nata dur dur sub nahi hae 
    // solution 
    // by defualt apka componet re render hota hae jab bhi state change hota hae  jab tab aap useEffect nahi lagate 
    // componet re render hota hae ese funcation call hota hae
  },[add])
  // ad ese kya on add ke waqt hi product funcation call hoga
  // [ ] me aap dalna ki time tabhi product funcation call hoga jab add change hoga  in case add hone pan 
  // [sub] to sub  tab sub ke time fucnaion chalega 
  return (
    <div>
{/* <h1>hello hi </h1><h1>{product()}</h1>  when use useMemo use karete tab funcation call nahi karte */} 
<h1>hello hi </h1><h1>{product}</h1>  


<button onClick={()=>setadd(add+1)}>+</button><span>{add}</span>
<button onClick={()=>setsub(sub-1)}>-</button><span>{sub}</span>

    </div>
  )
}

export default App
 // useMemo ka use hota hae kisi bhi be falutu na chalaye 
 // product ko mene useMemo me wrap kar diya hae