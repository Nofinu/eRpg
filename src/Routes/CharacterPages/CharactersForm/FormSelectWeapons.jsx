import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useSelector } from "react-redux"


export const FormSelectWeapons =(props)=>{

  const WeaponsList=useSelector(state=>state.weapons.weapons)

  // useEffect(()=>{
  
  //   WeaponsList.forEach(weapon => {
  //     const id=`${props.id}${weapon.damageType}`
  //     console.log("testid",id === `${props.id}piercing`)
  //     createPortal(<option value={weapon.name}><b>{weapon.name}</b>  <b>D{weapon.selectDice}</b></option>,document.getElementById(id))
  //   });
  // },[])

  return(
    <div>
      <select name="FormWeapons">
      {/* <optgroup id={`${props.id}bludgeoning`} label="bludgeoning"></optgroup>
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
      <optgroup id={`${props.id}radiant`} label="radiant"></optgroup> */}
      {
        WeaponsList&& WeaponsList.map(weapon=><option key={weapon.id}><b>{weapon.name}</b> <b>D{weapon.selectDice}</b></option>)
      }
      </select>
    </div>
  )
}