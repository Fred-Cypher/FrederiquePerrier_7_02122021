import axios from "axios";
//import jwt_decode from 'jwt-decode';
//import { useNavigate } from "react-router-dom";

export function errorInterceptor(){
    axios.interceptors.response.use(null, (error) => {
        const { response } = error;

    if(!response){
        console.error(error);
        return
}

    if([401, 403].includes(response.status)){
        localStorage.removeItem('userToken'); 
        localStorage.removeItem('refreshToken');
        window.location.href = '/'
    }

    const errorMessage = response.data?.message || response.statusText;
    console.error('Error : ', errorMessage);
    }
);
};

/*export function jwInterceptor(){
    axios.interceptors.request.use(request => {
        const navigate = useNavigate();

        let token = localStorage.getItem('userToken');
        console.log('interceptor token : ', token)
        let decode = jwt_decode(token);
        console.log('interceptor decode: ', decode)

        let currentDate = new Date();
        console.log(currentDate.getTime());

        if(token.exp < currentDate.getTime()){
            if(currentDate.getTime() < token.exp+(5*60)){
                axios.get('http://localhost:5500/api/users/refresh')
                    .then(response => 
                        localStorage.setItem('refreshToken', response.data.refreshToken)
                    )
                    let token = localStorage.getItem('refreshToken');
                    console.log(token)
            } else {
                localStorage.removeItem('userToken');
                localStorage.removeItem('refresToken')
                navigate('/');
            }
        }

        if (token){
            request.headers.common.Authorization = `Bearer ${token}`
        }

        console.log('dans le jwtInterceptor')

        return request
    });
};*/