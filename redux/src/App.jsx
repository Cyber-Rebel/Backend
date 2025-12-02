import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { datachange } from './store/Sliceredcuers/couterSlice.jsx'
import SysncData from './page/SysncData.jsx'
import { asyncusertodo } from './store/actions/asyncusertodo.jsx'

const App = () => {
  const { token, username, isAuthration } = useSelector((state) => state.couter)
  const { userId, id, title } = useSelector((state) => state.asyncuserdata)

  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(datachange({ // store -> se couterSlice beacuse the syncs data change
      isAuthration: true,
      token: "xyz123",
      username: "cyber"
    }))
  }

  useEffect(() => {
    dispatch(asyncusertodo())   // ✅ thunk ko dispatch karna hoga store -> se -> actions[asyncusertodo] --> asyncuserdataSlice tak because data async taha 
  }, [dispatch])

  return (
    <div>
      <h1>Redux Toolkit Example</h1>
      <p>Auth: {isAuthration ? "✅ Logged In" : "❌ Logged Out"}</p>
      <p>Username: {username}</p>
      <p>Token: {token}</p>
      <button onClick={handleLogin}>Login</button>

      <h2>Async Data:</h2>
      <p>UserId: {userId}</p>
      <p>Id: {id}</p>
      <p>Title: {title}</p>

      <SysncData />
    </div>
  )
}

export default App
