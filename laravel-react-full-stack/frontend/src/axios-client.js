import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})


// Interceptors: Special functions that will be executed before / after response is sent / received
// Request interceptor
axiosClient.interceptors.request.use((config) =>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

// Response interceptor
axiosClient.interceptors.response.use((response)=>{
    // Accepted response
    return response;
}, (error)=>{
    // Rejected response
    // if(response.status === 401){
    //     localStorage.removeItem('ACCESS_TOKEN')
    // }
    console.log("Error: ", error);
    // else .... other error statuses ex: 404, ...
})

export default axiosClient;