import React from 'react';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CalendarDays,
  FileText,
  Folder,
  LogOut,
  ChevronsLeft,
} from 'lucide-react';

const Sidebar = ({ isCollapsed, setIsCollapsed, activePage }) => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
    { name: 'Members Management', icon: <Users size={20} />, href: '/admin/members' },
    { name: 'Projects Management', icon: <FolderKanban size={20} />, href: '/admin/projects' },
    { name: 'Events Management', icon: <CalendarDays size={20} />, href: '/admin/events' },
    { name: 'Reports Section', icon: <FileText size={20} />, href: '/admin/reports' },
    { name: 'File Manager', icon: <Folder size={20} />, href: '/admin/files' },
  ];

  return (
    <aside
      className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h1 className={`text-2xl font-bold text-gray-800 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
          SDS Admin
        </h1>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-md hover:bg-gray-200">
          <ChevronsLeft className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <a
                href={item.href}
                className={`flex items-center p-2 text-gray-600 rounded-md hover:bg-gray-200 transition-colors ${
                  activePage === item.name ? 'bg-blue-100 font-semibold text-blue-800' : ''
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={item.name}
              >
                <span className={`${activePage === item.name ? 'text-blue-800' : 'text-gray-500'}`}>{item.icon}</span>
                <span className={`ml-3 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <a href="#" className={`flex items-center p-2 text-red-500 rounded-md hover:bg-red-100 transition-colors ${isCollapsed ? 'justify-center' : ''}`} title="Logout">
          <LogOut size={20} />
          <span className={`ml-3 font-medium transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Logout
          </span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;