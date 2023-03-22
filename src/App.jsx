import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet,Link } from 'react-router-dom';
import './App.css';
import { removeUser } from './Routes/Auth/AuthSlice';
import { FetchCharClass } from './Routes/CharaClassesPages/CharaClasseSlice';
import { FetchCharacters } from './Routes/CharacterPages/CharacterSlice';
import { FetchWeapons } from './Routes/WeaponsPage/WeaponSlice';

//changement d'image verif = requte si reponse correct = ok

function App() {

  const dispatch=useDispatch()

  const user = useSelector(state =>state.auth.user)

  const [DropDown,setDropDown]=useState(false)

  const OpenDropDown=()=>{
    setDropDown(!DropDown)
  }

  const onClickHandler=()=>{
    dispatch(removeUser())
  }

  useEffect(()=>{
    dispatch(FetchCharacters())
    dispatch(FetchWeapons())
    dispatch(FetchCharClass())
  },[dispatch])

  return (
    <div className="App">
      <header className="AppHeader">
        <nav>
          <div className='linkContainer'>
            <h2 className='h2Header'>eRPG</h2>
            <Link className='LinkHeader' to="/">Home</Link>
            <div className="Dropdown">
              <p onClick={OpenDropDown} className='cliclDropDown'>Player <b className='triangle'>{DropDown? '\u25B6':'\u25BC'}</b></p>
              {
                DropDown? <div onClick={OpenDropDown} className='dropDownContent'><Link className='LinkDorpDown' to="/characters">Characters</Link> <Link className='LinkDorpDown' to="/characlasses">Classes</Link> <Link to="/weapons" className='LinkDorpDown'>Weapons</Link></div>
                :
                <div></div>
              }
            </div>
            <Link className='LinkHeader'>Gamemaster</Link>
          </div>
          <div>{
            user ? <Link className='LinkLog' to="/" onClick={onClickHandler}>Log Out</Link>:
            <>
              <Link className='LinkLog' to='/auth?mode=in'>Log In</Link>
              <Link className='LinkLog' to='/auth?mode=up'>Register</Link>
            </>
              }
          </div>
        </nav>

      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default App;
