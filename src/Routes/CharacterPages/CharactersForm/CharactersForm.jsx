import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DefaultUrl from "../../../asset/img/unknown_character.jpeg"
import { Counter } from "../../../Component/Counter/Counter"
import { FetchCharClass } from "../../CharaClassesPages/CharaClasseSlice"
import { FetchWeapons } from "../../WeaponsPage/WeaponSlice"
import "./CharactersForm.css"
import { FormSelectWeapons } from "./FormSelectWeapons"

export const CharactersForm=()=>{

  const dispatch=useDispatch()

  const charaClasses = useSelector(state=>state.charaClasses.charaClasses)

  const [imgUrl,setImgUrl]=useState(DefaultUrl)
  const [CharacterStats,setCharacterStats]=useState([
    {id:1,name:"STR",value:0},
    {id:2,name:"DEX",value:0},
    {id:3,name:"CON",value:0},
    {id:4,name:"WIS",value:0},
    {id:5,name:"INT",value:0},
    {id:6,name:"CHA",value:0}
  ])
  const [totalStats,setTotalStats]=useState(0)
  const [statusButton,setStatusButton]=useState(true)
  const [selectedClassPoint,setSelectedClassPoint]=useState(0)
  const [selectWeapon,setSelectWeapon]=useState([])
  const [compteur,setCompteur]=useState(1)


const ChangeValueStatHandler=(type,id)=>{
  let statEdit= CharacterStats.find(stat=>stat.id === id)
  if(type === "increment"){
    statEdit.value ++
    setCharacterStats([...CharacterStats.filter(stat=>stat.id !== id),statEdit].sort((a,b)=>a.id-b.id))
  }
  else if(type === "decrement"){
    if(statEdit.value>0){
      statEdit.value --
      setCharacterStats([...CharacterStats.filter(stat=>stat.id !== id),statEdit].sort((a,b)=>a.id-b.id))
    }
  }
}

const onChangeSelectorHandler=(e)=>{
  const classSelected = charaClasses.find(charaClass => charaClass.name === e.target.value)
  console.log(classSelected)
  setSelectedClassPoint(+classSelected.classPoint)
}

const onChangeHandler=async(e)=>{
  try{
    const response =await axios.get(e.target.value,)

    if(response.status === 200){
      setImgUrl(e.target.value)
    }
    else{
      throw new Error ("wrong Url")
    }
  }

  catch(error){
    setImgUrl(DefaultUrl)
    console.log(error.message)
  }
}

const onClickAddWeaponHandler=()=>{
  const tmpArray=[...selectWeapon]
  tmpArray.push(compteur)
  setCompteur(compteur+1)
  setSelectWeapon(tmpArray)
  //recuperation des value du select
  // for(let key of weaponsTake){
  //   const elem = document.getElementById(`select${key}`).value
  //   console.log(elem)
  // }
}

const onClickSuprWeaponHandler=(id)=>{
  const indexFound = selectWeapon.indexOf(id)
  let tmpArray = [...selectWeapon]
  tmpArray.splice(indexFound,1)
  setSelectWeapon(tmpArray)

}

  useEffect(()=>{
    dispatch(FetchCharClass())
    dispatch(FetchWeapons())
    let compteur=0
    CharacterStats.forEach(stat=>{
      compteur+=stat.value
    })
    setTotalStats(compteur)

    
  if(totalStats<selectedClassPoint){
    setStatusButton(true)
  }
  else{
    setStatusButton(false)
  }
  },[CharacterStats,totalStats,dispatch,selectedClassPoint])

  return(
    <form className="FormCharacters">
      <div className="FormCharactersHeader">
        <h2>Add</h2>
        <hr className="hrformCharactere"/>
      </div>
      <div className="FormCharactersDivImg">
        <img src={imgUrl} alt="profilPic" />
      </div>
      <div className="FormCharactersDivInputs">
        <label htmlFor="name">Name :</label>
        <input type="text" id="name"/>

        <label htmlFor="Classes">Classe :</label>
        <select name="Classes" id="Classes" onChange={onChangeSelectorHandler}>
          <option value="">Select a class</option>
          {
            charaClasses&& charaClasses.map(charaClasse=><option key={charaClasse.id} value={charaClasse.name}>{charaClasse.name}</option>)
          }
        </select>
        <label htmlFor="baseAc">Base AC :</label>
        <input type="number" id="baseAc"/>

        <label htmlFor="avatarUrl">Avatar Url :</label>
        <input type="text" id="avatarUrl" onChange={onChangeHandler}/>
      </div>
      <hr className="hrformCharactere"/>
      <div className="FormCharacterStats">
        <div className="FormCharacterStatsCounter">
          {
            CharacterStats.map(CharacterStat=><Counter statusButton={statusButton} key={CharacterStat.id} CharacterStat={CharacterStat} ChangeValueStatHandler={ChangeValueStatHandler}/>)
          }
        </div>
        <p>Stat points left : <b>{selectedClassPoint - totalStats}</b></p>
      </div>
      <hr className="hrformCharactere"/>
      <div className="FormCharacterWeapons">
        {
          selectWeapon&& selectWeapon.map(weapon=><FormSelectWeapons onClickSuprWeaponHandler={onClickSuprWeaponHandler} key={weapon} id={weapon}/>)
        }
        <div className="divBtnAddWeaponSelect">
          <button type="button" onClick={onClickAddWeaponHandler}>Add a Weapon</button>
        </div>
      </div>
      <hr className="hrformCharactere"/>
    </form>
  )
}