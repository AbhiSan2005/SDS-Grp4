import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

const checkAuth = () => {
    const token = localStorage.getItem('adminToken'); 

    if (!token) {
        return { isAuthenticated: false, userRole: null }; 
    }

    try {
        const decodedToken = jwtDecode(token);

        const currentTime = Date.now() / 1000; 
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('adminToken'); 
            localStorage.removeItem('adminUser');
            return { isAuthenticated: false, userRole: null }; 
        }

        return { isAuthenticated: true, userRole: decodedToken.role };

    } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        return { isAuthenticated: false, userRole: null }; 
    }
};

const ProtectedRouteAdmin = () => {
    const { isAuthenticated, userRole } = checkAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (userRole !== 'Admin') {

        console.warn("Access denied: User is not an Admin.");
        return <Navigate to="/login" replace />; 
    }

    return <Outlet />;
};

export default ProtectedRouteAdmin;