import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import style from '../style/Navbar.module.css'

export default function Navbar () {
    const { logout, authUser} = useAuthStore() as any
  
  return (
    <>
      <div className={style.navbar}>
        <a href="/"><h1><span>Ant</span>Chat</h1></a>
        <div className={style.links}>
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