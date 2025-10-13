import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import axios from 'axios';
import { Plus, FilePenLine, Trash2, AlertTriangle, Calendar } from "lucide-react";

const EventsManagementDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
        setEvents(response.data);
      } catch (err) {
        setError("Could not fetch events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleOpenModal = (event) => {
    setEventToDelete(event);
    setIsModalOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (eventToDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${eventToDelete._id}`);
        setEvents(events.filter((event) => event._id !== eventToDelete._id));
      } catch (err) {
        alert("Error: Could not delete the event.");
      } finally {
        setIsModalOpen(false);
        setEventToDelete(null);
      }
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <AdminLayout activePage="Events Management" pageTitle="Events Management">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">All Events</h3>
        <Link to="/admin/events/new" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <Plus size={18} />
          <span>Create New Event</span>
        </Link>
      </div>

      {loading ? <p>Loading events...</p> : error ? <p className="text-red-500">{error}</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-md flex flex-col transition-shadow hover:shadow-xl">
              <img src={event.imageUrl || 'https://via.placeholder.com/400x200'} alt={event.title} className="rounded-t-lg w-full h-40 object-cover" />
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-bold text-gray-900 line-clamp-2">{event.title}</h4>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{event.status}</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{event.description}</p>
              </div>
              <div className="bg-gray-50 p-3 border-t flex justify-end items-center gap-4 rounded-b-lg">
                <Link to={`/admin/events/edit/${event._id}`} title="Edit Event" className="text-blue-600 hover:text-blue-800"><FilePenLine size={20} /></Link>
                <button onClick={() => handleOpenModal(event)} title="Delete Event" className="text-red-600 hover:text-red-800"><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* ... Delete Confirmation Modal JSX ... */}
        </div>
      )}
    </AdminLayout>
  );
};

export default EventsManagementDashboard;