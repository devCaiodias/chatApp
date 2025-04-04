import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import style from '../style/Navbar.module.css'
import { CiSettings } from 'react-icons/ci'

export default function Navbar () {
    const { logout, authUser} = useAuthStore()
  
  return (
    <>
      <div className={style.navbar}>
        <a href="/"><h1><span>Ant</span>Chat</h1></a>
        <div className={style.links}>
          <a href="/settings" className={style.link_settigs}><CiSettings className={style.icon_setting} /> Setting</a>
          {authUser && (
            <>
              <Link to={"/profile"} className={style.link_profile}> 
                <span>Profile</span>
              </Link>
              <button onClick={logout} className={style.button_logout}>
                <span>logout</span>
              </button>
            </>
          )}
        </div>
        </div>
    </>
  )
}