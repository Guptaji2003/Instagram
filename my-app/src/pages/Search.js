import React, { useState } from "react";
import { useSelector } from "react-redux";
import IMG from "../assests/raamin-ka-74jERQtN1V4-unsplash.jpg";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const profiles = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "Chris Brown"];
  const { suggestedUsers } = useSelector((store) => store.auth);
  const filteredProfiles = suggestedUsers.filter((profile) =>
    profile.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex  flex-col items-center justify-center h-screen bg-pink-200 pt-30 pb-30">
      <h2 className="text-2xl font-bold mb-4">Search Profile</h2>
      <input
        type="text"
        placeholder="Search for a profile..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-80 p-2 mb-4 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="w-80 overflow-y-auto max-h-screen bg-white rounded-lg shadow-lg p-2">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, index) => (
            <Link to={`/profile/${profile._id}`}>
            <li key={index} className="p-3 border-b shadow flex items-center hover:bg-gray-200">
                <img
                  src={(profile.profileimage?.includes("data")? profile.profileimage : IMG)}
                  alt={profile.username}
                  className="w-12 h-12 rounded-full border-4 border-blue-500 object-cover mr-4"
                  />
                <div className="flex flex-col">
                <span className="font-bold">{profile.username}</span>
                <span className="text-gray-500 text-xs">{profile.name}</span>
                </div>
              {/* {profile.username} */}
            </li>
                  </Link>
          ))
        ) : (
          <li className="p-3 text-gray-500">No profiles found</li>
        )}
      </ul>
    </div>
  );
};

export default Search;
