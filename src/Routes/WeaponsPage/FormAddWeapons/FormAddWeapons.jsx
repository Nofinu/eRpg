import { useRef } from "react"
import { useNavigate } from "react-router-dom"


export const FormAddWeapons=()=>{

  const nameRef= useRef()
  const selectDiceRef=useRef()
  const damageTypeRef=useRef()

  const navigate = useNavigate()

  const onSubmitHanler=(e)=>{
    e.preventDefault()

    const weapon = {
      name: nameRef.current.value,
      selectDice: selectDiceRef.current.value,
      damageType: damageTypeRef.current.value
    }

    navigate('/weapons')
  }

  return(
    <form className="FormWeapon" onSubmit={onSubmitHanler}>
      <h2>Add A Weapon </h2>
      <hr />
      <label htmlFor="Name">Weapon Name :</label>
      <input type="text" id="Name" ref={nameRef}/>

      <label htmlFor="SelectDice">SelectDice :</label>
      <select name="SelectDice" id="SelectDice" ref={selectDiceRef}>
        <option value="4">d4</option>
        <option value="6">d6</option>
        <option value="8">d8</option>
        <option value="10">d10</option>
        <option value="12">d12</option>
      </select>

      <label htmlFor="DamageType">Damage type :</label>
      <select name="DamageType" id="DamageType" ref={damageTypeRef}>
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
      <button>Add</button>
    </form>
  )
}