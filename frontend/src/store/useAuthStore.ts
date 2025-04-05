import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.ts'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignupUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
    
    checkAuth: async() => {
        try {
            const res = axiosInstance.get("/auth/check")

            set({authUser: (await res).data})
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.log("Error in checkAuth: ", error)
            set({authUser:null})
        }finally {
            set({isCheckingAuth: false})
        }
    },
    
    signup: async (data: any) => {
        set({ isSignupUp: true})

        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data})
            
            toast.success("Account created sucessFully")
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            set({isSignupUp: false})
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser: null})
            toast.success("Logget out successFully")
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    },

    login: async ( data: any) => {
        set({ isLoggingIng: true })

        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data})
            
            toast.success("Account login sucess")
            
        } catch (error: any) {
            toast.error(error.response.data.message)
        }finally {
            set({ isLoggingIng: false})
        }
    }
}))