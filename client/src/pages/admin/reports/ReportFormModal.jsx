import React, { useState } from 'react';

const ReportFormModal = ({ projects, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    project: '', 
    file: null,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      // Currently only single file upload will add multiple later if needed
      setFormData(prev => ({ ...prev, file: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.file) {
      setError('Please select a file to upload.');
      return;
    }
    if (!formData.project) {
      setError('Please associate this report with a project.');
      return;
    }

    const finalFormData = new FormData();
    finalFormData.append('title', formData.title);
    finalFormData.append('project', formData.project);
    finalFormData.append('reportFile', formData.file); 

    onSave(finalFormData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl animate-fade-in">
        <h2 className="text-2xl font-bold mb-6">Upload New Report</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Report Title</label>
            <input 
              type="text" 
              name="title" 
              id="title"
              value={formData.title} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-gray-700">Associated Project</label>
            <select 
              name="project" 
              id="project"
              value={formData.project} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a Project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Report File</label>
            <input 
              type="file" 
              name="file" 
              id="file"
              onChange={handleChange}
              required
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept=".pdf,.doc,.docx"
            />
          </div>
          
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportFormModal;