import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// step 4 : service worker ko register karna
// service worker ko register karne ke liye virtual:pwa-register se import karna hota hei
import { registerSW } from 'virtual:pwa-register'
import App from './App.jsx'
registerSW()
// step 5 : app ka build nikalna npm run build
// agar aap chate ho build code run karna to Terminal me {npm run preview }
// aap apke pass option show hoga
// jab build nikale to dist ke andar ek sw.js file generate hoga jo service worker hota hei

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
