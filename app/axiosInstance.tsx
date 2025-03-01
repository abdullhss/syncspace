import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API ,
}) ;

const refreshToken = async ()=>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/refreshToken`)
        
        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        return newToken ;
    }
    catch(error){
        console.log( "cant Refresh Token " , error);
        return Promise.reject(error); 
    }
}


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token){
            config.headers["Authorization"] = `Bearer ${token}` ;
        }
        return config
    } ,
    (error) => {
        return Promise.reject(error);
    }
)

// if Unauthorized 401
axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    } ,
    async (error)=>{

        const originalRequest = error.config;
        if(error.response && error.response.status === 401){
            try{
                const newToken = await refreshToken();
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            }
            catch(error){
                localStorage.removeItem("token");
                window.location.href = "/login"; 
            }
        }

        console.log("API ERRORS : " ,  error.response);
        return Promise.reject(error);
    }
)

export default axiosInstance