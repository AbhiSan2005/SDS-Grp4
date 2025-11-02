import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import api from "../../../api/axios.js";
import { FilePenLine, Trash2, Plus, View, Sparkles, Search, Filter, User, Tag, ChevronDown } from "lucide-react";

const ProjectManagementDashboard = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    const [uniqueTechnologies, setUniqueTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [generatingId, setGeneratingId] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [technologyFilter, setTechnologyFilter] = useState('all');
    const [memberFilter, setMemberFilter] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [projectsRes, membersRes] = await Promise.all([
                    api.get(`/api/projects`),
                    api.get(`/api/members`)
                ]);
                setProjects(projectsRes.data);
                setAllMembers(membersRes.data);

                const technologiesSet = new Set();
                projectsRes.data.forEach(project => {
                    project.technologies?.forEach(tech => technologiesSet.add(tech));
                });
                setUniqueTechnologies(Array.from(technologiesSet).sort());

            } catch (err) {
                setError("Error: Could not fetch data.");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProjects = useMemo(() => {
        return projects
            .filter(project => technologyFilter === 'all' || project.technologies?.includes(technologyFilter))
            .filter(project => memberFilter === 'all' || project.members?.some(member => member === memberFilter))
            .filter(project => project.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [projects, searchQuery, technologyFilter, memberFilter]);

    const handleGenerateReport = async (projectId) => {
        setGeneratingId(projectId);
        try {
            await api.post(`/api/reports/generate/project/${projectId}`, {});
            alert('Report generated successfully! Redirecting to reports...');
            navigate('/admin/reports');
        } catch (error) {
            console.error("Error generating report:", error);
            alert("Error generating report.");
        } finally {
            setGeneratingId(null);
        }
     };
    const handleOpenModal = (project) => { setProjectToDelete(project); setIsModalOpen(true); };
    const handleCloseModal = () => { setProjectToDelete(null); setIsModalOpen(false); };
    const handleConfirmDelete = async () => {
         if (projectToDelete) {
            try {
                await api.delete(`/api/projects/${projectToDelete._id}`);
                setProjects(projects.filter((project) => project._id !== projectToDelete._id));
            } catch (err) {
                alert("Error: Could not delete the project.");
            } finally {
                handleCloseModal();
            }
        }
     };

    return (
        <AdminLayout activePage="Projects Management" pageTitle="Projects Management">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-2xl font-semibold text-gray-800 hidden md:block">All Projects</h3>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-grow sm:flex-grow-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative flex-shrink-0">
                         <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select
                            value={technologyFilter}
                            onChange={(e) => setTechnologyFilter(e.target.value)}
                            className="pl-9 pr-8 py-2 border border-gray-300 rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            title="Filter by technology"
                        >
                            <option value="all">All Technologies</option>
                            {uniqueTechnologies.map(tech => (
                                <option key={tech} value={tech}>{tech}</option>
                            ))}
                        </select>
                         <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                    <div className="relative flex-shrink-0">
                         <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select
                            value={memberFilter}
                            onChange={(e) => setMemberFilter(e.target.value)}
                            className="pl-9 pr-8 py-2 border border-gray-300 rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            title="Filter by member"
                        >
                            <option value="all">All Members</option>
                            {allMembers.map(member => (
                                <option key={member._id} value={member._id}>{member.name}</option>
                            ))}
                        </select>
                         <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                    <Link to="/admin/add-project" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 whitespace-nowrap">
                        <Plus size={18} />
                        <span>Add Project</span>
                    </Link>
                </div>
            </div>

            {loading ? (
                <p className="text-center text-gray-500 py-10">Loading projects...</p>
            ) : error ? (
                <p className="text-center text-red-500 py-10">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project._id} className="bg-white rounded-lg shadow-md flex flex-col transition-shadow hover:shadow-xl">
                             <img src={project.image || 'https://via.placeholder.com/400x200?text=Project+Image'} alt={project.title} className="rounded-t-lg w-full h-48 object-cover"/>
                             <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-lg font-bold text-gray-900 line-clamp-2">{project.title}</h4>
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${
                                        project.isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>{project.isVisible ? 'Visible' : 'Hidden'}</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{project.description}</p>
                                <div className="mt-4">
                                    <h5 className="text-sm font-semibold text-gray-500 mb-2">Technologies</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies?.map((tech) => (
                                            <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{tech}</span>
                                        ))}
                                        {(!project.technologies || project.technologies.length === 0) && <span className="text-xs text-gray-400">N/A</span>}
                                    </div>
                                 </div>
                             </div>
                              <div className="bg-gray-50 p-3 border-t border-gray-200 flex justify-end items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleGenerateReport(project._id)}
                                    disabled={generatingId === project._id}
                                    className="flex items-center gap-1.5 px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 disabled:opacity-50 font-medium"
                                    title="Generate Report"
                                >
                                    {generatingId === project._id ? 'Generating...' : <><Sparkles size={14} /> Generate Report</>}
                                </button>
                                <Link to={`/admin/view-project/${project._id}`} title="View Details" className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full"><View size={18} /></Link>
                                <Link to={`/admin/edit-project/${project._id}`} title="Edit Project" className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full"><FilePenLine size={18} /></Link>
                                <button onClick={() => handleOpenModal(project)} title="Delete Project" className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full"><Trash2 size={18} /></button>
                             </div>
                        </div>
                    ))}
                     {filteredProjects.length === 0 && !loading && (
                         <p className="text-center text-gray-500 py-10 md:col-span-2 lg:col-span-3">No projects match your criteria.</p>
                     )}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 animate-fade-in">
                        <h3 className="text-lg font-medium text-gray-900">Delete Project</h3>
                        <p className="mt-2 text-sm text-gray-600">Are you sure you want to delete this project? This action cannot be undone.</p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 rounded-md font-medium">Cancel</button>
                            <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-md font-medium">Yes, Delete</button>
                        </div>
                    </div>
                </div>
             )}
        </AdminLayout>
    );
};

export default ProjectManagementDashboard;