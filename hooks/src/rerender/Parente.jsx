import React, { useCallback, useState } from 'react'
import Child from './Child.jsx'

const Parente = () => {
    const [add,setadd] = useState(0)
    const [sub,setsub] = useState(99)
    const ingredient = useCallback(()=>{
        console.log("ingredient function called");
    }, [sub])
    // [ sub ] ese tabhi ingredient function call hoga jab sub change hoga
  return (
    <div>
        <button onClick={() => setadd(add + 1)}>{add}</button>
        {/* <Child  /> export default React.memo(Child)  usefull hoga kyu ki paranterm me koi data nahi to useMemon ko use kar sakte ho    */}
        {/* hamre app me kkoi change to to child ko bhi re-render hona pad raha hae jab bhi state change hota hae  tab  */}
        {/* jab bhi state change to ui me change ho rah hae and ui change hone se  child component bhi re-render ho raha hae */}
        <Child ing={ingredient} />
        <button onClick={()=>setsub(sub-1)}>{sub}</button>
        {/* hame useCallback ka use karna hoga ese liye ap re-render nahi hog jab appn app dependcy [ ] ese pass jab change hone pa componte render ho u */}
        {/* ab jab bhi parent me state change hoga to child component re-render nahi hoga  */}
        {/* kyu ki ab child component me koi props change nahi ho raha hae   sir  export default React.memo(Child)   ese kam nahi chalega aame useCallbacke ka use karna hoga */}
    </div>
  )
}

export default Parente
// React.memo jab unwanted componte re render hone se bacha ne ke liye use karte hae
// callback  and unwanted funcation calling se on componte ko bacha ne ke liye use karte hae rok rok raha hae hamra callback
//  super Power = useCallback + React.memo 