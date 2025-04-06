import { useState } from "react"
import style from"../style/Signup.module.css"
import { useAuthStore } from "../store/useAuthStore"
import { Eye, EyeOff, LoaderCircle } from "lucide-react"
import styles from '../style/App.module.css'
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ 
        email: "",
        password: ""
    })

    const {login, IsLoggingIng} = useAuthStore() as any

    const validateForm = () => {
        if (!formData.email.trim()) return toast.error("Email is required")
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format")
        if (!formData.password) return toast.error("Password is required")
        if(formData.password.length < 6) return toast.error("Password must be at least 6 characters")

        return true
    }
    
    const handleSubmit = (e: any) => {
        e.preventDefault()
        
        const success = validateForm()
        
        if (success === true) login(formData)
    }

    
    
    return (
        <div className={style.signup}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className={style.form_sig}>
                    <label>
                        <span>Email: </span>
                        <input type="text" placeholder="exemplo@gmail.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}  />
                    </label>
                </div>
                <div className={style.form_sig}>
                    <label>
                        <span>Password: </span>
                    <input type={showPassword ? "text" : "password"} placeholder="*******" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className={style.showPassword}>
                        {showPassword ? (
                            <EyeOff />
                        ): (
                            <Eye />
                            
                        )}
                    </button>
                    </label>
                </div>
                <button type="submit" disabled={IsLoggingIng} className={style.button_signip}>
                    {IsLoggingIng ? (
                        <>
                            <LoaderCircle size={40} className={styles.load} />
                            Loading...
                        
                        </>
                    ): (
                        "Login"
                    )}
                </button>
            </form>
            <div className={style.div_link}>
                <p>
                    Already have an account?{" "}
                    <Link to="/signup" className={style.link_login}>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}