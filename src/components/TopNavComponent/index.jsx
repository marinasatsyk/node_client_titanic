import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/UserSlice';
// import { useEffect, useState } from 'react';

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
    function capitalizeFirstLetter(str) {
        // converting first letter to uppercase
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

        return capitalized;
    }

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
            <Link to={!(user && user.id) ? '/' : '/user/profile'}>
                <div
                    className="main-nav-logo"
                    onClick={() => dispatch(getUserFail(''))}
                >
                    <img
                        className="main-nav-logo-image"
                        src="#"
                        alt="Titanic statistics Logo"
                    />
                    <h1 className="sr-only">Titanic statistics App</h1>
                </div>
            </Link>
            {!(user && user.id) ? (
                <Link to="/user/login">
                    <div
                        className="main-nav-item"
                        onClick={() => dispatch(getUserFail(''))}
                    >
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </div>
                </Link>
            ) : (
                <>
                    <div
                        className="main-nav-item"
                        onClick={() => {
                            viewProfile();
                        }}
                    >
                        <i className="fa fa-user-circle"></i>
                    </div>

                    <div
                        className="main-nav-item"
                        onClick={() => {
                            signOut();
                        }}
                    >
                        <div>
                            <i className="fa fa-user-circle"></i>
                            {capitalizeFirstLetter(user.firstName)}
                        </div>

                        <div>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

