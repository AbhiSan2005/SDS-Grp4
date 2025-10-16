import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout.jsx';
import axios from 'axios';

const AddProjectPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '', 
    githubLink: '',
    link: '',
    image: '',
    startDate: '',
    endDate: '',
    isVisible: true, 
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const submissionData = {
      ...formData,
      technologies: formData.technologies.split(',').map(item => item.trim()).filter(Boolean),
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, submissionData);
      alert('Project added successfully!');
      navigate('/admin/projects'); 
    } catch (err) {
      console.error('Failed to add project:', err);
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout activePage="Projects Management" pageTitle="Add New Project">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Project Title</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>

            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
              <input type="text" name="technologies" id="technologies" value={formData.technologies} onChange={handleChange} required placeholder="e.g., React, Node.js, MongoDB" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700">GitHub Link</label>
                <input type="url" name="githubLink" id="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="https://github.com/..." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">Live Link</label>
                <input type="url" name="link" id="link" value={formData.link} onChange={handleChange} placeholder="https://your-project.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image Link</label>
              <input type="url" name="image" id="image" value={formData.image} onChange={handleChange} placeholder="https://.../image.png" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="isVisible" id="isVisible" checked={formData.isVisible} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
              <label htmlFor="isVisible" className="ml-2 block text-sm text-gray-900">Visible on public showcase</label>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-4 border-t pt-6">
              <button type="button" onClick={() => navigate('/admin/projects')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:bg-blue-300">
                {loading ? 'Adding...' : 'Add Project'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProjectPage;