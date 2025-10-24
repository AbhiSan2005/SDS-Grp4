import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Users, FolderKanban, Calendar, FileText, PlusCircle, AlertTriangle, MapPin } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        members: 0,
        projects: 0,
        upcomingEventsCount: 0,
        pendingReports: 0,
    });
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [membersRes, projectsRes, eventsRes, reportsRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/api/members`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/projects`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/events?sort=startDate`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/reports`),
                ]);

                const upcoming = eventsRes.data
                                   .filter(event => new Date(event.startDate) >= new Date() && event.status === 'Upcoming')
                                   .slice(0, 3);

                const pendingReportsCount = reportsRes.data.filter(report => report.status === 'Pending').length;

                setStats({
                    members: membersRes.data.length,
                    projects: projectsRes.data.length,
                    upcomingEventsCount: upcoming.length,
                    pendingReports: pendingReportsCount,
                });

                setUpcomingEvents(upcoming);

            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                setError("Could not load dashboard data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const statCards = [
        { title: 'Total Members', value: stats.members, icon: <Users />, link: '/admin/members' },
        { title: 'Total Projects', value: stats.projects, icon: <FolderKanban />, link: '/admin/projects' },
        { title: 'Upcoming Events', value: stats.upcomingEventsCount, icon: <Calendar />, link: '/admin/events' },
        { title: 'Pending Reports', value: stats.pendingReports, icon: <FileText />, link: '/admin/reports' },
    ];
    const quickActions = [
        { label: 'Add New Member', link: '/admin/add-member' },
        { label: 'Add New Project', link: '/admin/add-project' },
        { label: 'Create New Event', link: '/admin/events/new' },
        { label: 'Upload Report', link: '/admin/reports' },
    ];

     const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };


    return (
        <AdminLayout activePage="Dashboard" pageTitle="Dashboard">
            {error && (
                 <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold mr-2"><AlertTriangle size={18} className="inline-block"/> Error:</strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat) => (
                        <Link to={stat.link} key={stat.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <p className={`text-3xl font-bold text-gray-800 ${loading ? 'animate-pulse text-gray-300' : ''}`}>
                                    {loading ? '...' : stat.value}
                                </p>
                            </div>
                            <div className={`p-3 rounded-full ${loading ? 'bg-gray-100 text-gray-300' : 'bg-blue-100 text-blue-600'}`}>
                                {React.cloneElement(stat.icon, { size: 24 })}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {quickActions.map((action) => (
                                <Link key={action.label} to={action.link} className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-blue-200">
                                    <PlusCircle className="text-blue-500 mb-2" size={28} />
                                    <span className="text-sm font-medium text-center text-gray-700">{action.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Calendar size={20} /> Upcoming Events
                        </h3>
                        {loading ? (
                            <p className="text-sm text-gray-500">Loading events...</p>
                        ) : upcomingEvents.length > 0 ? (
                            <ul className="space-y-3">
                                {upcomingEvents.map((event) => (
                                    <li key={event._id} className="flex items-center justify-between pb-2 border-b border-gray-100 last:border-b-0 gap-4">
                                        <div className="flex-grow min-w-0">
                                            <Link to={`/admin/view-event/${event._id}`} className="text-sm font-medium text-gray-800 hover:text-blue-600 block truncate" title={event.title}>
                                                {event.title}
                                            </Link>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 truncate"><MapPin size={12}/> {event.location}</p>
                                        </div>
                                        <div className="text-sm text-gray-600 font-medium whitespace-nowrap bg-gray-100 px-2 py-0.5 rounded flex-shrink-0">
                                            {formatDate(event.startDate)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No upcoming events scheduled.</p>
                        )}
                        <Link to="/admin/events" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
                            View All Events &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;