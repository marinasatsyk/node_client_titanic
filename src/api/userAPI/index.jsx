import { login, signin } from "../instanceAxios";
// import { Redirect } from "react-router-dom";

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

    console.log("from userLogin",  res)
    return res;
    
   }catch(err){
       console.error(err);
       return err
   }
};


export const userSignIn =  async(FormData) => {
    try{
        const  {email, password, firstName, lastName} = FormData;
        const res = await signin(email, password, firstName, lastName);
        console.log("from userSignIn",  res)
        // if(res.status === 200){
        //     <Redirect to="/login" /> 
        // }
        
    
       }catch(err){
            console.error(err);
            //move to state
       }
}