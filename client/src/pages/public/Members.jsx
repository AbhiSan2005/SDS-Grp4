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
        setMembers(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch members.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <UserLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Members</h1>
          <p className="text-gray-600 mt-1">Meet our team — core members, volunteers and faculty.</p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">Loading members...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : members.length === 0 ? (
          <div className="text-gray-600">No members found.</div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((m) => (
              <MemberCard key={m._id || m.id} member={m} />
            ))}
          </section>
        )}
      </main>
    </UserLayout>
  );
};

export default Members;