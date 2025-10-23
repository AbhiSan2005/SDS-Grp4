import React from 'react';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const { title, description, image, link } = project || {};
  const placeholder = 'https://via.placeholder.com/800x450?text=Project+Image';
  
  const primaryLink = link || '#';

  return (
    <article 
      className="relative rounded-2xl shadow-lg overflow-hidden 
                 group // Used for hover effects
                 transition-all duration-300 
                 border border-gray-700/50
                 hover:border-blue-500/80 hover:shadow-blue-500/20"
    >
      <img 
        src={image || placeholder} 
        alt={title || 'Project image'} 
        className="absolute inset-0 w-full h-full object-cover 
                   transition-transform duration-300 ease-in-out 
                   group-hover:scale-105" 
      />
      
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
        aria-hidden="true"
      ></div>

      <div 
        className="relative z-10 p-6 flex flex-col justify-end 
                   h-80" 
      >
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            <a 
              href={primaryLink} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-blue-400 transition-colors"
            >
              {title || 'Untitled Project'}
            </a>
          </h3>
          
          <p className="text-sm text-gray-300 line-clamp-2 mb-4">
            {description || 'No description provided.'}
          </p>
          
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 text-sm font-medium
                         bg-blue-600 text-white px-4 py-2 rounded-full
                         hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
              title="View Live Demo"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;