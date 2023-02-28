import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignIn_Url, SignUp_Url } from "../../AccesApi";

export const signIn= createAsyncThunk(
  "auth/signIn",
  async (credentials)=>{
    const response = await fetch(SignIn_Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      throw new Error("Erreur lors de l'authentification !")
    }

    const data = await response.json()

    return data
  }
)

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials) => {
    const response = await fetch(SignUp_Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      throw new Error("Erreur lors de l'authentification !")
    }

    const data = await response.json()

    return data
  }
)

const AuthSlice= createSlice({
  name:"AuthSlice",
  initialState:{
    user:null,
    isLoading:false,
    error:null
  },
  reducers:{
    removeUser(state) {
      state.user = null
      localStorage.removeItem('token')
    }
  },
  extraReducers: (builder) => {

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      localStorage.setItem('token', action.payload.idToken)
    })
    // builder.addCase(signIn.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.error = action.payload
    //   console.error(state.error)
    // })

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      localStorage.setItem('token', action.payload.idToken)
    })

    // builder.addCase(signUp.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.error = action.payload
    //   console.error(state.error)
    // })
  }
})

export const {removeUser}=AuthSlice.actions

export default AuthSlice.reducer