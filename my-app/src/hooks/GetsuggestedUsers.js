import axios from 'axios'
import React, { useEffect } from 'react'
import { setSuggestedUsers } from '../redux/authSlice'
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux";
const GetsuggestedUsers = () => {
  const backendurl=process.env.REACT_APP_API_URL;

    const dispatch = useDispatch();
    useEffect(() => {
        const suggestedUsers = async () => {
            try {
                const res = await axios.get(`${backendurl}/suggested-users`, {
                    withCredentials: true,
                })
                if (res.data.success) {
                    dispatch(setSuggestedUsers(res.data.users))
                    // console.log(res.data.users);

                }
            }
            catch (e) {
                console.log(e.response.data.message)
                // toast.error("Failed to fetch suggested users")
            }
        }
        suggestedUsers();
    }, [dispatch])
}

export default GetsuggestedUsers
