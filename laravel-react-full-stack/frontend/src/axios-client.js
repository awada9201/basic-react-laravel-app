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
    // try{
        // Rejected response
        const {response} = error;
        if(response.status === 401){
            localStorage.removeItem('ACCESS_TOKEN')
        }
        // else .... other error statuses ex: 404, ...

        throw response; // Throw the error to be catched by the page try-catch handler
})

export default axiosClient;