import { Camera } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"
import style from"../style/Profile.module.css"
import { useState } from "react"

export default function Profile() {
    const {authUser, isUpdatingProfile, updateProfile}  = useAuthStore() as any
    const [selectedImg, setSelectedImg] = useState<string | null>(null);


    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader()
        
        reader.readAsDataURL(file)

        reader.onload = async () => {
            const base64Image = reader.result as string;
            setSelectedImg(base64Image)
            await updateProfile({ profilePic: base64Image})
        }
    }

    return (
        <div className={style.signup}>
            <h1>ProFile</h1>
            <p>Your profile information!</p>

            <div className={style.img}>
                <div className={style.img_profile}>
                    <img src={selectedImg || authUser.profilePic || "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"} width={130} />
                    <label htmlFor="avatar-upload"
                    className={`${style.icon_camera} ${isUpdatingProfile ? `${style.updating}` : ""}`}>
                        <Camera width={30} />
                        <input type="file" id="avatar-upload" className={style.input_avatar} accept="image/*" onChange={handleImageUpload} disabled={isUpdatingProfile} />
                    </label>
            </div>
            <p>
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
            </div>

            <div className={style.dados_container}>
                <div className={style.fullname}>
                    <div className={style.name}>
                        Full Name:
                    </div>
                    <p className={style.user_name}>{authUser?.fullName}</p>
                </div>

                <div className={style.fullname}>
                    <div className={style.name}>
                        Email:
                    </div>
                    <p className={style.user_name}>{authUser?.email}</p>
                </div>
            </div>

            <div className={style.container_information}>
                <h2>Account Information</h2>
                <div className={style.account_info}>
                    <div className={style.info_row}>
                        <span>Member Since</span>
                        <span>{authUser.createdAt?.split("T")[0]}</span>
                    </div>
                    <div className={style.info_row}>
                        <span>Accont Status</span>
                        <span className={style.status_active}>Active</span>
                    </div>
                </div>
            </div>

            
        </div>
    )
}