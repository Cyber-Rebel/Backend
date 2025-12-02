import {createSlice} from '@reduxjs/toolkit'

const initialState={
     isAuthration:false,
     token:null,
     username:""
}

const couterSlice=createSlice({
    name:"asyncuserdata",
    initialState,
    reducers:{

        datachange:(state,action)=>{
  state.isAuthration = action.payload.isAuthration
      state.token = action.payload.token
      state.username = action.payload.username
        }
        
    }
})

export default couterSlice.reducer;
export const {datachange}=couterSlice.actions;

// sync data change first