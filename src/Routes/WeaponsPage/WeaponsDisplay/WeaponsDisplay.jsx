import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./WeaponsDisplay.css"

export const WeaponsDisplay =(props)=>{

  const weaponTarget = useSelector(state=>state.weapons.weapons).find(weapon=>weapon.id === props.id)

  return(
    <div className={`divWeaponDisplay ${weaponTarget.damageType}`}>
      <div className="divWeaponDisplayHeader">
        <h2>{weaponTarget.name}</h2>
        <div>
          <Link className="LinkWeapons EditLink" to={`/weapons/${weaponTarget.id}?mode=Edit`}> <img className="imgSvgEdit" src="https://icons.getbootstrap.com/assets/icons/pencil-square.svg" alt="plus" /> Edit</Link>
          <Link className="LinkWeapons SuprLink" to={`/weapons/${weaponTarget.id}?mode=Supr`}> <img className="imgSvgSupr" src="https://icons.getbootstrap.com/assets/icons/trash-fill.svg" alt="plus" />Supr</Link>
        </div>
          
      </div>
      <hr />
      <p>Dice type: <b>D{weaponTarget.selectDice}</b></p>
      <p>Damage Type: <b>{weaponTarget.damageType}</b></p>
    </div>
  )
}