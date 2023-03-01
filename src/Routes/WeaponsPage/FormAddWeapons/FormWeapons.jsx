import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { AddWeapons, EditWeapons, SuprWeapons } from "../WeaponSlice"


export const FormWeapons=()=>{

  const dispatch=useDispatch()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const mode = searchParams.get('mode')
  const { id } = useParams()

  const nameRef= useRef()
  const selectDiceRef=useRef()
  const damageTypeRef=useRef()

  const weapons = useSelector(state=>state.weapons.weapons)
  let weaponsTarget={name:"",selectDice:"",damageType:""}
  
  if(mode !== "Add"){
    weaponsTarget = weapons.find(weapon=>weapon.id === id)
  }



  const onSubmitHanler=async (e)=>{
    e.preventDefault()

    const weapon = {
      name: nameRef.current.value,
      selectDice: selectDiceRef.current.value,
      damageType: damageTypeRef.current.value
    }
    if(mode==="Add"){
      await dispatch(AddWeapons(weapon))
    }
    else if(mode==="Edit"){
      await dispatch(EditWeapons({id:weaponsTarget.id,...weapon}))
    }
    else{
      await dispatch(SuprWeapons(weaponsTarget.id))
    }
    navigate('/weapons')
  }

  return(
    <form className="FormWeapon" onSubmit={onSubmitHanler}>
      <h2>Add A Weapon </h2>
      <hr />
      <label htmlFor="Name">Weapon Name :</label>
      <input type="text" id="Name" ref={nameRef} defaultValue={mode === "Add"?"":weaponsTarget?weaponsTarget.name:""} disabled={mode === "Supr"?true:false}/>

      <label htmlFor="SelectDice">SelectDice :</label>
      <select name="SelectDice" id="SelectDice" ref={selectDiceRef} defaultValue={mode==="Add"?"":weaponsTarget?weaponsTarget.selectDice:""} disabled={mode === "Supr"?true:false}>
        <option value="4">D4</option>
        <option value="6">D6</option>
        <option value="8">D8</option>
        <option value="10">D10</option>
        <option value="12">D12</option>
        <option value="20">D20</option>
        <option value="100">D100</option>
      </select>

      <label htmlFor="DamageType">Damage type :</label>
      <select name="DamageType" id="DamageType" ref={damageTypeRef} defaultValue={mode==="Add"?"":weaponsTarget?weaponsTarget.damageType:""} disabled={mode === "Supr"?true:false}>
        <optgroup label="Physical Damage">
          <option value="bludgeoning">bludgeoning</option>
          <option value="piercing">piercing</option>
          <option value="slashing">slashing</option>
        </optgroup>
        <optgroup label="Elemental Damage">
          <option value="cold">cold</option>
          <option value="fire">fire</option>
          <option value="lightning">lightning</option>
        </optgroup>
        <optgroup label="Magical Damage">
          <option value="necrotic">necrotic</option>
          <option value="acid">acid</option>
          <option value="poison">poison</option>
          <option value="psychic">psychic</option>
          <option value="force">force</option>
          <option value="radiant">radiant</option>
        </optgroup>
      </select>
      <div className="FormWeaponButtonContainer">
        <button className={`Form${mode}`}>{mode}</button>
      </div>
    </form>
  )
}