import React, { useState } from 'react';
import UserLayout from '../../layouts/UserLayout.jsx';

const Request_Project = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    skillset: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 transition-colors duration-500">
      <UserLayout />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-white drop-shadow-md"
          style={{ fontFamily: 'Quantum Lemon Bold, monospace' }}
        >
          Request a Project
        </h1>

        {submitted ? (
          <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-lg p-12 text-center">
            <h3
              className="text-2xl font-semibold text-white mb-3"
              style={{ fontFamily: 'Delius, monospace' }}
            >
              Project request submitted successfully!
            </h3>
            <p className="text-gray-400" style={{ fontFamily: 'Delius, monospace' }}>
              We will review your request and get back to you soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-blue-500/20"
          >
            {['name', 'type', 'skillset'].map((field) => (
              <div className="mb-4" key={field}>
                <label
                  className="block text-gray-300 text-sm font-medium mb-2"
                  style={{ fontFamily: 'Delius, monospace' }}
                >
                  {field === 'name'
                    ? 'Name'
                    : field === 'type'
                    ? 'Type of Project'
                    : 'Skillset Required'}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-700 bg-gray-800/50 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={field === 'skillset' ? 'e.g., React, Node.js' : ''}
                  required={field !== 'skillset' ? true : false}
                />
              </div>
            ))}

            <div className="mb-6">
              <label
                className="block text-gray-300 text-sm font-medium mb-2"
                style={{ fontFamily: 'Delius, monospace' }}
              >
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe your project requirements"
                required
                className="shadow appearance-none border border-gray-700 bg-gray-800/50 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
                style={{ fontFamily: 'Delius, monospace' }}
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Request_Project;
