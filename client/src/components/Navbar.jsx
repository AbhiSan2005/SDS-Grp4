import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";

const WebsiteNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Members", href: "/members" },
    { name: "Projects", href: "/projects" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <nav className="sticky top-4 z-50 w-full px-6 sm:px-6 lg:px-8" style={{ fontFamily: "Delius, monospace" }}>
      <div className="max-w-7xl mx-auto bg-gray-900/60 backdrop-blur-lg border border-white/10 rounded-full shadow-lg">
        <div className="flex items-center justify-between h-14 px-6">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://imgs.search.brave.com/boW8rs8Ol_fUjOHPF6sR90Fcko1-xxpRvTqCfFU-vDs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2RzY29lcC5jbHVi/L3Nkcy5wbmc"
                alt="Logo"
                className="h-10"
              />
              <span className="text-3xl font-bold text-white" style={{ fontFamily: "Alegreya, monospace" }}>SDS Portal</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `font-medium transition-colors pb-1 ${
                    isActive
                      ? 'text-white border-b-2 border-blue-400'
                      : 'text-gray-300 hover:text-white border-b-2 border-transparent'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/request-project"
              className="px-4 py-2 bg-white text-gray-900 rounded-md hover:bg-gray-200 transition-colors font-semibold text-sm shadow"
            >
              Request a Project
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-colors text-sm"
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2" id="mobile-menu">
          <div className="max-w-7xl mx-auto bg-gray-900/60 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-white/20'
                        : 'text-gray-300 hover:bg-white/10'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                <Link
                  to="/request-project"
                  className="block w-full text-center px-4 py-2 bg-white text-gray-900 rounded-md hover:bg-gray-200 font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Request a Project
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 text-gray-300 hover:bg-white/10 rounded-md font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default WebsiteNavbar;