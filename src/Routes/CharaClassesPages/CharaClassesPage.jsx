import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FetchCharClass } from "./CharaClasseSlice"
import { CharaClassesDisplay } from "./CharaClassesDisplay/CharaClassesDisplay"
import "./CharaClasses.css"

export const CharaClassesPage=()=>{

  const dispatch=useDispatch()
  const CharaClasses = useSelector(state=>state.charaClasses.charaClasses)

  useEffect(()=>{
    dispatch(FetchCharClass())
  },[dispatch])

  //ajouter la gestion du form edit et du form supr 

  return(
    <div className="CharaClassContainer">
      <div className="CharaClassContainerHeader">
        <h2>Classes</h2>
        <Link className="LinkCharaClasses" to="/characlasses/Add?mode=Add"><img className="imgSvg" src="https://icons.getbootstrap.com/assets/icons/plus-circle.svg" alt="plus" />  Add</Link>
      </div>
      <hr />
      {
        CharaClasses&& CharaClasses.map(charaClasse=><CharaClassesDisplay key={charaClasse.id} id={charaClasse.id}/>)
      }
    </div>
  )
}