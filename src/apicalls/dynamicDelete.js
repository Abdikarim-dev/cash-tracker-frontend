import { axiosInstance } from "."

export const dynamicDelete = async (payload) => {
    try {
        const response = await axiosInstance.delete(`${payload.title}/delete/${payload.id}`);
        return response.data
    } catch (error) {
        return error.response.data
    }
}

// /user/delete/10

// user
// transfer-amount