import {createSlice} from '@reduxjs/toolkit'

const initialState={
   userId:null,
   id:"",
   title:'',
}

const asyncuserdataSlice=createSlice({
    name:"asyncuserdata",
    initialState,
    reducers:{

        settodo:(state,action)=>{
      state.userId = action.payload.userId
      state.id = action.payload.id
      state.title = action.payload.title
        }
        
    }
})

export default asyncuserdataSlice.reducer;
export const {settodo}=asyncuserdataSlice.actions;


// https://jsonplaceholder.typicode.com/todos/1 {
//   "userId": 1,
//   "id": 1,
//   "title": "delectus aut autem",
//   "completed": false
// }

/// centralizion data ke use hota hae redux 

//  loadcard:(state,action)=>{------------->|\
//          state.carts=action.payload;---->| |----> ESE HAM ACATION BOLTE HAE 
//         }------------------------------->|/