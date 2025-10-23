import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, MapPin, Facebook, Linkedin, Twitter, Github, Phone, Heart } from 'lucide-react';
import WebsiteNavbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';

const ContactPage = () => {
  const [facultyAdvisor, setFacultyAdvisor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvisor = async () => {
      try {
        const membersRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/members`);
        const membersData = Array.isArray(membersRes.data) ? membersRes.data : [];
        const faculty = membersData.find((m) => m.role === "Faculty Advisor");
        setFacultyAdvisor(faculty);
      } catch (error) {
        console.error("Error fetching faculty advisor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisor();
  }, []);

  return (
    <div className="bg-gray-950 text-gray-300 min-h-screen" style={{ fontFamily: "Delius, monospace" }}>
      <WebsiteNavbar />

      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15" aria-hidden="true">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px]"></div>
        </div>
        
        <div className="relative z-10 container mx-auto max-w-7xl px-6">
          
          <div className="text-center mb-16">
            <h1 
              className="text-5xl md:text-6xl font-bold text-white" 
              style={{ fontFamily: "Quantum Lemon Bold, monospace" }}
            >
              Contact Us
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
              Find our faculty advisor, location, and social media links below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-16 max-w-3xl mx-auto">
            
            <div className="w-full">
              <h2 className="text-3xl font-bold text-white mb-6 text-center" style={{ fontFamily: "Quantum Lemon Bold, monospace" }}>
                Faculty Advisor
              </h2>
              <div className="backdrop-blur-lg bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 shadow-lg">
                {loading ? (
                  <div className="text-center py-10">Loading Advisor...</div>
                ) : facultyAdvisor ? (
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={facultyAdvisor.photo || 'https://via.placeholder.com/150?text=Advisor'}
                      alt={facultyAdvisor.name}
                      className="w-32 h-32 rounded-full mb-6 object-cover border-4 border-blue-400"
                    />
                    <h3 className="text-2xl font-bold text-white">{facultyAdvisor.name}</h3>
                    <p className="text-blue-400 font-semibold">{facultyAdvisor.role}</p>
                    <p className="text-gray-300 text-sm mt-2">{facultyAdvisor.portfolio}</p>
                    
                    <div className="mt-6 pt-6 border-t border-gray-700/50 w-full space-y-3">
                      <a href={`mailto:${facultyAdvisor.email}`} className="flex items-center justify-center gap-3 text-gray-300 hover:text-white transition-colors">
                        <Mail size={18} />
                        <span>{facultyAdvisor.email}</span>
                      </a>
                      {facultyAdvisor.contactNumber && (
                        <div className="flex items-center justify-center gap-3">
                          <Phone size={18} />
                          <span>{facultyAdvisor.contactNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">Faculty Advisor information not available.</div>
                )}
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-3xl font-bold text-white mb-6 text-center" style={{ fontFamily: "Quantum Lemon Bold, monospace" }}>
                Our Location
              </h2>
              <div className="backdrop-blur-lg bg-gray-800/30 border border-gray-700/50 rounded-2xl p-4 shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.125292305314!2d73.8546571148927!3d18.5233150874068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0883cb2b131%3A0x8680193c6faf97c5!2sCOEP%20Technological%20University!5e0!3m2!1sen!2sin!4v1671234567890!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
          </div>

          <div className="mt-20 pt-12 border-t border-gray-700/50 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: "Quantum Lemon Bold, monospace" }}>
              Reach Out Directly
            </h2>
            
            <div className="space-y-6 max-w-lg mx-auto mb-10">
              <a href="mailto:sds@coep.ac.in" className="flex items-center justify-center gap-4 text-gray-300 hover:text-white transition-colors text-left">
                <Mail size={24} className="text-blue-400 flex-shrink-0" />
                <span className="text-lg">sds@coep.ac.in</span>
              </a>
              <div className="flex items-start justify-center gap-4 text-left">
                <MapPin size={24} className="text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-lg">
                  COEP Technological University, Shivajinagar, Pune
                </span>
              </div>
            </div>
            
            <div className="flex justify-center items-center space-x-8">
              <a href="https://github.com/your-sds-organization" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={32} />
              </a>
              <a href="https://www.linkedin.com/company/your-sds-page" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                <Linkedin size={32} />
              </a>
              <a href="https://twitter.com/your-sds-page" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={32} />
              </a>
              <a href="https://www.facebook.com/your-sds-page" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook size={32} />
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700/50 text-sm text-gray-500">
              <p className="mb-2">
                © 2025 SDS, COEP. All Rights Reserved. Designed by SDS-GRP4
              </p>
              <p className="flex items-center justify-center gap-1.5">
                Made with
                <Heart size={16} className="text-red-500 fill-current" />
                in COEP
              </p>
            </div>

          </div>
          
        </div>
      </section>

    </div>
  );
};

export default ContactPage;