// <<<<<<< HEAD
import React, { use } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const location = useLocation();
  const {username} = location.state;
  const navigate = useNavigate();
  const handleLogout = () =>{
    navigate('/faculty/login',{replace:true});
  };
  return (
    <div>
      <header className=' p-4 bg-blue-500 text-white flex items-center justify-between '>
        <span className='text-center text-3xl mx-auto'>Welcome, {username}!</span>
        <button onClick={handleLogout} className='text-white flex hover:bg-blue-300'>Logout</button>
      </header>
      <h1>Faculty Dashboard</h1>
    </div>
  )
}
// =======
// import React from 'react';
// import FacultyLayout from '../../layouts/FacultyLayout.jsx'; 

// const FacultyDashboard = () => {
//   return (
//     <FacultyLayout activePage="Dashboard" pageTitle="Dashboard Overview">
//     </FacultyLayout>
//   );
// };
// >>>>>>> origin/dev_abhiraj

export default FacultyDashboard;