import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Notfound from './pages/Notfound.jsx'
import Authwapper from './context/AuthWallper.jsx'
import { useSelector } from 'react-redux'

const AppRoutes = () => {


    
    return (

            <Routes>
                <Route path='/' element={
                    <Authwapper  mode="auth" >
                    <Home />
                     </Authwapper>
                     }
                    />
                     
                      
                <Route path='/register' element={
                    <Authwapper mode="guest">
                    
                    
                    <Register />
                     </Authwapper>

                    } />
                <Route path='/login' element={
                    <Authwapper mode="guest">

                    <Login />
                 </Authwapper>


                    } />
                      <Route path='*' element={
                        <Notfound/>

                    } />
            </Routes>
    )
}

export default AppRoutes