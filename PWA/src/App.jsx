import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    // Check already installed
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone;

    if (isStandalone) {
      setInstalled(true);
    }

    // Event for install prompt showing
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // Event fired when installation completes
    window.addEventListener('appinstalled', () => {
      console.log('App installed!')
      setInstalled(true)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()

    deferredPrompt.userChoice.then((result) => {
      if (result.outcome === 'accepted') {
        console.log("User installed the app")
      }
    })
  }

  return (
    <div className="App">
      <h1>My PWA App</h1>

      {!installed && deferredPrompt ? (
        <button onClick={handleInstallClick}>
          Download App
        </button>
      ):<div>installed cheakout</div>} 

      {installed && (
        <p style={{color: 'green', fontWeight: 'bold'}}>Install Complete ✓</p>
      )}
    </div>
  )
}

export default App
