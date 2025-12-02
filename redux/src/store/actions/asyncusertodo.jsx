// why we fucation ke andar kyu hae js file compontensnahi hae tum dispatch import kar lo ese liye 
// esa karna padta nad ese second paramerte hame do chiye milte hae dispatch and    
import axios from "axios"
import { settodo } from "../Sliceredcuers/asyncuserdataSlice"

export const asyncusertodo = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1")
    console.log(res.data)   // ✅ data response hota hai

    dispatch(settodo({
      userId: res.data.userId,
      id: res.data.id,
      title: res.data.title
    }))
  }
  catch (err) {
    console.log(err)
  }
}