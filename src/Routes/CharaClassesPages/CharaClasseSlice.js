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

export const EditCharaClasses= createAsyncThunk(
  "CharaClasse/EditCharaClasses",
  async({id,...charaClassesValue},{getState})=>{
    const token = getState().auth.user.idToken
    const response = await fetch(`${UrlDb}/CharaClasses/${id}.json?auth=${token}`,{
      method:"PATCH",
      Headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(charaClassesValue)
    })
    if(!response.ok){
      throw new Error("Error When modifing the weapon!")
    }
    const data = await response.json()

    return {id,...data}
  }
)

export const SuprCharaClasse = createAsyncThunk(
  "CharaClasse/SuprCharaClasse",
  async (id,{getState})=>{
    const token = getState().auth.user.idToken
    const response = await fetch(`${UrlDb}/CharaClasses/${id}.json?auth=${token}`,{
      method:"DELETE"
    })
    if(!response.ok){
      throw new Error("Error during the deletion of the weapon")
    }

    return id
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

    builder.addCase(EditCharaClasses.fulfilled, (state, action) => {
      const { id } = action.payload
      const CharaClasseFound = state.charaClasses.find(a => a.id === id)
      if (CharaClasseFound) {
        state.charaClasses = [...state.charaClasses.filter(a => a !== CharaClasseFound), action.payload].sort((a,b)=>a.name.localeCompare(b.name))
      }
    })
    builder.addCase(SuprCharaClasse.fulfilled, (state, action) => {
      const CharaClasseFound = state.charaClasses.find(a => a.id === action.payload)
      if (CharaClasseFound) {
        state.charaClasses = [...state.charaClasses.filter(a => a !== CharaClasseFound)].sort((a,b)=>a.name.localeCompare(b.name))
      }
    })
  }
})

export default CharaClasseSlice.reducer