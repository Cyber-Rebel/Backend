import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import Data from './context/Data.jsx'
import './index.css'
import AdvData from './context/AdvData.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AdvData>
    <Data>
    <App/>
    </Data>
    </AdvData>
    </BrowserRouter>
  </StrictMode>,
)
// kyu hame redux lana pada context me esi kya kamjori thi ki redux indrocation dena pada 
// ese file ke baat kare to constext bare me 
// to aap AdvData data use Data me to kar sakte ho kyu ki AdvData parenet hae Data ek child hae like props
// But Aapp Data ko AdvData me use nahi kar sakt ese problem hogi error child se parenst data nahi deka ja saktaha 
// eseliye Data ko Centeralizion ke liye hame Redux ko Laya
  //   <AdvData>  
  //   <Data>
  //   <App/>
  //   </Data>
  //   </AdvData>

  // ese mene bola hae ki kase aap apvDAta Data use kar sakhe 