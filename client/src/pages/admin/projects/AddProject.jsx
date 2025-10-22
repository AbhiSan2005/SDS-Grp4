import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import axios from "axios";
import { X, Camera } from "lucide-react";

const AddProjectPage = () => {
  const navigate = useNavigate();
  const [allMembers, setAllMembers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    link: "",
    image: null,
    startDate: "",
    endDate: "",
    isVisible: true,
    members: [],
  });

  const [imagePreview, setImagePreview] = useState(null); // New state for the image preview URL
  const [memberSearchTerm, setMemberSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/members`
        );
        setAllMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchAllMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file })); 
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleSelectMember = (member) => {
    setSelectedMembers([...selectedMembers, member]);
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, member._id],
    }));
    setMemberSearchTerm("");
  };

  const handleRemoveMember = (memberToRemove) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member._id !== memberToRemove._id)
    );
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((id) => id !== memberToRemove._id),
    }));
  };

  const availableMembers = useMemo(() => {
    const selectedIds = new Set(selectedMembers.map((m) => m._id));
    return allMembers
      .filter((member) => !selectedIds.has(member._id))
      .filter((member) =>
        member.name.toLowerCase().includes(memberSearchTerm.toLowerCase())
      );
  }, [memberSearchTerm, allMembers, selectedMembers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const finalFormData = new FormData();

    finalFormData.append("title", formData.title);
    finalFormData.append("description", formData.description);
    finalFormData.append("githubLink", formData.githubLink);
    finalFormData.append("link", formData.link);
    finalFormData.append("startDate", formData.startDate);
    finalFormData.append("endDate", formData.endDate);
    finalFormData.append("isVisible", formData.isVisible);
    finalFormData.append("image", formData.image);
    finalFormData.append(
      "technologies",
      formData.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    );
    formData.members.forEach((memberId) => {
      finalFormData.append("members[]", memberId);
    });

    try {
      console.log("Submitting form data:", finalFormData);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        finalFormData
      );
      alert("Project added successfully!");
      navigate("/admin/projects");
    } catch (err) {
      console.error("Failed to add project:", err);
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout activePage="Projects Management" pageTitle="Add New Project">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Project Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="technologies"
                className="block text-sm font-medium text-gray-700"
              >
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                name="technologies"
                id="technologies"
                value={formData.technologies}
                onChange={handleChange}
                required
                placeholder="e.g., React, Node.js, MongoDB"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="githubLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  GitHub Link
                </label>
                <input
                  type="url"
                  name="githubLink"
                  id="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Live Link
                </label>
                <input
                  type="url"
                  name="link"
                  id="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://your-project.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Image
              </label>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-14 w-14 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Project Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera className="h-10 w-10 text-gray-400" />
                  )}
                </div>
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  <span>Upload Image</span>
                  <input
                    id="image-upload"
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    className="sr-only"
                    accept="image/png, image/jpeg, image/gif"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="members"
                className="block text-sm font-medium text-gray-700"
              >
                Assign Members
              </label>
              <div className="relative mt-1">
                <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-md p-2 min-h-[42px]">
                  {selectedMembers.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full"
                    >
                      {member.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={memberSearchTerm}
                    onChange={(e) => setMemberSearchTerm(e.target.value)}
                    placeholder="Search to add members..."
                    className="flex-grow border-none focus:ring-0 p-1"
                  />
                </div>
                {memberSearchTerm && availableMembers.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {availableMembers.map((member) => (
                      <li
                        key={member._id}
                        onClick={() => handleSelectMember(member)}
                        className="cursor-pointer hover:bg-gray-100 p-3 text-sm"
                      >
                        {member.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isVisible"
                id="isVisible"
                checked={formData.isVisible}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="isVisible"
                className="ml-2 block text-sm text-gray-900"
              >
                Visible on public showcase
              </label>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-4 border-t pt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/projects")}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:bg-blue-300"
              >
                {loading ? "Adding..." : "Add Project"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProjectPage;
