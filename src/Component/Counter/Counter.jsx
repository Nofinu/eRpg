import "./Counter.css"

export const Counter=(props)=>{
  return(
    <div className="CounterContainer">
      <h4>{props.CharacterStat.name}</h4>
      <hr />
      <div className={`CounterContainerStatDisplay ${props.CharacterStat.name}`} >
        <div className="CounterContainerStatDisplayValue" style={{left:`${props.CharacterStat.value<10?"46%":"42%"}`}}>{props.CharacterStat.value}</div>
        <div className="CounterContainerButton">
          <button type="button" className={props.CharacterStat.value===0?"desactivated":""} onClick={()=>{props.ChangeValueStatHandler('decrement',props.CharacterStat.id)}}>-</button>
          <button type="button" className={!props.statusButton? "desactivated":""} onClick={()=>{props.statusButton&& props.ChangeValueStatHandler('increment',props.CharacterStat.id)}}>+</button>
        </div>
      </div>
    </div>
  )
}