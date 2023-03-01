import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { AddCharaClass } from "../CharaClasseSlice"
import "./FormCharaClasses.css"

export const FormCharaClasses=()=>{

  const dispatch=useDispatch()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const mode = searchParams.get('mode')
  // const { id } = useParams()

  const hitDiceRef=useRef()
  const nameRef=useRef()

  const onSubmitHandler=(e)=>{
    e.preventDefault()

    const CharaClass={
      name: nameRef.current.value,
      hitDice: hitDiceRef.current.value
    }
    
    if(mode==="Add"){
      dispatch(AddCharaClass(CharaClass))
    }
    navigate("/characlasses")
  }

  return(
    <form onSubmit={onSubmitHandler} className="FormCharaClasses">
      <h2>Add</h2>
      <hr />
      <label htmlFor="name">Name :</label>
      <input id="name"type="text" ref={nameRef}/>

      <label htmlFor="HitDice">HitDice :</label>
      <select name="HitDice" id="HitDice" ref={hitDiceRef}>
        <option value="4">D4</option>
        <option value="6">D6</option>
        <option value="8">D8</option>
        <option value="10">D10</option>
        <option value="12">D12</option>
        <option value="20">D20</option>
      </select>
      <button>Send</button>
    </form>
  )
}