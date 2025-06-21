import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from '../redux/postSlice';
const GetAllPost = () => {
    const dispatch = useDispatch();
  const backendurl=process.env.REACT_APP_API_URL;

  const { suggestedUsers, user } = useSelector((store) => store.auth);

    useEffect(() => {
        const allpost = async () => {
            try {
                const res = await axios.get(`${backendurl}/allpost`, {
                    withCredentials: true,
                })
                if (res.data.success) {
                    dispatch(setPosts(res.data.posts))
                    console.log(res.data.posts);

                }
            }
            catch (e) {
                console.log(e.response.data.message)
                // toast.error("Failed to fetch suggested users")
            }
        }
        allpost();
    }, [dispatch,user])
}

export default GetAllPost
