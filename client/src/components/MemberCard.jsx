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

  const placeholder = 'https://via.placeholder.com/400x400?text=Member+Photo'; // will update later

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center text-center">
      <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-100">
        <img src={photo || placeholder} alt={name || 'Member photo'} className="w-full h-full object-cover" />
      </div>

      <div className="mt-3">
        <h4 className="text-md font-semibold text-gray-800">{name || 'Anonymous'}</h4>
        <p className="text-sm text-gray-500">{role || 'Member'} • {portfolio || 'Portfolio'}</p>
        <p className="text-sm text-gray-500">Batch of {batch || '—'}</p>
        {expertise && expertise.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 justify-center">
            {expertise.slice(0, 5).map((exp, idx) => (
              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">{exp}</span>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center gap-3">
          {socials?.github && (
            <a href={socials.github} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900">
              <RiGithubFill />
            </a>
          )}
          {socials?.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">
              <FaLinkedin />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default MemberCard;