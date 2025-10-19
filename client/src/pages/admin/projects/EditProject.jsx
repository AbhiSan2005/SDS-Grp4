import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import axios from "axios";
import { X, Camera } from "lucide-react"; 

const EditProjectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(null);
  const [allMembers, setAllMembers] = useState([]);
  const [memberSearchTerm, setMemberSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects/${id}`
        );
        const projectData = projectRes.data;

        const membersRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/members`
        );
        setAllMembers(membersRes.data);

        setFormData({
          ...projectData,
          technologies: projectData.technologies.join(", "),
          startDate: projectData.startDate ? new Date(projectData.startDate).toISOString().split("T")[0] : "",
          endDate: projectData.endDate ? new Date(projectData.endDate).toISOString().split("T")[0] : "",
          members: projectData.members?.map((m) => m._id) || [],
          image: projectData.image, // Keep the original image URL initially
        });

        setSelectedMembers(projectData.members || []);
        setImagePreview(projectData.image); // Set the initial image preview
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load project data. It may not exist.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSelectMember = (member) => {
    setSelectedMembers([...selectedMembers, member]);
    setFormData(prev => ({ ...prev, members: [...prev.members, member._id] }));
    setMemberSearchTerm('');
  };

  const handleRemoveMember = (memberToRemove) => {
    setSelectedMembers(selectedMembers.filter(member => member._id !== memberToRemove._id));
    setFormData(prev => ({ ...prev, members: prev.members.filter(id => id !== memberToRemove._id) }));
  };

  const availableMembers = useMemo(() => {
    if (!allMembers.length) return [];
    const selectedIds = new Set(selectedMembers.map(m => m._id));
    return allMembers
      .filter(member => !selectedIds.has(member._id))
      .filter(member => member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()));
  }, [memberSearchTerm, allMembers, selectedMembers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const finalFormData = new FormData();
    Object.keys(formData).forEach(key => {
    if (key !== 'members') {
        finalFormData.append(key, formData[key]);
    }
});


formData.members.forEach(memberId => {
    finalFormData.append('members', memberId);
});
    finalFormData.set('technologies', formData.technologies.split(",").map(item => item.trim()).filter(Boolean));

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
        finalFormData // Send as FormData
      );
      alert("Project updated successfully!");
      navigate("/admin/projects");
    } catch (err) {
      console.error("Failed to update project:", err);
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
        setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <AdminLayout pageTitle="Loading...">
        <p className="text-center">Loading project details...</p>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout pageTitle="Error">
        <p className="text-center text-red-500">{error}</p>
      </AdminLayout>
    );
  }

  if (!formData) {
    return null; 
  }

  return (
    <AdminLayout activePage="Projects Management" pageTitle="Edit Project">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Project Title</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
              <input type="text" name="technologies" id="technologies" value={formData.technologies} onChange={handleChange} required placeholder="e.g., React, Node.js, MongoDB" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700">GitHub Link</label>
                <input type="url" name="githubLink" id="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="https://github.com/..." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
              </div>
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">Live Link</label>
                <input type="url" name="link" id="link" value={formData.link} onChange={handleChange} placeholder="https://your-project.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Image</label>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Project Preview" className="h-full w-full object-cover" />
                  ) : (
                    <Camera className="h-10 w-10 text-gray-400"/>
                  )}
                </div>
                <label htmlFor="image-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                  <span>Change Image</span>
                  <input id="image-upload" name="image" type="file" onChange={handleImageChange} className="sr-only" accept="image/*"/>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
              </div>
            </div>
            <div>
              <label htmlFor="members" className="block text-sm font-medium text-gray-700">Assign Members</label>
              <div className="relative mt-1">
                <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-md p-2 min-h-[42px]">
                  {selectedMembers.map(member => (
                    <div key={member._id} className="flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                      {member.name}
                      <button type="button" onClick={() => handleRemoveMember(member)} className="text-blue-600 hover:text-blue-800">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <input type="text" value={memberSearchTerm} onChange={(e) => setMemberSearchTerm(e.target.value)} placeholder="Search to add members..." className="flex-grow border-none focus:ring-0 p-1"/>
                </div>
                {memberSearchTerm && availableMembers.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {availableMembers.map(member => (
                      <li key={member._id} onClick={() => handleSelectMember(member)} className="cursor-pointer hover:bg-gray-100 p-3 text-sm">
                        {member.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-4 border-t pt-6">
              <button type="button" onClick={() => navigate("/admin/projects")} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Update Project</button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditProjectPage;