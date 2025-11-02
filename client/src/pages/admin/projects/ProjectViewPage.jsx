import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import api from "../../../api/axios.js";
import {
  Calendar,
  Users,
  Tag,
  Link as LinkIcon,
  Github,
  CheckCircle,
} from "lucide-react";

const ProjectViewPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(
          `/api/projects/${id}`
        );
        setProject(response.data);
      } catch (err) {
        setError("Could not fetch project details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  if (loading)
    return (
      <AdminLayout pageTitle="Loading...">
        <p>Loading project...</p>
      </AdminLayout>
    );
  if (error)
    return (
      <AdminLayout pageTitle="Error">
        <p className="text-red-500">{error}</p>
      </AdminLayout>
    );

  return (
    <AdminLayout activePage="Projects Management" pageTitle="Project Details">
      {project && (
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {project.title}
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
                >
                  <LinkIcon size={16} /> Live Link
                </a>
              </div>
            </div>
            <Link
              to={`/admin/edit-project/${project._id}`}
              className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
            >
              Edit Project
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <img
                src={project.image || "https://via.placeholder.com/800x400"}
                alt={project.title}
                className="w-full rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Details
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-3" />{" "}
                    Status:{" "}
                    <span className="font-semibold ml-auto">
                      {project.isVisible ? "Visible" : "Hidden"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Calendar size={16} className="text-gray-500 mr-3" /> Start
                    Date:{" "}
                    <span className="font-semibold ml-auto">
                      {formatDate(project.startDate)}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Calendar size={16} className="text-gray-500 mr-3" /> End
                    Date:{" "}
                    <span className="font-semibold ml-auto">
                      {formatDate(project.endDate)}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Tag size={20} /> Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Users size={20} /> Members Involved
                </h3>
                <ul className="space-y-3">
                  {project.members && project.members.length > 0 ? (
                    project.members.map((member) => (
                      <li key={member._id} className="flex items-center">
                        <img
                          src={member.photo || "https://via.placeholder.com/40"}
                          alt={member.name}
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No members assigned to this project.
                    </p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ProjectViewPage;
