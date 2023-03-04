import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Routes/Auth/AuthSlice";
import CharaClasseSlice from "./Routes/CharaClassesPages/CharaClasseSlice";
import CharacterSlice from "./Routes/CharacterPages/CharacterSlice";
import WeaponSlice from "./Routes/WeaponsPage/WeaponSlice";


const store = configureStore({
  reducer:{
    auth:AuthSlice,
    weapons:WeaponSlice,
    charaClasses:CharaClasseSlice,
    characters:CharacterSlice,
  }
})

export default store