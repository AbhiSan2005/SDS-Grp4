import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout.jsx';
import ProjectCard from '../../components/ProjectCard.jsx';
import EventCard from '../../components/EventCard.jsx';

const Home = () => {
  const [stats, setStats] = useState({ projects: 0, events: 0, members: 0 });
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [facultyAdvisor, setFacultyAdvisor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [projectsRes, eventsRes, membersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/projects`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/events`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/members`)
        ]);

        // Set counts
        const projectsData = Array.isArray(projectsRes.data) ? projectsRes.data : [];
        const eventsData = Array.isArray(eventsRes.data) ? eventsRes.data : [];
        const membersData = Array.isArray(membersRes.data) ? membersRes.data : [];

        setStats({
          projects: projectsData.length,
          events: eventsData.length,
          members: membersData.length
        });

        // Sort by most recent (using createdAt) and get first 3
        const sortedProjects = [...projectsData].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        const sortedEvents = [...eventsData].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );

        setFeaturedProjects(sortedProjects.slice(0, 3));
        setFeaturedEvents(sortedEvents.slice(0, 3));

        // Find faculty advisor (role must be exactly "Faculty Advisor")
        const faculty = membersData.find(m => m.role === 'Faculty Advisor');
        setFacultyAdvisor(faculty);

      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <UserLayout />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              SOFTWARE DEVELOPMENT SECTION, COEP PUNE
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-50 max-w-3xl mx-auto leading-relaxed">
              The official club for software development of COEP Tech
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/projects" 
                className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
              >
                View Projects
              </Link>
              <Link 
                to="/events" 
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors duration-200 border-2 border-white"
              >
                Upcoming Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {loading ? '...' : stats.projects}
              </div>
              <div className="text-gray-600 text-lg">Active Projects</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {loading ? '...' : stats.events}
              </div>
              <div className="text-gray-600 text-lg">Events Organized</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {loading ? '...' : stats.members}
              </div>
              <div className="text-gray-600 text-lg">Active Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Advisor Section */}
      {facultyAdvisor && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Faculty Advisor</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
            <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-8 text-center shadow-md">
              {facultyAdvisor.photo ? (
                <img 
                  src={facultyAdvisor.photo} 
                  alt={facultyAdvisor.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-600"
                />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-blue-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-blue-700">
                  {facultyAdvisor.name.charAt(0)}
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{facultyAdvisor.name}</h3>
              <p className="text-blue-600 font-semibold mb-1">{facultyAdvisor.role}</p>
              <p className="text-gray-600 mb-1">{facultyAdvisor.portfolio} Portfolio</p>
              <p className="text-gray-500 text-sm mb-3">{facultyAdvisor.branch}</p>
              {facultyAdvisor.email && (
                <a 
                  href={`mailto:${facultyAdvisor.email}`}
                  className="text-blue-600 hover:text-blue-700 mt-2 inline-block text-sm"
                >
                  {facultyAdvisor.email}
                </a>
              )}
              {facultyAdvisor.contactNumber && (
                <p className="text-gray-600 text-sm mt-2">📞 {facultyAdvisor.contactNumber}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Projects</h2>
                <div className="w-20 h-1 bg-blue-600"></div>
              </div>
              <Link 
                to="/projects" 
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
              >
                View All
                <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Events Section */}
      {featuredEvents.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Upcoming Events</h2>
                <div className="w-20 h-1 bg-blue-600"></div>
              </div>
              <Link 
                to="/events" 
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
              >
                View All
                <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About/CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 text-blue-50">
            Be part of a vibrant community of developers, designers, and innovators. 
            Collaborate on exciting projects and enhance your skills.
          </p>
          <Link 
            to="/contact" 
            className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 inline-block shadow-lg"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;