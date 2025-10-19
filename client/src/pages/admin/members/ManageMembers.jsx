import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import axios from "axios";
import {
  UserPlus,
  FilePenLine,
  Trash2,
  AlertTriangle,
  Search,
  Filter,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const getRoleBadge = (role) => {
  const styles = {
    "Faculty Advisor": "bg-indigo-100 text-indigo-800",
    "Admin": "bg-purple-100 text-purple-800",
    "Core Member": "bg-blue-100 text-blue-800",
    "Member": "bg-gray-100 text-gray-800",
  };
  return styles[role] || styles["Member"];
};

const MemberSkeleton = () => (
  <div className="bg-white p-4 border-b animate-pulse">
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-gray-200"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

const MemberManagementDashboard = () => {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterPortfolio, setFilterPortfolio] = useState("");
  const [filterBatch, setFilterBatch] = useState("");

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/members`
        );
        
        setMembers(response.data);
      } catch (err) {
        console.error("Failed to fetch members: ", err);

        setError("Error: Could not fetch members.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        setIsFilterMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterMenuRef]);
  
// This is the logic for memoized filtering and sorting

  const filteredAndSortedMembers = useMemo(() => {
    const roleOrder = { "Faculty Advisor": 1, "Admin": 2, "Core Member": 3, "Member": 4 };
    return members
      .filter(member => {
        const nameMatch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
        const roleMatch = filterRole ? member.role === filterRole : true;
        const portfolioMatch = filterPortfolio ? member.portfolio === filterPortfolio : true;
        const batchMatch = filterBatch ? member.batch === filterBatch : true;
        return nameMatch && roleMatch && portfolioMatch && batchMatch;
      })
      .sort((a, b) => (roleOrder[a.role] || 99) - (roleOrder[b.role] || 99));
  }, [members, searchTerm, filterRole, filterPortfolio, filterBatch]);

  const uniqueRoles = useMemo(() => [...new Set(members.map(m => m.role).sort())], [members]);
  const uniquePortfolios = useMemo(() => [...new Set(members.map(m => m.portfolio).sort())], [members]);
  const uniqueBatches = useMemo(() => [...new Set(members.map(m => m.batch).sort())], [members]);
  
  const activeDropdownFilterCount = [filterRole, filterPortfolio, filterBatch].filter(Boolean).length;


  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterRole("");
    setFilterPortfolio("");
    setFilterBatch("");
    setIsFilterMenuOpen(false); 
  };

  const handleOpenModal = (member) => {
    setMemberToDelete(member);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setMemberToDelete(null);
    setIsModalOpen(false);
  };
  const handleConfirmDelete = async () => { 
    if (memberToDelete) {
      const promise = axios.delete(
        `${import.meta.env.VITE_API_URL}/api/members/${memberToDelete._id}`
      );

      toast.promise(promise, {
        loading: "Deleting member...",
        success: () => {
          setMembers(
            members.filter((member) => member._id !== memberToDelete._id)
          );
          handleCloseModal();
          return `${memberToDelete.name} has been deleted.`;
        },
        error: () => {
          handleCloseModal();
          return "Error: Could not delete the member.";
        },
      });
    }
  };

  return (
    <AdminLayout activePage="Members Management" pageTitle="Member Management">
      <Toaster position="top-center" />

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Club Members</h3>
        
        {/* Search and filter button */}        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange = {(e) => setSearchTerm(e.target.value)}
              className="w-50 pl-10 pr-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="relative" ref={filterMenuRef}>
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors relative"
            >
              <Filter size={16} />
              <span>Filters</span>
              {/* Show badge only if there are active dropdown filters */}
              {activeDropdownFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-xs">
                  {activeDropdownFilterCount}
                </span>
              )}
            </button>
            
            {isFilterMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-4 space-y-4">
                <h4 className="font-semibold text-gray-800">Filter by</h4>
                <select onChange={(e) => setFilterRole(e.target.value)} value={filterRole} className="w-full bg-white text-gray-700 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">All Roles</option>
                  {uniqueRoles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <select onChange={(e) => setFilterPortfolio(e.target.value)} value={filterPortfolio} className="w-full bg-white text-gray-700 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">All Portfolios</option>
                  {uniquePortfolios.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select onChange={(e) => setFilterBatch(e.target.value)} value={filterBatch} className="w-full bg-white text-gray-700 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">All Batches</option>
                  {uniqueBatches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <div className="border-t pt-4">
                  <button
                    onClick={handleClearFilters}
                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition  -colors text-sm"
                  >
                    <X size={16} />
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <Link to="/admin/add-member" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md">
            <UserPlus size={18} />
            <span className="hidden sm:inline">Add Member</span>
          </Link>
        </div>
      </div>

      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        {error && <p className="p-8 text-center text-red-500">{error}</p>}

        {loading ? (
          <div>
            <MemberSkeleton />
            <MemberSkeleton />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Portfolio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Batch
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* This maps over filtered and sorted members */}
                {filteredAndSortedMembers.length > 0 ? (
                  filteredAndSortedMembers.map((member) => (
                    <tr
                      key={member._id}
                      className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img src={member.photo || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded-full" />
                          <span>{member.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadge(  
                            member.role
                          )}`}
                        >
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">{member.portfolio}</td>
                      <td className="px-6 py-4">{member.batch}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-4">
                          <Link
                            to={`/admin/members/edit/${member._id}`}
                            title="Edit Member"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <FilePenLine size={20} />
                          </Link>
                          <button
                            onClick={() => handleOpenModal(member)}
                            title="Delete Member"
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      No members match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <AlertTriangle
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Delete Member
                </h3>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete{" "}
                <strong>{memberToDelete?.name}</strong>? This action cannot be
                undone.
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none"
              >
                No, Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default MemberManagementDashboard;
