import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Code, Calendar, Users } from 'lucide-react';
import WebsiteNavbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';

const AboutPage = () => {
  return (
    <div className="bg-gray-950 text-gray-300 min-h-screen" style={{ fontFamily: "Delius, monospace" }}>
      <WebsiteNavbar />

      <section className="relative h-[60vh] w-full flex items-center justify-center text-center overflow-hidden">
        <div className="relative z-10 p-6">
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            style={{ fontFamily: "Quantum Lemon Bold, monospace" }}
          >
            About SDS
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            SDS is a team of students who take up projects with the aim of resolving technical needs of the college.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15" aria-hidden="true">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="backdrop-blur-lg bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <Target className="text-blue-400" /> Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To provide a dynamic platform for students to learn cutting-edge technologies, collaborate on impactful real-world projects, participate in stimulating coding events, and connect with peers and industry professionals.
            </p>
          </div>
          <div className="backdrop-blur-lg bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye className="text-purple-400" /> Our Vision
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To promote in-house development of technological solutions and provide a platform for software development to students.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "Quantum Lemon Bold, monospace" }}
            >
              What We Do
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We build, learn, and grow as a community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="backdrop-blur-lg bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 text-center transition-all duration-300 hover:border-blue-500/80 hover:shadow-lg hover:shadow-blue-500/10">
              <Code className="text-blue-400 h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Real-World Projects</h3>
              <p className="text-gray-400">Collaborate in teams to build diverse software projects, gaining hands-on experience and creating portfolio-worthy work.</p>
            </div>
            <div className="backdrop-blur-lg bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 text-center transition-all duration-300 hover:border-green-500/80 hover:shadow-lg hover:shadow-green-500/10">
              <Calendar className="text-green-400 h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Workshops & Events</h3>
              <p className="text-gray-400">Organize and participate in workshops, hackathons, coding competitions, and guest lectures from industry experts.</p>
            </div>
            <div className="backdrop-blur-lg bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 text-center transition-all duration-300 hover:border-purple-500/80 hover:shadow-lg hover:shadow-purple-500/10">
              <Users className="text-purple-400 h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Community Building</h3>
              <p className="text-gray-400">Foster a supportive and inclusive network where members can share knowledge, mentor each other, and grow together.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;