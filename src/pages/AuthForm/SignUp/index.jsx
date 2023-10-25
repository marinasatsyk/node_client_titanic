import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { userSignIn } from '../../../api/userAPI';
import {
  getUserFail,
  getUserPending,
  stopUserPending,
} from '../../../features/UserSlice';
import ManagedInput from '../../../components/generic/ManageInput';
import { Validator, unifyString } from '../../../helpers';
import { signin } from '../../../api/instanceAxios';

function SignUpComponent() {
  const { error } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //verification if checkbox "signIUp" is checked, use local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isEmailValidate, setIsEmailValidate] = useState(false);
  const [isPasswordValidate, setIsPasswordIsValidate] = useState(false);
  const [isFirstNameValidate, setIsFirstNameIsValidate] = useState(false);
  const [isLastNameValidate, setIsLastNameIsValidate] = useState(false);

  console.log("error", error);

  //verification of form data
  const handleSubmit = (event) => {
      event.preventDefault();
      setIsEmailValidate(Validator.email(email));
      setIsPasswordIsValidate(Validator.password(password));
      setIsFirstNameIsValidate(Validator.name(firstName));
      setIsLastNameIsValidate(Validator.name(lastName));
  };

  // post axios when everything is ok
    useEffect(() => {
        const newUser = async () => {
            if (
                isEmailValidate &&
                isPasswordValidate &&
                isFirstNameValidate &&
                isLastNameValidate
            ) {
                // API new user
                dispatch(getUserPending());
                
                try {

                    const response = await signin(
                          email,
                          password,
                          unifyString(firstName),
                          unifyString(lastName),
                    );
                    response && dispatch(stopUserPending());
                   
                    if(response.status === 200){
                      navigate('/user/login')
                    }
                } catch (error) {
                    console.log('from signUp submit', error);
                     dispatch(getUserFail(error));
                }
            }
        };
        newUser();
        // console.log('after useEffect ' + error);
    }, [isEmailValidate, isPasswordValidate, isFirstNameValidate, isLastNameValidate, email, password, firstName, lastName]);
  
  
  
  return (
    <main className="main bg-dark">
    <section className="sign-up-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign Up</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
            {error &&
                (error.message.includes('email') ? (
                    <div className="error">{error.message}</div>
                ) : null)}
            <ManagedInput
                id="email"
                type="email"
                name="email"
                value={email}
                setValue={setEmail}
                errorMessage="Make sure to enter correct mail"
                validateField={Validator.email}
            />
            <ManagedInput
                id="password"
                type="password"
                name="password"
                value={password}
                setValue={setPassword}
                errorMessage="Make sure to use at least 1 letter, 1 number, 6 characters"
                validateField={Validator.password}
            />
            <ManagedInput
                id="firstName"
                name="First Name"
                value={firstName}
                setValue={setFirstName}
                errorMessage="Make sure to enter correct name"
                validateField={Validator.name}
            />
            <ManagedInput
                id="lastName"
                name="Last Name"
                value={lastName}
                setValue={setLastName}
                errorMessage="Make sure to enter correct name"
                validateField={Validator.name}
            />
            <Link to="/user/login">
                <div onClick={() => dispatch(getUserFail(''))}>
                    Sign In
                </div>
            </Link>
            <button className="sign-up-button">Sign Up</button>
        </form>
    </section>
</main>
);
  
}

export default SignUpComponent