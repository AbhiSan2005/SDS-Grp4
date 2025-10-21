import React from 'react';

const EventCard = ({ event }) => {
  const {
    title,
    description,
    startDate,
    endDate,
    location,
    organizer,
    status,
    imageUrl,
    gallery,
  } = event || {};

  const placeholder = 'https://via.placeholder.com/800x450?text=Event+Image'; // will update later

  const formatDateRange = (s, e) => {
    try {
      const sd = s ? new Date(s) : null;
      const ed = e ? new Date(e) : null;
      if (!sd && !ed) return 'Date not available';
      if (sd && ed) return `${sd.toLocaleString()} — ${ed.toLocaleString()}`;
      if (sd) return sd.toLocaleString();
      return ed.toLocaleString();
    } catch (err) {
      return 'Date not available';
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="w-full h-48 md:h-52 lg:h-40 overflow-hidden">
        <img
          src={imageUrl || placeholder}
          alt={title || 'Event image'}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{title || 'Untitled Event'}</h3>
          <span className={`text-xs font-medium px-2 py-1 rounded ${
            status === 'Upcoming' ? 'bg-green-100 text-green-800' :
            status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
            status === 'Completed' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'
          }`}>
            {status || 'Upcoming'}
          </span>
        </div>

        <p className="text-sm text-gray-600">{formatDateRange(startDate, endDate)}</p>
        <p className="text-sm text-gray-600">{location || 'Location not specified'}</p>

        <p className="text-sm text-gray-700 mt-2 line-clamp-3">{description || 'No description provided.'}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="text-xs text-gray-500">Organized by {organizer || 'Unknown'}</div>
          <a
            href="#"
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View Details
          </a>
        </div>
      </div>
    </article>
  );
};

export default EventCard;