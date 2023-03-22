import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { AddCharaClass, EditCharaClasses, SuprCharaClasse } from "../CharaClasseSlice"
import "./FormCharaClasses.css"

export const FormCharaClasses=()=>{

  const dispatch=useDispatch()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const mode = searchParams.get('mode')
  const { id } = useParams()

  const CharaClasseTarget  = useSelector(state=>state.charaClasses.charaClasses).find(charaClasse=>charaClasse.id === id)

  const hitDiceRef=useRef()
  const nameRef=useRef()
  const ClassPointRef = useRef()

  const onSubmitHandler=async (e)=>{
    e.preventDefault()

    const CharaClasse={
      name: nameRef.current.value,
      hitDice: hitDiceRef.current.value,
      classPoint: ClassPointRef.current.value
    }
    
    if(mode==="Add"){
      await dispatch(AddCharaClass(CharaClasse))
    }
    else if(mode==="Edit"){
      await dispatch(EditCharaClasses({id:CharaClasseTarget.id,...CharaClasse}))
    }
    else{
      await dispatch(SuprCharaClasse(CharaClasseTarget.id))
    }
    navigate("/characlasses")
  }

  return(
    <form onSubmit={onSubmitHandler} className="FormCharaClasses">
      <h2>Add</h2>
      <hr />
      <label htmlFor="name">Name :</label>
      <input id="name"type="text" ref={nameRef} defaultValue={mode ==="Add"?"":CharaClasseTarget.name} disabled={mode === "Supr"?true:false}/>

      <label htmlFor="HitDice">HitDice :</label>
      <select name="HitDice" id="HitDice" ref={hitDiceRef} defaultValue={mode==="Add"?"":CharaClasseTarget.hitDice} disabled={mode === "Supr"?true:false}>
        <option value="4">D4</option>
        <option value="6">D6</option>
        <option value="8">D8</option>
        <option value="10">D10</option>
        <option value="12">D12</option>
        <option value="20">D20</option>
      </select>

      <label htmlFor="ClassePoints">Class Points :</label>
      <input type="number" name="ClassePoints" id="ClassePoints" ref={ClassPointRef} defaultValue={mode==="Add"?"":CharaClasseTarget.classPoint} disabled={mode === "Supr"?true:false}/>
      <div className="FormCharaClassBtnContainer">
        <button>Send</button>
      </div>
    </form>
  )
}