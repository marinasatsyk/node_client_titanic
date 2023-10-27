/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { getUser } from "../../api/instanceAxios";
import UpdateUserFormComponent from "../../components/updateUserForm";
import UserInfoComponent from "../../components/userInfoComponent";
import { useNavigate } from "react-router-dom";

export default function ProfilComponent () {
  const [isEdit, setIsEdit]= useState(false);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  console.log(isEdit)
  
  const editProfile = () => {
    navigate(`/user/profile/${user.id}/edit`);

  };

    return (
      <div className="profil-container">
      <UserInfoComponent  /> 
        <button className="update-btn" onClick={() => editProfile()}>Update</button>
      </div>
      
      )
  
  }

