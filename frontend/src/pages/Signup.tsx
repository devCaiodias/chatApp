import { useState } from "react"
import style from"../style/Signup.module.css"
import { useAuthStore } from "../store/useAuthStore"
import { Eye, EyeOff, LoaderCircle } from "lucide-react"
import styles from "../style/App.module.css"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

export default function Signup() {
     const [showPassword, setShowPassword] = useState(false)
     const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
     })

    const {signup, IsSigningUp} = useAuthStore()
    
    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required")
        if (!formData.email.trim()) return toast.error("Email is required")
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format")
        if (!formData.password) return toast.error("Password is required")
        if(formData.password.length < 6) return toast.error("Password must be at least 6 characters")

        return true
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const success = validateForm()

        if (success === true) signup(formData)
    }

    return (
        <div className={style.signup}>
            <h1>Signup</h1>

            <form onSubmit={handleSubmit} className={style.form_container}>
                <div className={style.form_sig}>
                    <label>
                        <span>Full Name: </span>
                    <input type="text" placeholder="Caio dias" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                    </label>
                </div>
                <div className={style.form_sig}>
                    <label>
                        <span>Email: </span>
                    <input type="text" placeholder="exmplo@gmail.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </label>
                </div>
                <div className={style.form_sig}>
                    <label>
                        <span>Password: </span>
                    <input type={showPassword ? "text" : "password"} placeholder="25643" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className={style.showPassword}>
                        {showPassword ? (
                            <EyeOff />
                        ): (
                            <Eye />
                            
                        )}
                    </button>
                    </label>
                </div>

                <button type="submit" disabled={IsSigningUp} className={style.button_signip}>
                    {IsSigningUp ? (
                        <>
                            <LoaderCircle size={40} className={styles.load} />
                            Loading...
                        
                        </>
                    ): (
                        "Create Account"
                    )}
                </button>
            </form>
            <div className={style.div_link}>
                <p>
                    Already have an account?{" "}
                    <Link to="/login" className={style.link_login}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}