import React from "react";
import "../styles/SideBar.css";

function SideBarItem({ icon, label, link }) {
  return (
    <li>
      <i className={icon}></i>
      <a href={link}>{label}</a>
    </li>
  );
}
export default SideBarItem;