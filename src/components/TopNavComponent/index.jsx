import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/UserSlice';
// import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// eslint-disable-next-line no-unused-vars
import{faShip, faCircleUser, faArrowRightFromBracket, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {
    // getUserPending,
    // getUserSuccess,
    getUserFail,
} from '../../features/UserSlice';

//component header of the application
export  const TopNavComponent = () => {
    const { user } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // function capitalizeFirstLetter(str) {
    //     // converting first letter to uppercase
    //     const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    //     return capitalized;
    // }

    const signOut = () => {
        localStorage.removeItem('JWT');
        sessionStorage.removeItem('JWT');
        dispatch(logout());
        navigate('/');
    };

    const viewProfile = () => {
        navigate('/user/profile');
    };

    //autoconnetion for case "remember me"
    // const [logged, setLogged] = useState(false);
    // if(user){
    //   setLogged(true)

    // }
    // useEffect(() => {
    //     dispatch(getUserPending());
    //     fetchUser()
    //         .then((userData) => {
    //             console.log('CONNECT !!!');
    //             setLogged(true);
    //             dispatch(getUserSuccess(userData.body));
    //             navigate('/user/profile');
    //         })
    //         .catch((err) => {
    //             console.log('not connected');
    //             dispatch(getUserFail(err));
    //         });
    // }, [logged]);

    return (
        <nav className="main-nav">
           {!(user && user.id) 
           ? 
           <>
           <div
           className="main-nav-logo"
       >
           <FontAwesomeIcon icon={faShip} /> 
       </div>
            <h1 className="title">Titanic statistics App</h1>
           </>
           
           :<Link to= '/'>
           <div
               className="main-nav-logo"
               title='home'
               onClick={() => dispatch(getUserFail(''))}
           >
               <FontAwesomeIcon icon={faShip} /> 
               
              
           </div>
       </Link>
           
        }
           
            
            {!(user && user.id) ? (
                <Link to="/user/login">
                    <div
                        className="main-nav-item"
                        onClick={() => dispatch(getUserFail(''))}
                    >
                   <FontAwesomeIcon icon={faCircleUser} title='LogIn'/> 
                       
                    </div>
                </Link>
            ) : (
                <>
                    
                    
                   
                    <div
                        className="main-nav-item"
                       
                    >
                        <div
                        className="main-nav-item"
                        onClick={() => {
                            viewProfile();
                        }}
                        title='view profile'
                    >
                        <FontAwesomeIcon icon={faCircleUser} /> 
                    </div>

                         {/* <div>
                            <i className="fa fa-user-circle"></i>
                            {capitalizeFirstLetter(user.firstName)}
                        </div> */}
                        <div  title='exit'  onClick={() => {
                            signOut();
                        }}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={270} />
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

