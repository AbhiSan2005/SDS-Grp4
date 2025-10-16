import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout.jsx';
import axios from 'axios';

const AddEventPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', description: '', agenda: '', startDate: '', endDate: '', 
    location: '', organizer: '', status: 'Upcoming', imageUrl: '', gallery: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const submissionData = {
      ...formData,
      gallery: formData.gallery.split('\n').map(url => url.trim()).filter(Boolean),
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/events`, submissionData);
      alert('Event created successfully!');
      navigate('/admin/events');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout activePage="Events Management" pageTitle="Create New Event">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Form fields for title, description, dates, location, etc. */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate">Start Date & Time</label>
            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
          </div>
          <div>
            <label htmlFor="endDate">End Date & Time</label>
            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
        </div>
        <div>
          <label htmlFor="gallery">Gallery Image URLs (one URL per line)</label>
          <textarea name="gallery" value={formData.gallery} onChange={handleChange} rows="4" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
        </div>
        {/* ... add other fields like location, organizer, status, imageUrl ... */}

        {error && <p className="text-red-600">{error}</p>}
        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => navigate('/admin/events')} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-300">
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddEventPage;