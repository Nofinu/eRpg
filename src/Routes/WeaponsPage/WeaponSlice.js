import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UrlDb } from "../../AccesApi";


export const AddWeapons = createAsyncThunk(
  "weapons/AddWeapons",
  async (weaponValue,{getState})=>{
    const token = getState().auth.user.idToken
    if(token){
      const response = await fetch(`${UrlDb}weapons.json?auth=${token}`,{
        method:"POST",
        Headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(weaponValue)
      })

      if(!response){
        throw new Error("Error when adding a weapon !")
      }

      const data = await response.json()

      return {id:data.name, ...weaponValue}
    }
  }
)

export const FetchWeapons = createAsyncThunk(
  "weapons/FetchWeapons",
  async ()=>{
    const response = await fetch(`${UrlDb}weapons.json`)

    if(!response.ok){
      throw new Error("Error when fetching weapons")
    }

    const data = await response.json()
    const tmpTab=[]
    for(let key in data){
      tmpTab.push({id:key,...data[key]})
    }

    return tmpTab
  }
)

export const EditWeapons= createAsyncThunk(
  "weapons/EditWeapons",
  async({id,...weaponValue},{getState})=>{
    const token = getState().auth.user.idToken
    const response = await fetch(`${UrlDb}/weapons/${id}.json?auth=${token}`,{
      method:"PATCH",
      Headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(weaponValue)
    })
    if(!response.ok){
      throw new Error("Error When modifing the weapon!")
    }
    const data = await response.json()

    return {id,...data}
  }
)

export const SuprWeapons = createAsyncThunk(
  "weapons/SuprWeapons",
  async (id,{getState})=>{
    const token = getState().auth.user.idToken
    const response = await fetch(`${UrlDb}/weapons/${id}.json?auth=${token}`,{
      method:"DELETE"
    })
    if(!response.ok){
      throw new Error("Error during the deletion of the weapon")
    }

    return id
  }
)

const WeaponSlice = createSlice({
  name:"WeaponSlice",
  initialState:{
    weapons:[]
  },
  reducers:{

  },
  extraReducers:(builder)=>{
    builder.addCase(AddWeapons.fulfilled,(state,action)=>{
      state.weapons.push(action.payload)
      state.weapons = [...state.weapons].sort((a,b)=>a.name.localeCompare(b.name))
    })
    builder.addCase(FetchWeapons.fulfilled,(state,action)=>{
      state.weapons=[...action.payload].sort((a,b)=>a.name.localeCompare(b.name))
    })
    builder.addCase(EditWeapons.fulfilled, (state, action) => {
      const { id } = action.payload
      const weaponFound = state.weapons.find(a => a.id === id)
      if (weaponFound) {
        state.weapons = [...state.weapons.filter(a => a !== weaponFound), action.payload].sort((a,b)=>a.name.localeCompare(b.name))
      }
    })
    builder.addCase(SuprWeapons.fulfilled, (state, action) => {
      const weaponFound = state.weapons.find(a => a.id === action.payload)
      if (weaponFound) {
        state.weapons = [...state.weapons.filter(a => a !== weaponFound)].sort((a,b)=>a.name.localeCompare(b.name))
      }
    })

  }
})


export default WeaponSlice.reducer
