import style from '../style/Navbar.module.css'
import { CiSettings } from 'react-icons/ci'

export default function Navbar () {
  return (
    <>
      <div className={style.navbar}>
        
        <a href="/"><h1><span>Ant</span>Chat</h1></a>

        
        <a href="/settings"><h2><CiSettings className={style.icon_setting} /> Setting</h2></a>
      </div>
    </>
  )
}