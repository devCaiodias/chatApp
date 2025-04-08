import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    IsUsersLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set( { IsUsersLoading : true})
        try {
            const res = await axiosInstance.get("/message/user")
            set( { users: res.data })
            
        } catch (error: any) {
            toast.error(error.response.message)
        } finally {
            set( { IsUsersLoading : false})
            
        }
    },
    
    getMessages: async(userId: string) => {
        set({isMessageLoading: true})
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set( {messages: res.data})
        } catch (error: any) {
            toast.error(error.response.message)
        }finally {
            
            set({isMessageLoading: false})
        }
    }
}))
