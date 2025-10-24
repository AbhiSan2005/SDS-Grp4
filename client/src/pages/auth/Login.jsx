import React, { useState } from 'react';
import { LogIn, User, KeyRound, CheckSquare } from 'lucide-react';
import WebsiteNavbar from '../../components/Navbar.jsx'; 
import Prism from '../../components/Prism.jsx'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin'); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                { email, password }
            );

            if (response.data && response.data.token && response.data.user) {
                // Store token and user info
                localStorage.setItem('adminToken', response.data.token);
                localStorage.setItem('adminUser', JSON.stringify(response.data.user));

                // Redirect based on role
                const userRole = response.data.user.role;
                if (userRole === 'Admin') {
                    navigate('/admin'); // Redirect Admins
                } else if (userRole === 'Faculty Advisor') {
                    navigate('/faculty'); // Redirect Faculty Advisors
                } else {
                    setError('Login successful, but role is not authorized for this portal.');
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminUser');
                }
            } else {
                setError('Login failed: Invalid response from server.');
            }

        } catch (err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || 'Invalid credentials or server error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-950 min-h-screen text-gray-300" style={{ fontFamily: "Delius, monospace" }}>
            <WebsiteNavbar />
            <div className="relative flex items-center justify-center min-h-[calc(100vh_-_68px)] py-12 px-4">
                 <div className="absolute inset-0 z-0 opacity-50">
                    <Prism
                        animationType="rotate"
                        timeScale={0.7}
                        height={4.3}
                        baseWidth={6.0}
                        scale={3.3}
                        hueShift={0}
                        colorFrequency={1.75}
                        noise={0}
                        glow={1}
                    />
                </div>
                 <div className="relative z-10 w-full max-w-md p-8 backdrop-blur-lg bg-gray-800/30 border border-gray-700/50 rounded-2xl shadow-lg">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "Quantum Lemon Bold, monospace" }}>Admin Portal</h1>
                        <p className="text-gray-400">Access the SDS Management Dashboard</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-2">Email address</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your coep email"
                                />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="password"className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>
                        {error && (<p className="text-sm text-red-400 text-center">{error}</p>)}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 font-semibold text-white rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <LogIn className="h-5 w-5" aria-hidden="true" />
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;