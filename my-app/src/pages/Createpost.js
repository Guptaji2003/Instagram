import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setPosts } from "../redux/postSlice";
import { useDispatch, useSelector } from "react-redux";
import GetAllPost from "../hooks/GetAllPost";
export default function CreatePost() {
  const backendurl=process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [imagepreview, setimagepreview] = useState(null);
  const { posts } = useSelector((store) => store.post);
  const [city, setcity] = useState("");
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by this browser.");
      } else {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              const data = await response.json();

              const city =
                data.address.city || data.address.town || data.address.village;
              const address = data.display_name;

              resolve({ city, address });
            } catch (error) {
              reject("Failed to fetch address.");
            }
          },
          (error) => {
            reject("Error getting location: " + error.message);
          }
        );
      }
    });
  };

  // Example usage:
  getUserLocation()
    .then((location) => setcity(location.city))
    .catch((error) => console.error(error));

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setimagepreview(URL.createObjectURL(file));
  //   }
  //   setImage(file);
  // };

  const postdata = async () => {
    // console.log(image);
    try {
      const formData = new FormData();
      formData.append("photo", image);
      formData.append("caption", caption);
      formData.append("location", city);
      console.log(formData);

      const res = await axios.post(
        `${backendurl}/createpost`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post,...posts]));
        
        console.log(res.data.message);
        toast.success(res.data.message);
        setImage("");
        setCaption("");
      }
      // GetAllPost();
    } catch (err) {
      console.log(err);
    }
  };
 
  

  return (
    <div className="flex bg-pink-200  justify-center items-center min-h-screen  p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-5 space-y-4">
        <h2 className="text-xl font-bold">Create New Post</h2>

        {/* <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-50">
          {imagepreview ? (
            <img
              src={imagepreview}
              alt="Preview"
              className="w-full h-60 object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <svg
                className="w-10 h-10 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 16v4m0 0h4m-4 0H8m8-16a4 4 0 00-8 0v4m8-4h-8m8 4H8m0 0H4m4 0h8"
                ></path>
              </svg>
              <span className="text-sm text-gray-500">Upload Image/Video</span>
            </div>
          )}
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label> */}
        <div className="flex flex-col items-center gap-2">
        {/* <label htmlFor="">Image</label> */}
        <img src={image} alt="" width={200}/>
        <input type="text" placeholder="Copy image address from google"  className="w-full border border-gray-300 rounded-lg p-2" value={image} onChange={(e)=>setImage(e.target.value)}/>
        </div>

        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        />

        {/* <input
          type="text"
          placeholder="Add Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        /> */}

        <button
          onClick={() => postdata()}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Post
        </button>
      </div>
    </div>
  );
}
