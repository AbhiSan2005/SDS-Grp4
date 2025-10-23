import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import WebsiteNavbar from "../../components/Navbar.jsx";
import ProjectCard from "../../components/ProjectCard.jsx";
import EventCard from "../../components/EventCard.jsx";
import Prism from "../../components/Prism.jsx";
import Footer from "../../components/Footer.jsx";
import { Layers, Calendar, Users } from "lucide-react";

const Home = () => {
  const [stats, setStats] = useState({ projects: 0, events: 0, members: 0 });
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [facultyAdvisor, setFacultyAdvisor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, eventsRes, membersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/projects`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/events`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/members`),
        ]);

        const projectsData = Array.isArray(projectsRes.data)
          ? projectsRes.data
          : [];
        const eventsData = Array.isArray(eventsRes.data) ? eventsRes.data : [];
        const membersData = Array.isArray(membersRes.data)
          ? membersRes.data
          : [];

        setStats({
          projects: projectsData.length,
          events: eventsData.length,
          members: membersData.length,
        });

        const sortedProjects = [...projectsData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const sortedEvents = [...eventsData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setFeaturedProjects(sortedProjects.slice(0, 3));
        setFeaturedEvents(sortedEvents.slice(0, 3));

        const faculty = membersData.find((m) => m.role === "Faculty Advisor");
        setFacultyAdvisor(faculty);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const statsItems = [
    {
      label: "Active Projects",
      value: stats.projects,
      icon: <Layers size={40} className="text-blue-400" />,
    },
    {
      label: "Events Organized",
      value: stats.events,
      icon: <Calendar size={40} className="text-green-400" />,
    },
    {
      label: "Active Members",
      value: stats.members,
      icon: <Users size={40} className="text-purple-400" />,
    },
  ];

  return (
    <div className="bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <WebsiteNavbar />

      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Prism
          animationType="rotate"
          timeScale={0.7}
          height={4.3}
          baseWidth={6.0}
          scale={3.3}
          hueShift={0}
          colorFrequency={1.75}
          noise={0}
          glow={1}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
          <h1
            className="text-4xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight text-white drop-shadow-md"
            style={{
              textShadow:
                "0 0 4px rgba(255,255,255,0.25), 0 0 18px rgba(255,255,255,0.15)",
              fontFamily: "Quantum Lemon Bold, monospace",
            }}
          >
            Software Development Section
          </h1>

          <p
            className="text-lg md:text-xl mb-8 text-blue-100 max-w-3xl mx-auto"
            style={{ fontFamily: "Delius, monospace" }}
          >
            The official club for software development of COEP Tech
          </p>

          <p
            className="text-2xl md:text-3xl font-medium mb-10 text-white max-w-3xl mx-auto drop-shadow-lg"
            style={{ fontFamily: "Cookie, monospace" }}
          >
            "Where a spectrum of minds blend to ignite creativity and
            innovation."
          </p>

          <div
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            style={{ fontFamily: "Delius, monospace" }}
          >
            <Link
              to="/about"
              className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Know More
            </Link>
            <a
              href="#upcoming-events"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 hover:-translate-y-0.5 transition-all"
            >
              Upcoming Events
            </a>
          </div>
        </div>
      </div>

      <section className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15" aria-hidden="true">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px]"></div>
        </div>

        <div
          className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
          style={{ fontFamily: "Delius, monospace" }}
        >
          {statsItems.map((item, i) => (
            <div
              key={i}
              className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 
                       border border-white/20 dark:border-gray-700/50 
                       rounded-2xl shadow-lg 
                       p-8 
                       transition-all duration-300 
                       hover:border-blue-500/80 hover:shadow-lg hover:shadow-blue-500/10
                       flex items-center justify-between"
            >
              <div className="flex-shrink-0">{item.icon}</div>

              <div className="text-right">
                <div className="text-5xl font-bold text-white">
                  {loading ? "..." : item.value}
                </div>
                <div className="text-gray-400 text-lg font-medium mt-1">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="py-20 bg-gray-90 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-15" aria-hidden="true">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-[150px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2
                className="text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "Quantum Lemon Bold, monospace" }}
              >
                Featured Projects
              </h2>
              <p
                className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
                style={{ fontFamily: "Delius, monospace" }}
              >
                Check out the latest work our members have been building.
              </p>
              <Link
                to="/projects"
                className="text-blue-400 border border-blue-400 rounded-full px-6 py-2 
                           font-semibold hover:bg-blue-400/10 hover:text-white 
                           transition-all duration-300"
                style={{ fontFamily: "Delius, monospace" }}
              >
                View All Projects
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="py-20 bg-gray-950 relative overflow-hidden"
        id="upcoming-events"
      >
        <div className="absolute inset-0 z-0 opacity-15" aria-hidden="true">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-600 rounded-full filter blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2
              className="text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "Quantum Lemon Bold, monospace" }}
            >
              Upcoming Events
            </h2>
            <p
              className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
              style={{ fontFamily: "Delius, monospace" }}
            >
              Join us for our next workshop, hackathon, or tech talk.
            </p>
            <Link
              to="/events"
              className="text-blue-400 border border-blue-400 rounded-full px-6 py-2 
                         font-semibold hover:bg-blue-400/10 hover:text-white 
                         transition-all duration-300"
              style={{ fontFamily: "Delius, monospace" }}
            >
              View All Events
            </Link>
          </div>

          <div className="max-w-3xl mx-auto">
            {featuredEvents.length > 0 ? (
              <div className="relative">
                <div
                  className="absolute left-10 top-0 h-full w-0.5 bg-gray-700"
                  aria-hidden="true"
                ></div>

                {featuredEvents.map((event) => (
                  <div key={event._id} className="relative mb-8 last:mb-0">
                    <div
                      className="absolute left-10 top-9 w-4 h-4 -translate-x-1/2 rounded-full 
                                 bg-blue-500 ring-8 ring-gray-950 z-10"
                    ></div>

                    <div className="ml-20">
                      <EventCard event={event} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <div
                  className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 
                             border border-white/20 dark:border-gray-700/50 
                             rounded-2xl shadow-lg p-12"
                >
                  <h3
                    className="text-2xl font-semibold text-white mb-3"
                    style={{ fontFamily: "Delius, monospace" }}
                  >
                    No Upcoming Events
                  </h3>
                  <p
                    className="text-gray-400"
                    style={{ fontFamily: "Delius, monospace" }}
                  >
                    Check back soon for new workshops, hackathons, and tech
                    talks!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
