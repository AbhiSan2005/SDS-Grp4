import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout.jsx'; 
import axios from 'axios';

const AddMemberPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Member', 
    portfolio: 'Technical',
    batch: new Date().getFullYear() + 4,
    branch: 'Computer Science and Engineering',
    joinedDate: new Date().toISOString().split('T')[0],
    expertise: '',
    photo: '',
    contactNumber: '',
    socials: {
      linkedin: '',
      github: '',
      email: '',
    },
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name.startsWith('socials.')){
      const socialField = name.split('.')[1];
      setFormData((prevData) =>({
        ...prevData,
        socials: {
          ...prevData.socials,
          [socialField]: value,
        },
      }));
    } else{
      setFormData((prevData) =>({
        ...prevData,
        [name]: value,
      }));
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    const submissionData = {
      ...formData,
      expertise: formData.expertise.split(',').map(item => item.trim()).filter(Boolean),
    };
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/members`, submissionData);
      alert('Member added successfully!');
      navigate('/admin/members');
    } catch (err) {
      console.error('Failed to add member:', err);
      setError(err.response?.data?.message || 'An error occurred. Please check the form and try again.');
    }
  };

  return (
    <AdminLayout activePage="Members Management" pageTitle="Add New Member">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Basic Information Section */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Basic Information</h3>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder='Enter the college email' required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-600">Role</label>
              <select name="role" id="role" value={formData.role} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>Member</option>
                <option>Core Member</option>
                <option>Admin</option>
                <option>Faculty Advisor</option>
              </select>
            </div>

            <div>
              <label htmlFor="portfolio" className="block text-sm font-medium text-gray-600">Portfolio</label>
              <select name="portfolio" id="portfolio" value={formData.portfolio} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>Technical</option>
                <option>Events & Docs</option>
                <option>Marketing</option>
                <option>Design</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="batch" className="block text-sm font-medium text-gray-600">Batch (Year of Graduation)</label>
              <input type="number" name="batch" id="batch" value={formData.batch} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-600">Branch</label>
              <select name="branch" id="branch" value={formData.branch} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>Computer Science and Engineering</option>
                <option>Electronics and Telecommunication Engineering</option>
                <option>Electrical Engineering</option>
                <option>Mechanical Engineering</option>
                <option>Civil Engineering</option>
                <option>Instrumentation and Control Engineering</option>
                <option>Manufacturing Engineering</option>
                <option>Metallurgy and Material Engineering</option>
                <option>Planning</option>
              </select>
            </div>
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-600">Contact Number</label>
              <input type="tel" name="contactNumber" id="contactNumber" value={formData.contactNumber} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>

            {/* Additional Information Section */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mt-6 mb-4">Additional Information</h3>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="expertise" className="block text-sm font-medium text-gray-600">Expertise (Comma-separated)</label>
              <input type="text" name="expertise" id="expertise" value={formData.expertise} onChange={handleChange} placeholder="e.g., React, Node.js, Figma" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-600">Photo URL</label>
              <input type="text" name="photo" id="photo" value={formData.photo} onChange={handleChange} placeholder="https://example.com/photo.jpg" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>

            {/* Socials Section */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mt-6 mb-4">Social Links</h3>
            </div>
            
            <div>
              <label htmlFor="socials.linkedin" className="block text-sm font-medium text-gray-600">LinkedIn Profile URL</label>
              <input type="text" name="socials.linkedin" id="socials.linkedin" value={formData.socials.linkedin} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>

            <div>
              <label htmlFor="socials.github" className="block text-sm font-medium text-gray-600">GitHub Profile URL</label>
              <input type="text" name="socials.github" id="socials.github" value={formData.socials.github} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-8 flex justify-end gap-4">
            <button type="button" onClick={() => navigate('/admin/members')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Add Member
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddMemberPage;