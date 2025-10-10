import React from "react";
import FacultyLoginBox from "../../../components/FacultyLoginBox.jsx";

const FacultyLogin = () => {
    const handleLogin = (credentials) => {
        console.log("Credentials typed:", credentials);
        //We need to check if data is correct here
    };
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <FacultyLoginBox onLogin={handleLogin} />
    </div>
  );
};
export default FacultyLogin;