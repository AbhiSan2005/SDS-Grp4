import React, { useState, useEffect } from 'react';

const ReportFormModal = ({ report, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    associatedProject: '',
  });

  useEffect(() => {
    if (report) {
      setFormData({
        title: report.title,
        description: report.description || '',
        associatedProject: report.associatedProject,
      });
    }
  }, [report]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6">{report ? 'Edit Report' : 'Upload New Report'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Report Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label htmlFor="associatedProject" className="block text-sm font-medium text-gray-700">Associated Project</label>
            <select name="associatedProject" value={formData.associatedProject} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="">Select a Project</option>
              <option value="Project Alpha">Project Alpha</option>
              <option value="Project Beta">Project Beta</option>
            </select>
          </div>
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">File</label>
            <input type="file" name="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">{report ? 'Save Changes' : 'Upload'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportFormModal;