import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FetchCharacters } from "./CharacterSlice"
import "./CharactersPage.css"
import { DisplayCharacters } from "./DisplayCharacters/DisplayCharacters"

export const CharactersPage =()=>{

  const dispatch =  useDispatch()

  const user=useSelector(state=>state.auth.user)
  const characters = useSelector(state=> state.characters.characters)
  console.log(characters)

  useEffect(()=>{
    dispatch(FetchCharacters())
  },[])

  return(
    <div className="CharacterContainer">
      <div className="CharacterContainerHeader">
        <h2>Characters</h2>
        {
        user&&<Link className="LinkCharacters" to="/characters/Add?mode=Add"><img className="imgSvg" src="https://icons.getbootstrap.com/assets/icons/plus-circle.svg" alt="plus" /> Add</Link>
        }
      </div>
      <hr />
      {
        characters&& characters.map(character => <DisplayCharacters key={character.id} id={character.id}/>)
      }
    </div>
  )
}