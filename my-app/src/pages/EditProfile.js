import React, { useState } from "react";
import { Camera, Save, X } from "lucide-react";
import { useSelector } from "react-redux";
import IMG from "../assests/raamin-ka-74jERQtN1V4-unsplash.jpg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setAuthUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const backendurl=process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);
  const [gender, setGender] = useState(user?.gender);
  const [image, setImage] = useState(user?.profileimage);
  const dispatch = useDispatch();
  const editprofile = async () => {
    try {
      const res = await axios.put(
        `${backendurl}/update-profile`,
        { name, username, bio, gender,image },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Profile updated successfully!");
        console.log(res.data);

        dispatch(setAuthUser(res.data.user));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile!");
    }
  };

 
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24">
            <img
              src={image}
              alt="Profile"
              className="w-24 h-24  rounded-full border-4 border-blue-500  object-cover"
            />
            <label htmlFor="pi" className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
              <Camera size={18} className="text-white" />
              {/* <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} /> */}
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
        <div>
            <label className="text-gray-600 font-medium">Profile Image</label>
            <input
              type="text"
              id="pi"
              className="w-full border rounded-lg p-2 mt-1"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-600 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Username</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Bio</label>
            <textarea
              className="w-full border rounded-lg p-2 mt-1"
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="text-gray-600 font-medium">Gender</label>
            <br />
            <select
              name=""
              id=""
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <Link to={`/profile/${user?._id}`}>
          <button  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <X size={18} />
            Cancel
          </button>
          </Link>
          <button
            onClick={() => editprofile()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
