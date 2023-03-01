import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./WeaponsDisplay.css"

export const WeaponsDisplay =(props)=>{

  const weapons = useSelector(state=>state.weapons.weapons)
  const weaponTarget = weapons.find(weapon=>weapon.id === props.id)

  return(
    <div className="divWeaponDisplay">
      <div className="divWeaponDisplayHeader">
        <h2>{weaponTarget.name}</h2>
        <div>
          <Link className="LinkWeapons EditLink" to={`/weapons/${weaponTarget.id}?mode=Edit`}>Edit</Link>
          <Link className="LinkWeapons SuprLink" to={`/weapons/${weaponTarget.id}?mode=Supr`} >Supr</Link>
        </div>
          
      </div>
      <hr />
      <p>Dice type: <b>D{weaponTarget.selectDice}</b></p>
      <p>Damage Type: <b>{weaponTarget.damageType}</b></p>
    </div>
  )
}