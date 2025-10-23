import React from 'react';
import {
  LayoutDashboard,
  ClipboardCheck,
  Download,
  FileText,
  UserCircle,
  LogOut,
  ChevronsLeft,
} from 'lucide-react';

const FacultySidebar = ({ isCollapsed, setIsCollapsed, activePage }) => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/faculty/dashboard' },
    { name: 'Approve Projects', icon: <ClipboardCheck size={20} />, href: '/faculty/approve-projects' },
    { name: 'Past Projects', icon: <Download size={20} />, href: '/faculty/past-projects' },
    { name: 'Personal Notes', icon: <FileText size={20} />, href: '/faculty/notes' },
  ];

  return (
    <aside
      className={`flex flex-col bg-slate-800 border-r border-slate-700 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      
      <div className="h-20 p-4 border-b border-slate-700 flex items-center justify-between">
        <h1
          className={`text-2xl font-bold text-white transition-opacity duration-200 ${
            isCollapsed ? 'opacity-0 hidden' : 'opacity-100'
          }`}
        >
          Faculty Advisor
        </h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white"
        >
          <ChevronsLeft className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      
      <nav className="flex-grow p-2 space-y-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`flex items-center p-3 rounded-md transition-colors duration-200
                  ${
                    activePage === item.name
                      ? 'bg-blue-600 font-semibold text-white shadow-lg hover:bg-blue-700'
                      : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center' : ''}`}
                title={item.name}
              >
                <span>{item.icon}</span>
                <span
                  className={`ml-4 transition-all duration-200 ${
                    isCollapsed ? 'opacity-0 hidden w-0' : 'opacity-100 w-auto'
                  }`}
                >
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      
      <div className="p-2 border-t border-slate-700 mt-auto">
        <a
          href="/faculty/login"
          className={`flex items-center p-3 rounded-md transition-colors duration-200 text-red-400 hover:bg-red-500/20 hover:text-red-300 ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title="Login"
        >
          <LogOut size={20} />
          <span
            className={`ml-4 font-medium transition-all duration-200 ${
              isCollapsed ? 'opacity-0 hidden w-0' : 'opacity-100 w-auto'
            }`}
          >
            LogOut
          </span>
        </a>
      </div>
    </aside>
  );
};

export default FacultySidebar;
