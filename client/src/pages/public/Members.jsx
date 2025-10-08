import React, { useState } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

const TeamCard = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 ease-out"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo */}
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
          {member.name}
        </h3>
        
        <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
          {member.role}
        </p>
        
        <p className="text-sm text-gray-600 leading-relaxed">
          {member.expertise}
        </p>
        
        <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {member.experience}
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {member.location}
          </span>
        </div>
      </div>

      {/* Social Links */}
      <div className={`flex gap-3 mt-4 pt-4 border-t border-gray-100 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <a href={member.email} className="p-2 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-colors">
          <Mail size={16} />
        </a>
        <a href={member.linkedin} className="p-2 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-colors">
          <Linkedin size={16} />
        </a>
        <a href={member.github} className="p-2 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-colors">
          <Github size={16} />
        </a>
      </div>
    </div>
  );
};

const TeamMembersPage = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      expertise: "Full-stack development with focus on React, Node.js, and cloud architecture",
      experience: "8+ years",
      location: "San Francisco",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      email: "mailto:sarah@example.com",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Michael Rodriguez",
      role: "UI/UX Designer",
      expertise: "Creating intuitive and beautiful user experiences with modern design systems",
      experience: "6+ years",
      location: "New York",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      email: "mailto:michael@example.com",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Emily Watson",
      role: "Product Manager",
      expertise: "Strategic product development and agile team leadership",
      experience: "10+ years",
      location: "London",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      email: "mailto:emily@example.com",
      linkedin: "#",
      github: "#"
    },
    {
      name: "James Kumar",
      role: "Backend Engineer",
      expertise: "Scalable microservices, databases, and API development",
      experience: "7+ years",
      location: "Bangalore",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      email: "mailto:james@example.com",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Lisa Martinez",
      role: "DevOps Engineer",
      expertise: "CI/CD pipelines, Kubernetes, and cloud infrastructure automation",
      experience: "5+ years",
      location: "Austin",
      photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      email: "mailto:lisa@example.com",
      linkedin: "#",
      github: "#"
    },
    {
      name: "David Park",
      role: "Data Scientist",
      expertise: "Machine learning, predictive analytics, and data visualization",
      experience: "6+ years",
      location: "Seattle",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      email: "mailto:david@example.com",
      linkedin: "#",
      github: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Talented individuals working together to create exceptional experiences
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMembersPage;