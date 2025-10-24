import React from 'react';
import { Heart, Facebook, Linkedin, Twitter, Github, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob top-0 left-0"></div>
        <div className="absolute w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 bottom-0 left-1/4"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        <div className="flex flex-col items-center md:items-start">
          <a href="#" className="flex items-center gap-3 mb-4">
            <img
              src="https://imgs.search.brave.com/boW8rs8Ol_fUjOHPF6sR90Fcko1-xxpRvTqCfFU-vDs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2RzY29lcC5jbHVi/L3Nkcy5wbmc"
              alt="SDS Logo"
              className="h-12"
            />
            <span className="text-3xl font-bold text-white tracking-wide" style={{ fontFamily: "Alegreya, monospace" }}>SDS Portal</span>
          </a>
          <p className="text-sm mt-2 max-w-xs text-gray-500" style={{ fontFamily: "Delius, monospace" }}>
            Empowering the next generation of innovators through collaborative software development and cutting-edge technology at COEP.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: "Delius, monospace" }}>Get in Touch</h3>
          <ul className="space-y-3" style={{ fontFamily: "Delius, monospace" }}>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Mail size={20} className="text-blue-500" />
              <a href="mailto:sds@coep.ac.in" className="hover:text-white transition-colors">sds@coep.ac.in</a>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Phone size={20} className="text-blue-500" />
              <span>+91 12345 67890</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-blue-500">📍</span>
              <span>COEP Technological University, Pune</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: "Delius, monospace" }}>Connect & Follow</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="https://www.facebook.com/your-sds-page" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-blue-500 transition-colors">
              <Facebook size={28} />
            </a>
            <a href="https://www.linkedin.com/company/your-sds-page" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-blue-700 transition-colors">
              <Linkedin size={28} />
            </a>
            <a href="https://twitter.com/your-sds-page" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-blue-400 transition-colors">
              <Twitter size={28} />
            </a>
            <a href="https://github.com/your-sds-organization" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-gray-200 transition-colors">
              <Github size={28} />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center border-t border-gray-800 mt-12 pt-8" style={{ fontFamily: "Delius, monospace" }}>
        <p className="text-sm mb-2">
          © {new Date().getFullYear()} SDS, COEP. All Rights Reserved. Designed by SDS-GRP4
        </p>
        <p className="flex items-center justify-center gap-1.5 text-sm text-gray-500">
          Made with
          <Heart size={16} className="text-red-500 fill-current" />
          in COEP
        </p>
      </div>
    </footer>
  );
};

export default Footer;