import React, { useState, useEffect, useMemo } from "react";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import axios from "axios";
import { Upload, Search, Trash2, Download, View, CheckCircle } from "lucide-react";
import ReportFormModal from "./ReportFormModal.jsx"; 

const ReportsManagementDashboard = () => {
  const [reports, setReports] = useState([]);
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [associationFilter, setAssociationFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportsRes, projectsRes, eventsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/reports`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/projects`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/events`), 
        ]);
        setReports(reportsRes.data);
        setProjects(projectsRes.data);
        setEvents(eventsRes.data);
      } catch (err) {
        setError("Could not fetch data. Please try again later.");
        console.error("Fetch Error:", err); 
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleApproveReport = async (reportId) => {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/reports/${reportId}/status`,
                { status: 'Approved' } 
            );

            setReports(prevReports =>
                prevReports.map(report =>
                    report._id === reportId ? response.data : report
                )
            );
            alert('Report approved successfully!');
        } catch (err) {
            console.error("Failed to approve report:", err);
            alert('Failed to approve report. Please try again.');
        }
    };

  const filteredReports = useMemo(() => {
    if (!reports) return [];
    return reports
      .filter((report) => {
        if (associationFilter === "all") return true;
        return (
          report.project?._id === associationFilter ||
          report.event?._id === associationFilter
        );
      })
      .filter((report) =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [reports, searchQuery, associationFilter]);

  const handleDelete = (report) => {
    setReportToDelete(report);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (reportToDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/reports/${reportToDelete._id}`
        );

        setReports(reports.filter((r) => r._id !== reportToDelete._id));
      } catch (err) {
        alert("Error: Could not delete the report.");
      } finally {
        setIsDeleteModalOpen(false);

        setReportToDelete(null);
      }
    }
  };

  const handleSaveReport = async (formData) => {
    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reports/upload`,
        formData
      );

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reports`
      );

      setReports(response.data);
    } catch (err) {
      alert("Upload failed. Please try again.");
    } finally {
      setIsFormModalOpen(false);

      setLoading(false);
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <AdminLayout activePage="Reports Section" pageTitle="Reports Management">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="relative w-full md:w-1/3">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search reports by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <select
              value={associationFilter}
              onChange={(e) => setAssociationFilter(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
            >
              <option value="all">All Associations</option>
              <optgroup label="Projects">
                {projects.map((project) => (
                  <option key={`proj-${project._id}`} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Events">
                {events.map((event) => (
                  <option key={`event-${event._id}`} value={event._id}>
                    {event.title}
                  </option>
                ))}
              </optgroup>
            </select>
            <button
              onClick={() => setIsFormModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
            >
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
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Title
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Associated With
                </th>{" "}
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report._id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">
                      {report.title}
                    </td>
                    <td className="p-3 text-gray-700">
                      {report.project
                        ? `Project: ${report.project.title}`
                        : report.event
                        ? `Event: ${report.event.title}`
                        : "N/A"}
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(report.createdAt)}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          report.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-4">
                        <a
                          href={report.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Report"
                          className="text-gray-500 hover:text-black"
                        >
                          <View size={18} />
                        </a>
                        <a
                          href={report.filePath}
                          download
                          title="Download Report"
                          className="text-gray-500 hover:text-black"
                          target="_blank"
                        >
                          <Download size={18} />
                        </a>
                        <button
                          onClick={() => handleDelete(report)}
                          title="Delete"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormModalOpen && (
        <ReportFormModal
          projects={projects}
          events={events} 
          onClose={() => setIsFormModalOpen(false)}
          onSave={handleSaveReport}
        />
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium">Delete Report</h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this report? This cannot be
              undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ReportsManagementDashboard;
