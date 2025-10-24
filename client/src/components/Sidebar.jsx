import React from 'react';
import {
    LayoutDashboard,
    Users,
    FolderKanban,
    CalendarDays,
    FileText,
    LogOut,
    ChevronsLeft,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isCollapsed, setIsCollapsed, activePage }) => {
    const navigate = useNavigate();

    const navItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
        { name: "Members Management", icon: <Users size={20} />, href: "/admin/members" },
        { name: "Projects Management", icon: <FolderKanban size={20} />, href: "/admin/projects" },
        { name: "Events Management", icon: <CalendarDays size={20} />, href: "/admin/events" },
        { name: "Reports Section", icon: <FileText size={20} />, href: "/admin/reports" },
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/login', { replace: true });
    };

    return (
        <aside
            className={`flex flex-col bg-slate-800 border-r border-slate-700 transition-all duration-300 ease-in-out ${
                isCollapsed ? "w-20" : "w-64"
            }`}
        >
            <div className="h-20 p-4 border-b border-slate-700 flex items-center justify-between">
                <h1
                    className={`text-2xl font-bold text-white transition-opacity duration-200 ${
                        isCollapsed ? "opacity-0 hidden" : "opacity-100"
                    }`}
                >
                    SDS Admin
                </h1>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white"
                >
                    <ChevronsLeft
                        className={`transition-transform duration-300 ${
                            isCollapsed ? "rotate-180" : ""
                        }`}
                    />
                </button>
            </div>

            <nav className="flex-grow p-2 space-y-1">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.href}
                                className={`flex items-center p-3 rounded-md transition-colors duration-200
                                    ${
                                        activePage === item.name
                                            ? "bg-blue-600 font-semibold text-white shadow-lg"
                                            : "text-slate-400 hover:bg-slate-700 hover:text-white"
                                    }
                                    ${isCollapsed ? "justify-center" : ""}`}
                                title={item.name}
                            >
                                <span>{item.icon}</span>
                                <span
                                    className={`ml-4 transition-all duration-200 ${
                                        isCollapsed ? "opacity-0 hidden w-0" : "opacity-100 w-auto"
                                    }`}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-2 border-t border-slate-700">
                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center p-3 rounded-md transition-colors duration-200 text-red-500 hover:bg-red-500/20 hover:text-red-400 ${
                        isCollapsed ? "justify-center" : ""
                    }`}
                    title="Logout"
                >
                    <LogOut size={20} />
                    <span
                        className={`ml-4 font-medium transition-all duration-200 ${
                            isCollapsed ? "opacity-0 hidden w-0" : "opacity-100 w-auto"
                        }`}
                    >
                        Logout
                    </span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;