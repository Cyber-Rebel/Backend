import axios from 'axios'
import { setUser, clearUser } from '../Sliceredcuers/userSlice.jsx'

// ✅ Login
export const asyncuserlogin = (user) => async (dispatch, getState) => {
  try {
    console.log(user)
    const res = await axios.post("http://localhost:3000/api/auth/login", user,{withCredentials:true})
    console.log("Login Response:", res.data)

    dispatch(setUser({
      isAuthenticated: true,
      token:res.data.user.token,
      id: res.data.user.id,
      name: res.data.user.firstNameName,
      email: res.data.user.email,
    //   avatar: res.data.avatar,
    //   role: res.data.role,
    }))

    // optional:  save
    localStorage.setItem("token",true);

  } catch (err) {
    console.log("Login Error:", err)
  }
}

// ✅ Register (same style as login)
export const asyncUserRegister = (user) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:3000/register", user)
    console.log("Register Response:", res.data)

    dispatch(setUser({
      isAuthenticated: res.data.isAuthenticated,
      token: res.data.token,
      id: res.data.id,
      name: res.data.name,
      email: res.data.email,
      avatar: res.data.avatar,
      role: res.data.role,
    }))

    // optional: token save
    localStorage.setItem("token", res.data.token);

  } catch (err) {
    console.error("Register Error:", err)
  }
}

// ✅ Logout
export const asyncUserLogout = () => async (dispatch) => {
  try {
    await axios.post("http://localhost:3000/logout")

    dispatch(clearUser())
    localStorage.removeItem("token")

  } catch (err) {
    console.error("Logout Error:", err)
  }
}
