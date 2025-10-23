import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserLayout from '../../layouts/UserLayout.jsx';
import EventCard from '../../components/EventCard.jsx';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
        
        // Ensure we always set an array
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.response?.data?.message || 'Failed to fetch events.');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <UserLayout />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Events</h1>
          <p className="text-gray-600 mt-1">Upcoming and past events from the SDS Portal.</p>
        </header>
        {loading ? (
          <div className="flex items-center justify-center py-20">Loading events...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : events.length === 0 ? (
          <div className="text-gray-600">No events found.</div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => (
              <EventCard key={ev._id || ev.id} event={ev} />
            ))}
          </section>
        )}
      </main>  
    </div>
  );
};

export default EventsPage;