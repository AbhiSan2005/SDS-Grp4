import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import axios from 'axios';
import { FilePenLine, Trash2, Plus, View, Sparkles, Calendar } from "lucide-react"; 

const EventManagementDashboard = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [generatingId, setGeneratingId] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
                setEvents(response.data);
            } catch (err) {
                setError("Error: Could not fetch events.");
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);


    const handleGenerateReport = async (eventId) => {
        setGeneratingId(eventId);
        console.log("Generating report for event ID:", eventId); 
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/reports/generate/event/${eventId}`, {});
            alert("Report generated successfully!");
            navigate('/admin/reports');
        } catch (error) {
            console.error("Error generating report:", error); 
            alert("Error generating report.");
        } finally {
            setGeneratingId(null);
        }
    };

    const handleOpenModal = (event) => {
        setEventToDelete(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEventToDelete(null);
        setIsModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        if (eventToDelete) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${eventToDelete._id}`);
                setEvents(events.filter((event) => event._id !== eventToDelete._id));
            } catch (err) {
                alert("Error: Could not delete the event.");
            } finally {
                handleCloseModal();
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Upcoming': return 'bg-blue-100 text-blue-800';
            case 'Ongoing': return 'bg-green-100 text-green-800';
            case 'Completed': return 'bg-gray-100 text-gray-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };


    return (
        <AdminLayout activePage="Events Management" pageTitle="Events Management">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">All Events</h3>
                <Link to="/admin/add-event" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    <Plus size={18} />
                    <span>Add New Event</span>
                </Link>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Loading events...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event._id} className="bg-white rounded-lg shadow-md flex flex-col transition-shadow hover:shadow-xl overflow-hidden">
                            <img src={event.imageUrl || 'https://via.placeholder.com/400x200?text=Event+Image'} alt={event.title} className="w-full h-48 object-cover"/>
                            <div className="p-4 flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-bold text-gray-900 line-clamp-2">{event.title}</h4>
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusColor(event.status)}`}>
                                        {event.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                    <Calendar size={14} />
                                    <span>{formatDate(event.startDate)}</span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
                            </div>

                            <div className="bg-gray-50 p-3 border-t border-gray-200 flex justify-end items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleGenerateReport(event._id)}
                                    disabled={generatingId === event._id}
                                    className="flex items-center gap-1.5 px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 disabled:opacity-50 font-medium"
                                    title="Generate Report"
                                >
                                    {generatingId === event._id ? (
                                        <>Generating...</>
                                    ) : (
                                        <><Sparkles size={16} /> Generate Report</>
                                    )}
                                </button>
                                <Link to={`/admin/view-event/${event._id}`} title="View Details" className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full"><View size={18} /></Link>
                                <Link to={`/admin/edit-event/${event._id}`} title="Edit Event" className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full"><FilePenLine size={18} /></Link>
                                <button onClick={() => handleOpenModal(event)} title="Delete Event" className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 animate-fade-in">
                        <h3 className="text-lg font-medium text-gray-900">Delete Event</h3>
                        <p className="mt-2 text-sm text-gray-600">Are you sure you want to delete this event? This cannot be undone.</p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 rounded-md font-medium">Cancel</button>
                            <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-md font-medium">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default EventManagementDashboard;