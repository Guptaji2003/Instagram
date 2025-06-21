import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserProfile } from '../redux/authSlice';
import axios from 'axios';

const GetUserProfile = (userId) => {
  const backendurl=process.env.REACT_APP_API_URL;

 const dispatch=useDispatch();
 useEffect(() => {
   const getprofile=async()=>{
    try {
      const res=await axios.get(`${backendurl}/profile/${userId}`, {
        withCredentials: true,
      });
      dispatch(setUserProfile(res.data.user));
    } catch (error) {
      console.error(error);
    }
   }
 getprofile();
   
 }, [userId,dispatch]);
 
}

export default GetUserProfile
