import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setAuthUser } from '../redux/authSlice';

const UseFollow = () => {
  const backendurl=process.env.REACT_APP_API_URL;
    
    const dispatch = useDispatch();
    const followhandle = async (userId) => {
      try {
        const res = await axios.put(
          `${backendurl}/follow/${userId}`,
          {},
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          console.log(res.data);
        //   toast.success(res.data.message);
        }
        dispatch(setAuthUser(res.data.user));
      } catch (err) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      }
    };
    return {followhandle}
}

export default UseFollow
