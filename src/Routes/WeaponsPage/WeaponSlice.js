import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


export const AddWeapons = createAsyncThunk(
  "Weapons/AddWeapons"
  async (credentials)=>{
    const user = useSelector(state => state.auth.user)
    const token = user.idToken
    const response = await fetch(`${URL_DB}weapons.json?auth=${token}`)
  }
)

const WeaponSlice = createSlice({
  name:"WeaponSlice",
  initialState:{
    weapons:[]
  },
  reducers:{

  }
})


export default WeaponSlice.reducer
