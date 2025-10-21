import React from 'react';
import { RiGithubFill } from "react-icons/ri";

const ProjectCard = ({ project }) => {
  const { title, description, image, link, githubLink, technologies, members } = project || {};
  const placeholder = 'https://via.placeholder.com/800x450?text=Project+Image'; // will update later

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="w-full h-44 overflow-hidden">
        <img src={image || placeholder} alt={title || 'Project image'} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{title || 'Untitled Project'}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description || 'No description provided.'}</p>

        {technologies && technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {technologies.slice(0, 6).map((tech, idx) => (
              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">{tech}</span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <RiGithubFill /> <span className="text-sm">Repo</span>
              </a>
            )}
            {link && (
              <a href={link} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:text-blue-700">Live Demo</a>
            )}
          </div>

          <div className="text-sm text-gray-500">{members ? (Array.isArray(members) ? `${members.length} member(s)` : 'Members info') : ''}</div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;