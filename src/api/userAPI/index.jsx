import { login, signin } from "../instanceAxios";


export const getJWT = () => {
    const l_sessionStorage = sessionStorage.getItem('JWT');
    if(l_sessionStorage) return JSON.parse(sessionStorage);

    const l_localStorage = localStorage.getItem('JWT');
    return l_localStorage ? JSON.parse(l_localStorage) : '';
}

export const userLogin = async(FormData, isRemember) => {
  
   try{
    const  {email, password} = FormData;

    const res = await login(email, password);
    
    sessionStorage.setItem(
        'JWT',
        JSON.stringify(res.token)
    );
    
    if(isRemember){
        localStorage.setItem(
            'JWT',
            JSON.stringify(res.token)
        )
    }
    return res;
   }catch(err){
       return err
   }
};


export const userSignIn =  async(FormData, navigate) => {
    try{
        const  {email, password, firstName, lastName} = FormData;
        const res = await signin(email, password, firstName, lastName);
        
        if(res.data.status === 200){
            navigate('/user/login');
        }
        return res;
       }catch(err){
            console.error("error", err);
            
       }
}