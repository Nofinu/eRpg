import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UrlDb } from "../../AccesApi";


export const AddCharaClass = createAsyncThunk(
  "CharaClasse/AddCharClass",
  async(charaClasseValue,{getState})=>{
    const token = getState().auth.user.idToken
    if(token){
      const response = await fetch(`${UrlDb}CharaClasses.json?auth=${token}`,{
        method:"POST",
        Headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(charaClasseValue)
      })

      if(!response.ok){
        throw new Error("Error when adding a CharaClasse")
      }

      const data = await response.json()
      return {id:data.name,...charaClasseValue}
    }
  }
)

export const FetchCharClass=createAsyncThunk(
  "CharaClasse/FetchCharClass",
  async ()=>{
    const response = await fetch(`${UrlDb}CharaClasses.json`)
    
    if(!response.ok){
      throw new Error("Error when fetching CharaClasses")
    }

    const data = await response.json()
    const tmpTab=[]
    for(let key in data){
      tmpTab.push({id:key,...data[key]})
    }
    return tmpTab
  }
)

const CharaClasseSlice = createSlice({
  name:"ClasseSlice",
  initialState:{
    charaClasses:[]
  },
  reducers:{

  },

  extraReducers:(builder)=>{
    builder.addCase(AddCharaClass.fulfilled,(state,action)=>{
      state.charaClasses.push(action.payload)
      state.charaClasses=[...state.charaClasses].sort((a,b)=>a.name.localeCompare(b.name))
    })

    builder.addCase(FetchCharClass.fulfilled,(state,action)=>{
      state.charaClasses=[...action.payload].sort((a,b)=>a.name.localeCompare(b.name))
    })
  }
})

export default CharaClasseSlice.reducer