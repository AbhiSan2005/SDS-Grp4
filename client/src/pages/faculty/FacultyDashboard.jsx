
import React from 'react';
import FacultyLayout from '../../layouts/FacultyLayout.jsx';
import { ClipboardCheck, Download, Users, FileText } from 'lucide-react';

const FacultyDashboard = () => {
  return (
    <FacultyLayout pageTitle="Faculty Dashboard" activePage="dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <ClipboardCheck className="text-blue-600 mr-3" size={28} />
            <div>
              <h4 className="text-sm text-gray-500">Pending Approvals</h4>
              <p className="text-2xl font-semibold text-gray-800">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <Download className="text-green-600 mr-3" size={28} />
            <div>
              <h4 className="text-sm text-gray-500">Approved Projects</h4>
              <p className="text-2xl font-semibold text-gray-800">34</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <Users className="text-purple-600 mr-3" size={28} />
            <div>
              <h4 className="text-sm text-gray-500">Active Students</h4>
              <p className="text-2xl font-semibold text-gray-800">56</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <FileText className="text-orange-600 mr-3" size={28} />
            <div>
              <h4 className="text-sm text-gray-500">Reports Submitted</h4>
              <p className="text-2xl font-semibold text-gray-800">9</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
        <ul className="space-y-3 text-gray-700 text-sm">
          <li>• Project “AI Attendance System” submitted for review.</li>
          <li>• 3 new project reports uploaded.</li>
          <li>• Faculty Advisor meeting scheduled for Friday.</li>
        </ul>
      </div>
    </FacultyLayout>
  );
};

export default FacultyDashboard;
