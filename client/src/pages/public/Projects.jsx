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
        
        // Debug: Log the full response
        console.log('Full API Response:', res.data);
        console.log('Response type:', typeof res.data);
        console.log('Is Array?', Array.isArray(res.data));
        
        // Handle different response structures
        const projectsData = res.data?.data || res.data?.projects || res.data;
        
        console.log('Extracted projectsData:', projectsData);
        
        // Ensure we always set an array
        if (Array.isArray(projectsData)) {
          console.log('Setting projects array with length:', projectsData.length);
          setProjects(projectsData);
        } else if (projectsData && typeof projectsData === 'object') {
          // If it's a single object, wrap it in an array
          console.log('Wrapping single object in array');
          setProjects([projectsData]);
        } else {
          console.log('No valid data, setting empty array');
          setProjects([]);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.response?.data?.message || 'Failed to fetch projects.');
        setProjects([]); // Ensure projects is always an array
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <UserLayout />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px]"></div>
        </div>

        <header className="mb-12 text-center relative z-10">
          <h1 
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Quantum Lemon Bold, monospace" }}
          >
            Projects
          </h1>
          <p 
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "Delius, monospace" }}
          >
            A showcase of projects built by our members.
          </p>
        </header>

        {loading ? (
          <div 
            className="flex items-center justify-center py-20 text-gray-400 text-lg"
            style={{ fontFamily: "Delius, monospace" }}
          >
            Loading projects...
          </div>
        ) : error ? (
          <div 
            className="backdrop-blur-lg bg-red-900/20 border border-red-500/50 rounded-2xl p-6 text-red-400 text-center relative z-10"
            style={{ fontFamily: "Delius, monospace" }}
          >
            {error}
          </div>
        ) : projects.length === 0 ? (
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
                No Projects Found
              </h3>
              <p 
                className="text-gray-400"
                style={{ fontFamily: "Delius, monospace" }}
              >
                Check back soon for amazing projects from our members!
              </p>
            </div>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {projects.map((p) => (
              <ProjectCard key={p._id || p.id} project={p} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Projects;