import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { signIn, signUp } from "./AuthSlice"
import "./Log.css"

export const LogPage=()=>{

  const dispatch = useDispatch()
  const navigate =useNavigate()

  const [SearchParams]=useSearchParams()
  const mode = SearchParams.get('mode')

  const emailRef = useRef()
  const passwordRef = useRef()

  const user =useSelector(state=>state.auth.user)


  const onSubmitHandler=async (e)=>{
    e.preventDefault()

    const userEntry = {
      email:emailRef.current.value,
      password:passwordRef.current.value,
      returnSecureToken:true
    }
    if(mode ==='in'){
      await dispatch(signIn(userEntry))
    }
    else{
      await dispatch(signUp(userEntry))
    }
  }

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user,navigate])

  return(
    <form className="FormLog" onSubmit={onSubmitHandler}>
      <h2>{mode==='in'?"Log In":"Register"}</h2>
      <label htmlFor="">Email :</label>
      <input type="email" ref={emailRef} />

      <label htmlFor="">Password :</label>
      <input type="password" ref={passwordRef}/>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}