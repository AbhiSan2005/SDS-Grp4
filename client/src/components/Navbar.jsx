import React, { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react'; // Added LogIn icon

const WebsiteNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Members', href: '/members' },
    { name: 'Projects', href: '/projects' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-gray-800">
              SDS Portal
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA & Login Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/Request_Project"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold text-sm"
            >
              Request a Project
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
            >
              <LogIn size={16} />
              <span>Login</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <a
                href="#"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
              >
                Request a Project
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md font-medium"
              >
                <LogIn size={18} />
                <span>Login</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default WebsiteNavbar;