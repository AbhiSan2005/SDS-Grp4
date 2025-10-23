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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <UserLayout />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-100 mb-8 text-center">
          Request a Project
        </h1>

        {submitted ? (
          <div className="bg-green-800 text-green-100 p-4 rounded shadow-lg shadow-green-500/30">
            Project request submitted successfully!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 shadow-lg shadow-blue-500/30 rounded px-8 pt-6 pb-8 mb-4 border border-gray-700 transition-shadow duration-300 hover:shadow-blue-400/40"
          >
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-700 bg-gray-700 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Type of Project
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-700 bg-gray-700 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Skillset Required
              </label>
              <input
                type="text"
                name="skillset"
                value={formData.skillset}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-700 bg-gray-700 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., React, Node.js"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-700 bg-gray-700 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                placeholder="Describe your project requirements"
                required
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
// import React, { useState } from 'react';
// import UserLayout from '../../layouts/UserLayout.jsx';

// const Request_Project = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     skillset: '',
//     description: '',
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     setSubmitted(true);
//     // I will connect with backend later
//   };

//   return (
//     <div>
//       <UserLayout />
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Request a Project</h1>

//         {submitted ? (
//           <div className="bg-green-100 text-green-700 p-4 rounded">
//             Project request submitted successfully!
//           </div>
//         ) : (
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//           >
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Type of Project
//               </label>
//               <input
//                 type="text"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Skillset Required
//               </label>
//               <input
//                 type="text"
//                 name="skillset"
//                 value={formData.skillset}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="e.g., React, Node.js"
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 rows="5"
//                 placeholder="Describe your project requirements"
//                 required
//               ></textarea>
//             </div>

//             <div className="flex items-center justify-between">
//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Submit Request
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Request_Project;





