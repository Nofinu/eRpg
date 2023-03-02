import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./CharactersPage.css"

export const CharactersPage =()=>{

  const user=useSelector(state=>state.auth.user)

  return(
    <div className="CharacterContainer">
      <div className="CharacterContainerHeader">
        <h2>Characters</h2>
        {
        user&&<Link className="LinkCharacters" to="/characters/Add?mode=Add"><img className="imgSvg" src="https://icons.getbootstrap.com/assets/icons/plus-circle.svg" alt="plus" /> Add</Link>
        }
      </div>
      <hr />
    </div>
  )
}