import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout.jsx';
import axios from 'axios';

const EditEventPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${id}`);
        const { startDate, endDate, gallery, ...rest } = response.data;
        // Format dates for datetime-local input and gallery array back to string
        setFormData({
          ...rest,
          startDate: new Date(startDate).toISOString().slice(0, 16),
          endDate: new Date(endDate).toISOString().slice(0, 16),
          gallery: gallery.join('\n'),
        });
      } catch (err) {
        setError("Could not fetch event data.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => { /* ... same as AddEventPage ... */ };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... same as AddEventPage, but use axios.put ...
  };
  
  if (loading) return <AdminLayout><p>Loading...</p></AdminLayout>;
  if (error) return <AdminLayout><p className="text-red-500">{error}</p></AdminLayout>;

  return (
    <AdminLayout activePage="Events Management" pageTitle="Edit Event">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* ... Paste the same form JSX from AddEventPage here ... */}
        {/* The value props will be pre-filled by the formData state */}
        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => navigate('/admin/events')} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Update Event</button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default EditEventPage;