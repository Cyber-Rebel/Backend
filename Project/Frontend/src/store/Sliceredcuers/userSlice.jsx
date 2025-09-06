import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
  isAuthenticated: false,
  token: "",
  id: null,
  name: "",
  email: "",
  // avatar: "",
  // role: "user"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ✅ User login/set
    setUser: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      // state.avatar = action.payload.avatar;
      // state.role = action.payload.role;
    },

    // ✅ User logout/clear
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.id = null;
      state.name = "";
      state.email = "";
      // state.avatar = "";
      // state.role = "user";
    }
  }
});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;

// reducer se data centrazaiont hota hae 