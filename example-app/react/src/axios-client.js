import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) =>{
    try{
        const token = localStorage.getItem('ACCESS_TOKEN');
        config.headers.Authorization = `Bearer ${token}`
        return config;
    } catch (err){
        console.log(err);
    }
})

axiosClient.interceptors.response.use((response) =>{
    return response;
}, (error) =>{
    const {response} = error;
    
    // Check for errors
    if (response.status === 401){ // Invalid token
        localStorage.removeItem('ACCESS_TOKEN')
    }

    throw error;
})

export default axiosClient;