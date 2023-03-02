import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useSelector } from "react-redux"


export const FormSelectWeapons =(props)=>{

  const WeaponsList=useSelector(state=>state.weapons.weapons)
  const [isLoad,setIsLoad]=useState(false)

  useEffect(()=>{
    setIsLoad(true)
  },[isLoad])

  return(
    <div className="characterSelectWeaponContainer">
    <select id={`select${props.id}`} className="characterSelectWeapon">
      <option value="">Select a Weapon</option>
      <optgroup id={`${props.id}bludgeoning`} label="bludgeoning"></optgroup>
      <optgroup id={`${props.id}piercing`} label="piercing"></optgroup>
      <optgroup id={`${props.id}slashing`} label="slashing"></optgroup>
      <optgroup id={`${props.id}cold`} label="cold"></optgroup>
      <optgroup id={`${props.id}fire`} label="fire"></optgroup>
      <optgroup id={`${props.id}lightning`} label="lightning"></optgroup>
      <optgroup id={`${props.id}necrotic`} label="necrotic"></optgroup>
      <optgroup id={`${props.id}acid`} label="acid"></optgroup>
      <optgroup id={`${props.id}poison`} label="poison"></optgroup>
      <optgroup id={`${props.id}psychic`} label="psychic"></optgroup>
      <optgroup id={`${props.id}force`} label="force"></optgroup>
      <optgroup id={`${props.id}radiant`} label="radiant"></optgroup>
      {
        isLoad&& WeaponsList.map(weapon=>createPortal(<option key={weapon.id} value={weapon.name}>{weapon.name} D{weapon.selectDice}</option>,document.getElementById(`${props.id}${weapon.damageType}`)))
      }
    </select>
    <button onClick={()=>props.onClickSuprWeaponHandler(props.id)} type="button"><img className="imgSvgSupr" src="https://icons.getbootstrap.com/assets/icons/trash-fill.svg" alt="plus" /></button>
  </div>

  )
}