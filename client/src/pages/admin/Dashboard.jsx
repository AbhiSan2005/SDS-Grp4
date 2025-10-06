import React, { useState } from 'react';

import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CalendarDays,
  FileText,
  Folder,
  LogOut,
  UserCircle,
  ChevronsLeft,
} from 'lucide-react';

import Navbar from '../../components/Navbar.jsx';
const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
    { name: 'Members Management', icon: <Users size={20} />, href: '/admin/members' },
    { name: 'Projects Management', icon: <FolderKanban size={20} />, href: '/admin/projects' },
    { name: 'Events Management', icon: <CalendarDays size={20} />, href: '/admin/events' },
    { name: 'Reports Section', icon: <FileText size={20} />, href: '/admin/reports' },
    { name: 'File Manager', icon: <Folder size={20} />, href: '/admin/files' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Collapsible Sidebar */}
      <aside
        className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h1
            className={`text-2xl font-bold text-gray-800 transition-opacity duration-200 ${
              isCollapsed ? 'opacity-0 hidden' : 'opacity-100'
            }`}
          >
            SDS Admin
          </h1>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <ChevronsLeft
              className={`transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Navigation Links */}

        <nav className="flex-grow p-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <a
                  href={item.href}
                  className={`flex items-center p-2 text-gray-600 rounded-md hover:bg-gray-200 transition-colors ${
                    item.name === 'Dashboard' ? 'bg-gray-200 font-semibold text-gray-900' : ''
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={item.name} // Tooltip for collapsed view
                >
                  <span className="text-gray-500">{item.icon}</span>
                  <span
                    className={`ml-3 transition-opacity duration-200 ${
                      isCollapsed ? 'opacity-0 hidden' : 'opacity-100'
                    }`}
                  >
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer (Logout) */}

        <div className="p-4 border-t border-gray-200">
          <a
            href="/logout"
            className={`flex items-center p-2 text-red-500 rounded-md hover:bg-red-100 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Logout"
          >
            <LogOut size={20} />
            <span
              className={`ml-3 font-medium transition-opacity duration-200 ${
                isCollapsed ? 'opacity-0 hidden' : 'opacity-100'
              }`}
            >
              Logout
            </span>
          </a>
        </div>
      </aside>

      {/* Main Content */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Bar */}

        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Dashboard Overview</h2>
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">Welcome, Admin!</span>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <UserCircle size={24} className="text-gray-600" />
            </button>
          </div>
        </header>


      </div>
    </div>
  );
};

export default AdminDashboard;