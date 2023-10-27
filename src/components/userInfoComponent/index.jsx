import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../api/instanceAxios";
import { getUserFail } from "../../features/UserSlice";

// eslint-disable-next-line react/prop-types
function UserInfoComponent() {
    const [dataUser, setDataUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((store) => store.user);
    const dispatch  = useDispatch();
    
    useEffect(() => {
      try{
        const data = async() => {
          setIsLoading(true)
           const res = await getUser(user.id);
         if(res.status === 200){
            setDataUser(res.data.userData)
         }
         setTimeout(() => {
           setIsLoading(false)
         }, 1000)
      }
        data()
      }catch(err){
        console.log("err ****************from userInfocomponent", err)
        dispatch(getUserFail(err));
      }
      }, [])


  return (
    <div className="profil-container">
       
       <>
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
      </div>
  )
}

export default UserInfoComponent