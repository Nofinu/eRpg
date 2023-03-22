import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UrlDb } from "../../AccesApi";


export const AddCharacter = createAsyncThunk(
  "characters/AddCharacter",
  async (characterValue,{getState})=>{
    const token = getState().auth.user.idToken
    if(token){
      const response = await fetch(`${UrlDb}/characters.json?auth=${token}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(characterValue)
      })
      if(!response){
        throw new Error("Error when adding a character!")
      }

      const data = await response.json()

      return {id:data.name, ...characterValue}
    }
  }
)

export const FetchCharacters = createAsyncThunk(
  "weapons/FetchWeapons",
  async ()=>{
    const response = await fetch(`${UrlDb}characters.json`)

    if(!response.ok){
      throw new Error("Error when fetching characters")
    }

    const data = await response.json()
    const tmpTab=[]
    for(let key in data){
      tmpTab.push({id:key,...data[key]})
    }

    return tmpTab
  }
)

export const SuprCharacters = createAsyncThunk(
  "Characters/SuprCharacters",
  async (id,{getState})=>{
    const token = getState().auth.user.idToken
    const response = await fetch(`${UrlDb}/characters/${id}.json?auth=${token}`,{
      method:"DELETE"
    })
    if(!response.ok){
      throw new Error("Error during the deletion of the weapon")
    }

    return id
  }
)

const CharacterSlice = createSlice({
  name:"CharacterSlice",
  initialState:{
    characters:[]
  },
  extraReducers:(builder)=>{
  builder.addCase(AddCharacter.fulfilled,(state,action)=>{
    state.characters.push(action.payload)
    state.characters = [...state.characters].sort((a,b)=>a.name.localeCompare(b.name))
  })
  builder.addCase(FetchCharacters.fulfilled,(state,action)=>{
    state.characters=[...action.payload].sort((a,b)=>a.name.localeCompare(b.name))
  })
  builder.addCase(SuprCharacters.fulfilled, (state, action) => {
    const characterFound = state.characters.find(a => a.id === action.payload)
    if (characterFound) {
      state.characters = [...state.characters.filter(a => a !== characterFound)].sort((a,b)=>a.name.localeCompare(b.name))
    }
  })
  }
})

export default CharacterSlice.reducer