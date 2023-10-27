/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../api/instanceAxios";
import { getUserFail, logout } from "../../features/UserSlice";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function UserInfoComponent() {
    const [dataUser, setDataUser] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useState(false);
    const { user, error } = useSelector((store) => store.user);
    const dispatch  = useDispatch();
    // const navigate = useNavigate();

    // if(error.message == 'User doesn\'t found'){
    //     localStorage.removeItem('JWT');
    //     sessionStorage.removeItem('JWT');
    //     dispatch(logout());
    //     navigate('/');
    // }
   

    useEffect(() => {
     
        const data = async() => {
            setIsLoading(true)
         try{    
            const res = await getUser(user.id);

            if(res.status === 200){
                setDataUser(res.data.userData)
            }
            setTimeout(() => {
            setIsLoading(false)
            }, 1000)
       }catch(error){
        console.log("error ****************from userInfocomponent", error)
        dispatch(getUserFail(error));
      }
        }
        data()
     
      }, [])


  return (
    <div className="profil-container">
       {error.message 
       ? <div>{error.message}</div>
        :<>
       <h1>ProfilComponent</h1>
           {Object.keys(dataUser).length &&  Object.entries(dataUser).map((detail, index) => {
               return(
                 <div key={index+"-user"}>
                   <span>{detail[0]}:</span>
                   <span>{detail[1]}</span>
                   </div>
               )
           })}
           
           {/* <button className="update-btn" onClick={() => handleClick()}>Update user info</button> */}
           </>
    }
       
      </div>
  )
}

export default UserInfoComponent