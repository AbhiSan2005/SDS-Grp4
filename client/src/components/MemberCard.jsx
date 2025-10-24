import React from 'react';
import { RiGithubFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";

const MemberCard = ({ member }) => {
  const {
    name,
    role,
    portfolio,
    batch,
    branch,
    photo,
    expertise,
    socials,
  } = member || {};

  const placeholder = 'https://via.placeholder.com/400x400?text=Member+Photo';

  return (
    <article 
      className="backdrop-blur-lg bg-white/5 dark:bg-gray-800/30 
                 border border-gray-700/50 
                 rounded-2xl shadow-lg 
                 p-6 flex flex-col items-center text-center
                 transition-all duration-300 
                 hover:border-blue-500/80 hover:shadow-lg hover:shadow-blue-500/10"
    >
      <div 
        className="w-32 h-32 rounded-full overflow-hidden 
                   border-4 border-gray-700/80 
                   shadow-xl mb-4"
      >
        <img 
          src={photo || placeholder} 
          alt={name || 'Member photo'} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
      </div>

      <div className="flex-grow">
        <h4 className="text-xl font-bold text-white mb-1">{name || 'Anonymous'}</h4>
        <p className="text-sm text-blue-400 font-medium">{role || 'Member'} • {portfolio || 'Portfolio'}</p>
        <p className="text-sm text-gray-400 mt-1">Batch of {batch || '—'}</p>
        
        {/* Expertise Tags (Enhanced Styling) */}
        {expertise && expertise.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {expertise.slice(0, 4).map((exp, idx) => (
              <span 
                key={idx} 
                className="text-xs bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full font-medium"
              >
                {exp}
              </span>
            ))}
          </div>
        )}

        {/* Social Icons (Enhanced Styling) */}
        <div className="mt-4 flex items-center justify-center gap-4 text-2xl">
          {socials?.github && (
            <a 
              href={socials.github} 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <RiGithubFill />
            </a>
          )}
          {socials?.linkedin && (
            <a 
              href={socials.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default MemberCard;