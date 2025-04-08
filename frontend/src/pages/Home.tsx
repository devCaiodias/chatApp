import ChatContainer from "../container/ChatContainer"
import NoChatSelect from "../container/NoChatSelect"
import Sidebar from "../container/Sidebar"
import { useChatStore } from "../store/useChatStore"
import style from"../style/Home.module.css"

export default function Home() {
    const {selectedUser} = useChatStore() as any
    
    return (
        <div className={style.home_container}>
            <div className={style.inner_container}>
                <div className={style.card}>
                    <div className={style.content}>
                        <Sidebar /> 
                        
                        {!selectedUser ? <NoChatSelect /> : <ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    )
}