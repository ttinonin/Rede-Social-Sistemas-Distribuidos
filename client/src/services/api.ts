import axios from "axios";

const api = axios.create({
    baseURL: "http://0.0.0.0:9000",
    // withCredentials: true, // se for usar cookies
})

export const userApi = axios.create({
    baseURL: "http://0.0.0.0:8080",
})

export default api;