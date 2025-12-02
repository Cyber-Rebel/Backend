import { configureStore } from '@reduxjs/toolkit'
import couterSlice from './Sliceredcuers/couterSlice.jsx'
import asyncuserdataSlice from './Sliceredcuers/asyncuserdataSlice.jsx'
export const store = configureStore({
  reducer: {
    couter:couterSlice,
    asyncuserdata:asyncuserdataSlice

  },
})