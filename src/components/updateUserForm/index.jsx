import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Validator, unifyString } from "../../helpers";
import { getUserFail, getUserPending, stopUserPending } from "../../features/UserSlice";
import { update } from "../../api/instanceAxios";
import ManagedInput from "../generic/ManageInput";




// eslint-disable-next-line react/prop-types
function UpdateUserFormComponent() {
    const { user, error } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isEmailValidate, setIsEmailValidate] = useState(false);
    const [isFirstNameValidate, setIsFirstNameIsValidate] = useState(false);
    const [isLastNameValidate, setIsLastNameIsValidate] = useState(false);
    const [isSubmitRegister, setIsSubmitRegister] = useState(false);
  
    const getUserInfo = () => {
        navigate(`/user/profile/${user.id}`);
      };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEmailValidate(Validator.email(email));
    setIsFirstNameIsValidate(Validator.name(firstName));
    setIsLastNameIsValidate(Validator.name(lastName));
    setIsSubmitRegister(true);
};
  useEffect(() => {
    const newUser = async () => {
        if (
            isEmailValidate &&
            isFirstNameValidate &&
            isLastNameValidate&&
            isSubmitRegister
        ) {
            // API new user
            dispatch(getUserFail(''))
            dispatch(getUserPending());
            
            try {
              const firstName = unifyString(firstName);
              const lastName = unifyString(lastName);
              
              const response = await update(user.id, 
                  {email,firstName,lastName}                        
                );
                response && dispatch(stopUserPending());
               
                if(response.status === 200){
                  navigate('/user/login')
                }
            } catch (error) {
                setIsSubmitRegister(false);
                 dispatch(getUserFail(error));
            }
        }
    };
    newUser();
}, [isSubmitRegister,isEmailValidate, isFirstNameValidate, isLastNameValidate, email, firstName, lastName]);

  return (
    <section className="sign-up-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Edit current user information</h1>

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
            <button className="sign-up-button">Save</button>
             <button className="sign-up-button cancel" onClick={() => getUserInfo()}>Cancel</button> 
        </form>
    </section>
  )
}

export default UpdateUserFormComponent