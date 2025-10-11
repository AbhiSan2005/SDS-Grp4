import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx'; 
import { UserCircle } from 'lucide-react';

const AdminLayout = ({ activePage, pageTitle, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        activePage={activePage}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">{pageTitle}</h2>
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">Welcome, Admin!</span>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <UserCircle size={24} className="text-gray-600" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;