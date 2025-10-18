import React from "react";
import "../styles/SocialMedia.css"

function SocialMedia() {
    const socials = [
    { icon: "fa-brands fa-facebook", link: "https://www.facebook.com/sdscoep#" },
    { icon: "fa-brands fa-linkedin", link: "https://www.linkedin.com/company/sdscoep/#" },
    { icon: "fa-brands fa-twitter", link: "https://x.com/sdscoep" },
    { icon: "fa-brands fa-git", link: "https://gitlab.com/sdscoep" },
    ]

    return (
    <div className="social_media">
      <ul>
        {socials.map((social, idx) => (
        <a  
          key={idx}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="social_icon"
        >
          <i className={social.icon}></i>
        </a>
        ))}
      </ul>
    </div>
  );
}

export default SocialMedia;