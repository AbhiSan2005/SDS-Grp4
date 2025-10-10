import React, { useState } from "react";

const FacultyLoginBox = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    if(onLogin){
        onLogin({username, password});
    }

};
return(
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Faculty Login</h2>
        <input type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        />
        <input type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        />
        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">
         Login
        </button>

   
    </form>
);
};
export default FacultyLoginBox;
