import React from 'react';
import AdminLayout from '../../layouts/AdminLayout.jsx';
import { Link } from 'react-router-dom';
import { Users, FolderKanban, Calendar, FileText, PlusCircle, Bell, Clock } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for demonstration purposes
  const stats = [
    { title: 'Total Members', value: 42, icon: <Users />, link: '/admin/members' },
    { title: 'Total Projects', value: 15, icon: <FolderKanban />, link: '/admin/projects' },
    { title: 'Upcoming Events', value: 3, icon: <Calendar />, link: '/admin/events' },
    { title: 'Pending Reports', value: 2, icon: <FileText />, link: '/admin/reports' },
  ];

  const quickActions = [
    { label: 'Add New Member', link: '/admin/add-member' },
    { label: 'Add New Project', link: '/admin/add-project' },
    { label: 'Create New Event', link: '/admin/events/new' },
    { label: 'Upload Report', link: '/admin/reports' },
  ];
  
  const recentActivity = [
    { action: 'New member added:', subject: 'Priya Singh', time: '2 hours ago' },
    { action: 'Project updated:', subject: 'Project Alpha', time: '5 hours ago' },
    { action: 'New event created:', subject: 'React Workshop', time: '1 day ago' },
    { action: 'Report uploaded:', subject: 'Q3 Financials.pdf', time: '2 days ago' },
  ];

  return (
    <AdminLayout activePage="Dashboard" pageTitle="Dashboard">
      <div className="space-y-6">
        
        {/* At-a-Glance Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Link to={stat.link} key={stat.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                {React.cloneElement(stat.icon, { size: 24 })}
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions & Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.link} className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors">
                    <PlusCircle className="text-blue-500 mb-2" size={28} />
                    <span className="text-sm font-medium text-center text-gray-700">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Placeholder for a Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Member Growth (Last 6 Months)</h3>
                <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-400">Chart would be displayed here</p>
                </div>
            </div>
          </div>
          
          {/* Recent Activity Feed */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Bell size={20} />
              Recent Activity
            </h3>
            <ul className="space-y-4">
              {recentActivity.map((activity, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3 mt-1">
                    <Clock size={16} className="text-gray-500"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {activity.action} <span className="font-semibold text-gray-800">{activity.subject}</span>
                    </p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;