// Get Users
import { axiosInstance } from "."

export const getTransactions = async () => {
    try {
        const res = await axiosInstance.get("/transaction/read")
        return res.data
    } catch (error) {
        return error?.response.data
    }
}

export const addTransaction = async (user) => {
    try {
        const res = await axiosInstance.post("/transaction/create", user)
        return res.data
    } catch (error) {
        return error?.response?.data
    }
}

export const editTransaction = async (payload,id) => {
    try {
        const res = await axiosInstance.patch(`/transaction/update/${id}`, payload)
        return res.data
    } catch (error) {
        return error?.response?.data
    }
}