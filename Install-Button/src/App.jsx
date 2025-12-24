import { useEffect, useState } from 'react'
import './App.css'
import InstallApp from './install/Install.jsx'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js");
      });
    }
  },[])

  return (
    <>
  <InstallApp/>
    </>
  )
}

export default App
