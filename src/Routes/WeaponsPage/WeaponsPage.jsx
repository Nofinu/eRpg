import { Link } from "react-router-dom"
import "./Weapons.css"


export const WeaponsPage=()=>{
  return(
    <div className="containerWeapons">
      <div>
        <h2>Weapons</h2>
        <Link className="LinkWeapons" to="/weapons/addweaponsform">Add</Link>
      </div>
      <hr />
    </div>
  )
}