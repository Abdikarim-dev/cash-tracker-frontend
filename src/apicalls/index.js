import axios from "axios";

const BASE_URL = 'http://localhost:4000/api';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

// Waxaan ka faaideysaynaa interceptor si aan u check gareynayo request walba (Every request)
// inuu adeegsanayaano token-ka ugu dambeeya ee local storage-ka ku keydsan

axiosInstance.interceptors.request.use((requestData) => {
    const token = localStorage.getItem("token");
    if (token) requestData.headers.Authorization = `Bearer ${token}`;
    else delete requestData.headers.Authorization;

    return requestData;
}, (error) => new Promise(error))