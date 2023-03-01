import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Routes/Auth/AuthSlice";
import WeaponSlice from "./Routes/WeaponsPage/WeaponSlice";


const store = configureStore({
  reducer:{
    auth:AuthSlice,
    weapons:WeaponSlice
  }
})

export default store