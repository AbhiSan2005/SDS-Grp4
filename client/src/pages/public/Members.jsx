// ... (imports remain the same)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserLayout from '../../layouts/UserLayout.jsx';
import MemberCard from '../../components/MemberCard.jsx';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/members`);
        
        console.log('Members API Response:', res.data);
        console.log('Is Array?', Array.isArray(res.data));
        console.log('Length:', res.data?.length);
        
        // Ensure we always set an array
        if (Array.isArray(res.data)) {
          setMembers(res.data);
        } else {
          setMembers([]);
        }
      } catch (err) {
        console.error('Error fetching members:', err);
        setError(err.response?.data?.message || 'Failed to fetch members.');
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <UserLayout />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-600 rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-[150px]"></div>
        </div>

        <header className="mb-12 text-center relative z-10">
          <h1 
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Quantum Lemon Bold, monospace" }}
          >
            Members
          </h1>
          <p 
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "Delius, monospace" }}
          >
            Meet our team — core members, volunteers and faculty.
          </p>
        </header>

        {loading ? (
          <div 
            className="flex items-center justify-center py-20 text-gray-400 text-lg"
            style={{ fontFamily: "Delius, monospace" }}
          >
            Loading members...
          </div>
        ) : error ? (
          <div 
            className="backdrop-blur-lg bg-red-900/20 border border-red-500/50 rounded-2xl p-6 text-red-400 text-center relative z-10"
            style={{ fontFamily: "Delius, monospace" }}
          >
            {error}
          </div>
        ) : members.length === 0 ? (
          <div className="text-center relative z-10">
            <div 
              className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 
                         border border-white/20 dark:border-gray-700/50 
                         rounded-2xl shadow-lg p-12"
            >
              <h3 
                className="text-2xl font-semibold text-white mb-3"
                style={{ fontFamily: "Delius, monospace" }}
              >
                No Members Found
              </h3>
              <p 
                className="text-gray-400"
                style={{ fontFamily: "Delius, monospace" }}
              >
                Check back soon to meet our amazing team!
              </p>
            </div>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10">
            {members.map((m) => (
              <MemberCard key={m._id || m.id} member={m} />
            ))}
          </section>
        )}
      </main>
    </div>  
  );
};

export default Members;