import { useDispatch, useSelector } from "react-redux"
import "./DisplayCharacters.css"
import DefaultUrl from "../../../asset/img/unknown_character.jpeg"
import { SuprCharacters } from "../CharacterSlice"


export const DisplayCharacters =(props)=>{

  const dispatch = useDispatch()

  const characterFound = useSelector(state=>state.characters.characters).find(character => character.id === props.id)
  const user = useSelector(state=>state.auth.user)

  const SuprCharacterHandler=()=>{
    if(window.confirm("voulez vous suprimer le personnage : " +characterFound.name)){
      dispatch(SuprCharacters(characterFound.id))
    }
  }

  return(
    <div className="divDisplayCharacter">
      <div className="DisplayCharacterHeader">
        <h2>{characterFound.name}</h2>
        <div>
          {
              user&&<>
                <button className="LinkCharacterDIsplay SuprBtn" onClick={SuprCharacterHandler}> <img className="imgSvgSupr" src="https://icons.getbootstrap.com/assets/icons/trash-fill.svg" alt="plus" />Supr</button>
              </>
            }
        </div>
      </div>
      <hr />
      <div className="divDisplayCharacterInfo">
        <img className="imgCharacterDisplay" src={characterFound.avatarUrl? characterFound.avatarUrl : DefaultUrl} alt="" />
        <table  key={characterFound.id+1}>
            <tbody>
              {
                characterFound && 
                <>
                  <tr><td>level : </td><td>{characterFound.currentLevel} </td></tr>
                  <tr><td>Xp : </td><td>{characterFound.currentXP}</td></tr>
                  <tr><td>Hp : </td><td>{characterFound.currentHP}/{characterFound.maxHP}</td></tr>
                  <tr><td>Ac : </td><td>{characterFound.finalAC} </td></tr>
                </>
              }
            </tbody>
        </table>
        <table key={characterFound.id+2}>
          <tbody>
            {
              characterFound.stats&& characterFound.stats.map(stat=><tr key={stat.id}><td >{stat.name} :</td><td>{stat.value}</td></tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}