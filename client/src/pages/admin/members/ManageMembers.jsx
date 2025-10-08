import React, { useState } from 'react';

// Import necessary icons from lucide-react
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
  UserPlus,
  FilePenLine,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

import { Link } from 'react-router-dom';


const MemberManagementDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const initialMembers = [
    { id: 1, name: 'SDS Admin', role: 'Admin', portfolio: 'Events & Docs', batch: '2026', joined: '2023-08-15' },
    { id: 2, name: 'Aastha Jajoo', role: 'Head', portfolio: 'Events & Docs', batch: '2027', joined: '2023-08-15' },
    { id: 3, name: 'Janhvi Jain', role: 'Head', portfolio: 'Events & Docs', batch: '2027', joined: '2023-09-01' },
    { id: 4, name: 'Dhruv Agarwal', role: 'Member', portfolio: 'Events & Docs', batch: '2028', joined: '2023-09-01' },
    { id: 5, name: 'Abhiraj Sankpal', role: 'Member', portfolio: 'Events & Docs', batch: '2028', joined: '2024-02-20' },
    { id: 6, name: 'Arshita Agrawal', role: 'Member', portfolio: 'Events & Docs', batch: '2028', joined: '2024-02-20' },
    { id: 7, name: 'Anshul Kalmegh', role: 'Member', portfolio: 'Events & Docs', batch: '2028', joined: '2024-02-20' },
  ];

  const [members, setMembers] = useState(initialMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const handleOpenModal = (member) => {
    setMemberToDelete(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setMemberToDelete(null);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (memberToDelete) {
      setMembers(members.filter((member) => member.id !== memberToDelete.id));
      alert('User successfully deleted');
      handleCloseModal();
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '#' },
    { name: 'Members Management', icon: <Users size={20} />, href: '#' },
    { name: 'Projects Management', icon: <FolderKanban size={20} />, href: '#' },
    { name: 'Events Management', icon: <CalendarDays size={20} />, href: '#' },
    { name: 'Reports Section', icon: <FileText size={20} />, href: '#' },
    { name: 'File Manager', icon: <Folder size={20} />, href: '#' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside
        className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className={`text-2xl font-bold text-gray-800 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>SDS Admin</h1>
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
                    item.name === 'Members Management' ? 'bg-blue-100 font-semibold text-blue-800' : ''
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={item.name}
                >
                  <span className={`${item.name === 'Members Management' ? 'text-blue-800' : 'text-gray-500'}`}>{item.icon}</span>
                  <span className={`ml-3 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <a href="#" className={`flex items-center p-2 text-red-500 rounded-md hover:bg-red-100 transition-colors ${isCollapsed ? 'justify-center' : ''}`} title="Logout">
            <LogOut size={20} />
            <span className={`ml-3 font-medium transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>Logout</span>
          </a>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Member Management</h2>
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">Welcome, Admin!</span>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <UserCircle size={24} className="text-gray-600" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Club Members</h3>
            <Link
  to="/add-member" 
  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
>
  <UserPlus size={18} />
  <span>Add New Member</span>
</Link>
          </div>

          <div className="w-full">
            {/* Header for larger screens (mimics table header) */}
            <div className="hidden md:grid md:grid-cols-5 gap-4 px-4 py-2 font-semibold text-gray-600 bg-gray-50 rounded-t-lg">
              <div>Name</div>
              <div>Role</div>
              <div>Portfolio</div>
              <div>Batch</div>
              <div>Actions</div>
            </div>

            {/* List of Member Cards */}
            <div className="space-y-4 md:space-y-0">
              {members.map((member) => (
                <div 
                  key={member.id} 
                  className="bg-white p-4 rounded-lg shadow-md md:rounded-none md:shadow-none md:border-b md:grid md:grid-cols-5 md:gap-4 md:items-center hover:bg-gray-50"
                >
                  {/* Name */}
                  <div className="flex justify-between items-center md:block">
                    <span className="font-semibold text-gray-900">{member.name}</span>
                    <div className="md:hidden flex items-center gap-4">
                      <button title="Edit Member" className="text-blue-600 hover:text-blue-800">
                        <FilePenLine size={20} />
                      </button>
                      <button onClick={() => handleOpenModal(member)} title="Delete Member" className="text-red-600 hover:text-red-800">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-gray-700"><span className="md:hidden font-medium">Role: </span>{member.role}</div>
                  <div className="text-gray-700"><span className="md:hidden font-medium">Portfolio: </span>{member.portfolio}</div>
                  <div className="text-gray-700"><span className="md:hidden font-medium">Batch: </span>{member.batch}</div>

                  <div className="hidden md:flex items-center gap-4">
                    <button title="Edit Member" className="text-blue-600 hover:text-blue-800">
                      <FilePenLine size={20} />
                    </button>
                    <button onClick={() => handleOpenModal(member)} title="Delete Member" className="text-red-600 hover:text-red-800">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Delete Member</h3>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                This user will be deleted from the database. <br/>
                Are you sure you want to continue?
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                No, Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagementDashboard; 