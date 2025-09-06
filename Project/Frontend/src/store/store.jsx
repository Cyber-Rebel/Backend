  import { configureStore } from '@reduxjs/toolkit'
  import userSlice from './Sliceredcuers/userSlice.jsx'
import chatSlice from './chatSlice.jsx'
  export const store = configureStore({
    reducer: {
  user:userSlice,
  chat:chatSlice
    },
  })

