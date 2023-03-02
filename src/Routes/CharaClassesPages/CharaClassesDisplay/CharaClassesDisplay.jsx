import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./CharaClassesDisplay.css"


export const CharaClassesDisplay =(props)=>{

  const CharaClasseTarget  = useSelector(state=>state.charaClasses.charaClasses).find(charaClasse=>charaClasse.id === props.id)
  const user=useSelector(state=>state.auth.user)

  return(
    <div className="divCharaClasseDisplay">
      <div className="divCharaClasseDisplayHeader">
        <h2>{CharaClasseTarget.name}</h2>
        <div>
          {
            user&&<>
              <Link className="LinkWeapons EditLink" to={`/characlasses/${CharaClasseTarget.id}?mode=Edit`}> <img className="imgSvgEdit" src="https://icons.getbootstrap.com/assets/icons/pencil-square.svg" alt="plus" /> Edit</Link>
              <Link className="LinkWeapons SuprLink" to={`/characlasses/${CharaClasseTarget.id}?mode=Supr`}> <img className="imgSvgSupr" src="https://icons.getbootstrap.com/assets/icons/trash-fill.svg" alt="plus" />Supr</Link>
            </>
          }
        </div>
      </div>
        <hr />
        <p>Hit Dice : <b>D{CharaClasseTarget.hitDice}</b></p>
        <p>Class Points : <b>{CharaClasseTarget.classPoint} points</b></p>
    </div>
  )
}