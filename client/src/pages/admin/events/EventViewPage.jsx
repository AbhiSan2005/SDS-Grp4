import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout.jsx'; 
import axios from 'axios';
import { Calendar, MapPin, User, Image as ImageIcon, Info } from 'lucide-react'; 

const EventViewPage = () => {
    const { id } = useParams(); 
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${id}`);
                setEvent(response.data);
            } catch (err) {
                console.error("Failed to fetch event:", err);
                setError("Could not fetch event details. It might not exist.");
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]); 

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true
        });
    };

    if (loading) return <AdminLayout pageTitle="Loading..."><p className="text-center">Loading event details...</p></AdminLayout>;
    if (error) return <AdminLayout pageTitle="Error"><p className="text-center text-red-500">{error}</p></AdminLayout>;
    if (!event) return <AdminLayout pageTitle="Not Found"><p className="text-center">Event not found.</p></AdminLayout>;

    return (
        <AdminLayout activePage="Events Management" pageTitle="Event Details">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                event.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                                event.status === 'Ongoing' ? 'bg-green-100 text-green-800' :
                                event.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800' 
                            }`}>{event.status}</span>
                            <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                        </div>
                    </div>
                    <Link
                        to={`/admin/events/edit/${event._id}`}
                        className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                    >
                        Edit Event
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={event.imageUrl || 'https://via.placeholder.com/800x400?text=Event+Banner'}
                                alt={`${event.title} Banner`}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Description</h3>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{event.description}</p>
                            </div>
                            {event.agenda && (
                                <div className="p-6 border-t">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Agenda</h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{event.agenda}</p>
                                </div>
                            )}
                        </div>
                         {event.gallery && event.gallery.length > 0 && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2"><ImageIcon size={20}/> Gallery</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {event.gallery.map((imgUrl, index) => (
                                        <a key={index} href={imgUrl} target="_blank" rel="noopener noreferrer">
                                            <img src={imgUrl} alt={`Event gallery image ${index + 1}`} className="w-full h-32 object-cover rounded-md hover:opacity-80 transition-opacity"/>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"><Info size={20}/> Details</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start">
                                    <Calendar size={16} className="text-gray-500 mr-3 mt-0.5 flex-shrink-0"/>
                                    <div>
                                        <span className="font-semibold text-gray-800">Start:</span> {formatDateTime(event.startDate)}
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <Calendar size={16} className="text-gray-500 mr-3 mt-0.5 flex-shrink-0"/>
                                    <div>
                                        <span className="font-semibold text-gray-800">End:</span> {formatDateTime(event.endDate)}
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <MapPin size={16} className="text-gray-500 mr-3 mt-0.5 flex-shrink-0"/>
                                    <div>
                                        <span className="font-semibold text-gray-800">Location:</span> {event.location}
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <User size={16} className="text-gray-500 mr-3 mt-0.5 flex-shrink-0"/>
                                    <div>
                                        <span className="font-semibold text-gray-800">Organizer:</span> {event.organizer}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EventViewPage;