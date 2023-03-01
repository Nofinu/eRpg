import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {FetchWeapons} from "./WeaponSlice"
import "./Weapons.css"
import { WeaponsDisplay } from "./WeaponsDisplay/WeaponsDisplay"


export const WeaponsPage=()=>{

  const dispatch=useDispatch()

  const weapons = useSelector(state=>state.weapons.weapons)


  useEffect(()=>{
    dispatch(FetchWeapons())
  },[dispatch])

  return(
    <div className="containerWeapons">
      <div className="headerContainerWeapon">
        <h2>Weapons</h2>
        <Link className="LinkWeapons" to="/weapons/weaponsform?mode=Add"><img className="imgSvg" src="https://icons.getbootstrap.com/assets/icons/plus-circle.svg" alt="plus" /> Add</Link>
      </div>
      <hr />
      {
        weapons && weapons.map(weapon => <WeaponsDisplay key={weapon.id} id={weapon.id}/>)
      }
    </div>
  )
}