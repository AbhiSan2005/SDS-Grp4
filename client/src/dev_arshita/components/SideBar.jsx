import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import SocialMedia from "./SocialMedia";
import "../styles/Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { icon: "fa-solid fa-house", label: "Home", link: "#" },
    { icon: "fa-solid fa-circle-info", label: "About", link: "#" },
    { icon: "fa-solid fa-folder-open", label: "Projects", link: "#" },
    { icon: "fa-solid fa-calendar-days", label: "Sessions", link: "#" },
    { icon: "fa-solid fa-users", label: "Team", link: "http://localhost:5174/" },
    { icon: "fa-solid fa-phone", label: "Contact", link: "#" },
    { icon: "fa-regular fa-comments", label: "Feedback", link: "#" },
  ];

  return (
    <>
      {!isOpen && (
        <div className="btn_one" onClick={() => setIsOpen(true)}>
          <i className="fa-solid fa-bars"></i>
        </div>
      )}
      

      {/* Sidebar */}
      <div className={`sidebar_menu ${isOpen ? "open" : ""}`}>
        {/* Close button */}
        <div className="btn_two" onClick={() => setIsOpen(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>

        {/* Logo + Hamburger inline inside sidebar */}
        <div className="sidebar_header">
          <i className="fa-solid fa-bars btn_inside_sidebar" onClick={() => setIsOpen(false)}></i>
          <span className="sidebar_logo">SDS COEP</span>
        </div>

        <div className="menu">
          <ul>
            {items.map((item, idx) => (
              <SidebarItem
                key={idx}
                icon={item.icon}
                label={item.label}
                link={item.link}
              />
            ))}
          </ul>
        </div>
        {/* Social Media Section */}
        <SocialMedia />
      </div>
    </>
  );
}

export default Sidebar;
