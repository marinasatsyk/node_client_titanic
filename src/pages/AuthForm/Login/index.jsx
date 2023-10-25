import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import {
    getUserPending,
    getUserSuccess,
    getUserFail,
} from '../../../features/UserSlice';

// import  {userLogin} from '../../../api/userAPI';
import { login } from '../../../api/instanceAxios';

const LoginComponent = () => {
  const { error } = useSelector((store) => store.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    //verification if checkbox "signIUp" is checked, use local state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        isRemember: false,
    });
    const { email, password, isRemember } = formData;
    const formRequest = { email: email, password: password };

    //function for get the input value
    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === 'checkbox' ? checked : value,
            };
        });
    }
    
    //submit information
    const handleSubmit = async (event) => {
        event.preventDefault();

        //submit to API
        dispatch(getUserPending());
        console.log("***formData", formData);
        console.log("***formRequest", formRequest);
        try {
            console.log('in try ')
            const res = await login(formRequest.email, formRequest.password);

            if( res.status === 200) {
                if(isRemember){
                    localStorage.setItem(
                        'JWT',
                        JSON.stringify(res.data.token)
                    )
                }else{
                    sessionStorage.setItem(
                        'JWT',
                        JSON.stringify(res.data.token)
                    ); 
                }
            } 

            // const isAuth = await userLogin(formRequest, isRemember);
            // console.log("isAuth", isAuth);
            const user = res.data.user;

            user && dispatch(getUserSuccess(user));
            navigate('/user/profile');

        } catch (error) {
            console.error("'====>from handle submit**", error);
            dispatch(getUserFail(error.message));
        }
    };

    function openDashboard() {
        return <Navigate to="/user/profile" replace />;
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                
                {error &&
                // eslint-disable-next-line no-prototype-builtins
                    (error.message !== "" ? (
                        <div className="error">{error}</div>
                    ) : null)}

                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            name="isRemember"
                            value={formData.isRemember}
                            onChange={handleChange}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                    {
                        <Link to={'/user/signup'}>
                            <div onClick={() => dispatch(getUserFail(''))}>
                                Sign up
                            </div>
                        </Link>
                    }

                    <button
                        className="sign-in-button"
                        onClick={() => openDashboard()}
                    >
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
};

export default LoginComponent;