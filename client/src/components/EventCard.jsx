import React from 'react';
import { MapPin, ArrowRight, Clock } from 'lucide-react';


const formatEventDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.toLocaleDateString('en-US', { day: '2-digit' });
    return { month, day };
  } catch (err) {
    return { month: 'N/A', day: '?' };
  }
};


const formatEventTime = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch (err) {
    return 'Time TBD';
  }
};

const UpcomingEventCard = ({ event }) => {
  const {
    title,
    startDate,
    location, 
  } = event || {};

  const { month, day } = formatEventDate(startDate);
  const time = formatEventTime(startDate);

  return (
    <article 
      className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 
                 border border-white/20 dark:border-gray-700/50 
                 rounded-2xl shadow-lg 
                 flex items-center 
                 p-6 gap-6
                 transition-all duration-300 
                 hover:border-blue-500/80 hover:shadow-lg hover:shadow-blue-500/10"
    >
      <div 
        className="flex-shrink-0 flex flex-col items-center justify-center 
                   w-20 h-20 bg-gray-900/60 border border-gray-700/50 rounded-lg"
      >
        <span className="text-2xl font-bold text-blue-400">{day}</span>
        <span className="text-sm font-semibold text-gray-300">{month}</span>
      </div>

      <div className="flex-1 flex flex-col justify-center self-stretch">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          <a href="#" className="hover:text-blue-400 transition-colors">
            {title || 'Untitled Event'}
          </a>
        </h3>
        
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock size={16} className="text-gray-500" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={16} className="text-gray-500" />
            <span>{location || 'Venue TBD'}</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <a
            href="#" 
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            View Details
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </article>
  );
};

export default UpcomingEventCard;