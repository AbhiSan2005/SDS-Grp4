import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserLayout from '../../layouts/UserLayout.jsx';
import ProjectCard from '../../components/ProjectCard.jsx';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
        setProjects(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <UserLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          <p className="text-gray-600 mt-1">A showcase of projects built by our members.</p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">Loading projects...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : projects.length === 0 ? (
          <div className="text-gray-600">No projects found.</div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p._id || p.id} project={p} />
            ))}
          </section>
        )}
      </main>
    </UserLayout>
  );
};

export default Projects;