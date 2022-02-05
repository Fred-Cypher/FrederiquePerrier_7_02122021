import axios from "axios";

export function errorInterceptor(){
    axios.interceptors.response.use(null, (error) => {
        const { response } = error;
        
        if(!response){
            console.error(error);
            return
        }

        if([401, 403].includes(response.status)){
            localStorage.clear();
            window.location.href = '/'
        }

        const errorMessage = response.data?.message || response.statusText;
        console.error('Error : ', errorMessage);
    }
    
    );
};

export function jwInterceptor(){
    /*axios.interceptors.request.use(request => {
    const isLoggedIn = account?.token;

    if(isLoggedIn){
        request.headers.common.Authorization = `Bearer ${account.token}`;
    }
    return request
    });*/
    axios.interceptors.request.use(request => {
        const token = localStorage.getItem('userToken');
        const isLoggedIn = token;

        if(isLoggedIn){
        request.headers.common.Authorization = `Bearer ${token}`;
        }
        return request
    });
};