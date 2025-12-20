// Get Users
import { axiosInstance } from "."

export const getUsers = async () => {
    try {
        const res = await axiosInstance.get("/user/read")
        return res.data
    } catch (error) {
        return error?.response.data
    }
}

export const addUser = async (user) => {
    try {
        const res = await axiosInstance.post("/user/create", user)
        return res.data
    } catch (error) {
        return error?.response?.data
    }
}

export const editUser = async (payload,id) => {
    try {
        const res = await axiosInstance.patch(`/user/update/${id}`, payload)
        return res.data
    } catch (error) {
        return error?.response?.data
    }
}