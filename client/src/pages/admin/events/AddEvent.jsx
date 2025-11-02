import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import api from "../../../api/axios.js";
import { Camera } from "lucide-react";

const AddEventPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    agenda: "",
    startDate: "",
    endDate: "",
    location: "",
    organizer: "",
    status: "Upcoming",
    imageUrl: null,
    gallery: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      setFormData((prev) => ({ ...prev, imageUrl: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (endDate < startDate) {
      setError("End date cannot be before the start date.");
      return; // Stop the submission
    }
    const finalFormData = new FormData();

    finalFormData.append("title", formData.title);
    finalFormData.append("description", formData.description);
    finalFormData.append("agenda", formData.agenda);
    finalFormData.append("startDate", formData.startDate);
    finalFormData.append("endDate", formData.endDate);
    finalFormData.append("location", formData.location);
    finalFormData.append("organizer", formData.organizer);
    finalFormData.append("status", formData.status);

    if (formData.imageUrl) {
      finalFormData.append("eventImage", formData.imageUrl);
    }

    const galleryUrls = formData.gallery
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);
    galleryUrls.forEach((url) => {
      finalFormData.append("gallery[]", url);
    });

    try {
      await api.post(
        `/api/events`,
        finalFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Event created successfully!");
      navigate("/admin/events");
    } catch (err) {
      console.error("Failed to create event:", err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout activePage="Events Management" pageTitle="Create New Event">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Event Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label
                htmlFor="agenda"
                className="block text-sm font-medium text-gray-700"
              >
                Agenda (Optional)
              </label>
              <textarea
                name="agenda"
                id="agenda"
                value={formData.agenda}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location / Venue
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="organizer"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organizer
                </label>
                <input
                  type="text"
                  name="organizer"
                  id="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option>Upcoming</option>
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Banner Image
              </label>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-24 w-48 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Event Preview"
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
                  <span>Upload Banner</span>
                  <input
                    id="image-upload"
                    name="imageUrl"
                    type="file"
                    onChange={handleImageChange}
                    className="sr-only"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="gallery"
                className="block text-sm font-medium text-gray-700"
              >
                Gallery Image URLs (one URL per line)
              </label>
              <textarea
                name="gallery"
                id="gallery"
                value={formData.gallery}
                onChange={handleChange}
                rows="4"
                placeholder="https://.../image1.png&#10;https://.../image2.png"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-4 border-t pt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/events")}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:bg-blue-300"
              >
                {loading ? "Creating..." : "Create Event"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddEventPage;
