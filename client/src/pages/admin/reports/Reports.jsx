import React, { useState, useEffect, useMemo } from 'react';
import AdminLayout from '../../../layouts/AdminLayout.jsx';
import axios from 'axios';
import { Upload, Search, FilePenLine, Trash2, AlertTriangle, Download, View } from 'lucide-react';
import ReportFormModal from './ReportFormModal'; // We'll create this component next

const ReportsManagementDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [reportToDelete, setReportToDelete] = useState(null);

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');

  useEffect(() => {
    // In a real app, you would fetch both reports and projects
    const fetchReports = async () => {
      try {
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/reports`);
        // setReports(response.data);
        // Mock data for demonstration:
        const mockReports = [
          { _id: 'r1', title: 'Q3 Project Summary', associatedProject: 'Project Alpha', uploadDate: '2025-09-30', fileType: 'PDF', status: 'Approved' },
          { _id: 'r2', title: 'Initial Design Mockups', associatedProject: 'Project Beta', uploadDate: '2025-10-05', fileType: 'Image', status: 'Pending' },
          { _id: 'r3', title: 'Final Project Report', associatedProject: 'Project Alpha', uploadDate: '2025-10-10', fileType: 'DOCX', status: 'Approved' },
        ];
        setReports(mockReports);
      } catch (err) {
        setError("Could not fetch reports.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Filter and search logic
  const filteredReports = useMemo(() => {
    return reports
      .filter(report => projectFilter === 'all' || report.associatedProject === projectFilter)
      .filter(report => report.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [reports, searchQuery, projectFilter]);

  // Handlers for CRUD operations
  const handleAddNew = () => {
    setEditingReport(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (report) => {
    setEditingReport(report);
    setIsFormModalOpen(true);
  };

  const handleDelete = (report) => {
    setReportToDelete(report);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    // API call logic would go here
    setReports(reports.filter(r => r._id !== reportToDelete._id));
    setIsDeleteModalOpen(false);
    setReportToDelete(null);
  };

  const handleSaveReport = (reportData) => {
    if (editingReport) {
      // Update logic
      setReports(reports.map(r => r._id === editingReport._id ? { ...r, ...reportData } : r));
    } else {
      // Create logic
      const newReport = { _id: `r${reports.length + 1}`, ...reportData, uploadDate: new Date().toISOString().split('T')[0] };
      setReports([...reports, newReport]);
    }
    setIsFormModalOpen(false);
    setEditingReport(null);
  };

  return (
    <AdminLayout activePage="Reports Section" pageTitle="Reports Management">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Header with Search and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search reports by title..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <select
              value={projectFilter}
              onChange={e => setProjectFilter(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
            >
              <option value="all">All Projects</option>
              <option value="Project Alpha">Project Alpha</option>
              <option value="Project Beta">Project Beta</option>
            </select>
            <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Upload size={18} />
              <span>Upload Report</span>
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Associated Project</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Type</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="6" className="p-4 text-center">Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan="6" className="p-4 text-center text-red-500">{error}</td></tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report._id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{report.title}</td>
                    <td className="p-3 text-gray-700">{report.associatedProject}</td>
                    <td className="p-3 text-gray-700">{report.uploadDate}</td>
                    <td className="p-3 text-gray-700">{report.fileType}</td>
                    <td className="p-3"><span className={`px-2 py-1 text-xs rounded-full ${report.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{report.status}</span></td>
                    <td className="p-3">
                      <div className="flex items-center gap-4">
                        <button title="View" className="text-gray-500 hover:text-black"><View size={18} /></button>
                        <button title="Download" className="text-gray-500 hover:text-black"><Download size={18} /></button>
                        <button onClick={() => handleEdit(report)} title="Edit" className="text-blue-600 hover:text-blue-800"><FilePenLine size={18} /></button>
                        <button onClick={() => handleDelete(report)} title="Delete" className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {isFormModalOpen && (
        <ReportFormModal
          report={editingReport}
          onClose={() => setIsFormModalOpen(false)}
          onSave={handleSaveReport}
        />
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium">Delete Report</h3>
            <p className="mt-2 text-sm text-gray-600">Are you sure you want to delete this report? This cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-md">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ReportsManagementDashboard;