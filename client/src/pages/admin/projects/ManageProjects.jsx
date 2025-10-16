import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import axios from 'axios';
import { FolderKanban, FilePenLine, Trash2, AlertTriangle, Plus } from "lucide-react";

const ProjectManagementDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
        setProjects(response.data);
      } catch (err) {
        setError("Error: Could not fetch projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleOpenModal = (project) => {
    setProjectToDelete(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setProjectToDelete(null);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (projectToDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${projectToDelete._id}`);
        setProjects(projects.filter((project) => project._id !== projectToDelete._id));
      } catch (err) {
        alert("Error: Could not delete the project.");
      } finally {
        handleCloseModal();
      }
    }
  };

  return (
    <AdminLayout activePage="Projects Management" pageTitle="Projects Management">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">All Projects</h3>
        <Link to="/admin/add-project" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <Plus size={18} />
          <span>Add New Project</span>
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading projects...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        // Responsive grid for the cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            // Card container
            <div key={project._id} className="bg-white rounded-lg shadow-md flex flex-col transition-shadow hover:shadow-xl">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-bold text-gray-900">{project.name}</h4>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    project.isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>{project.isVisible ? 'Visible' : 'Hidden'}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{project.description}</p>
                <div className="mt-4">
                  <h5 className="text-sm font-semibold text-gray-500 mb-2">Technologies</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Card footer for actions */}
              <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end items-center gap-4 rounded-b-lg">
                <Link to={`/admin/edit-project/${project._id}`} title="Edit Project" className="text-blue-600 hover:text-blue-800">
                  <FilePenLine size={20} />
                </Link>
                <button onClick={() => handleOpenModal(project)} title="Delete Project" className="text-red-600 hover:text-red-800">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal (no changes needed here) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900">Delete Project</h3>
            <p className="mt-2 text-sm text-gray-600">Are you sure you want to delete this project? This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-md">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ProjectManagementDashboard;