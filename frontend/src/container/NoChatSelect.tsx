import { MessageSquare } from 'lucide-react'
import style from '../style/NoChatSelect.module.css'

export default function NoChatSelect () {
    return (
        <>
        <div className={style.container}>
        <div className={style.card}>
          <div className="icon-wrapper">
            <div className={style.icon}>

              <MessageSquare className={style.icon_svg}/>
            </div>
          </div>
          <h2 className={style.title}>Welcome to Chatty!</h2>
          <p className={style.description}>Select a conversation from the sidebar to start chatting</p>
        </div>
      </div>
      
        </>
    )
}