import React, { useState , useEffect} from "react";
import { Link} from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import axios from 'axios';

import { UserPlus, FilePenLine, Trash2, AlertTriangle } from "lucide-react";

const MemberManagementDashboard = () => {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);


  useEffect(()=>{
    const fetchMembers = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/members`);
        setMembers(response.data);

      } catch (error) {
        console.error("Failed to fetch members: ",err);
        setError("Error: Could not fetch members.");
      } finally{
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

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
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/members/${memberToDelete._id}`);
        setMembers(members.filter((member) => member._id !== memberToDelete._id));
      } catch (err) {
        console.error("Failed to delete member:", err);
        alert("Error: Could not delete the user.");
      } finally {
        handleCloseModal();
      }
    }
  };

  return (
    <AdminLayout activePage="Members Management" pageTitle="Member Management">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Club Members</h3>
        <Link
          to="/admin/add-member"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <UserPlus size={18} />
          <span>Add New Member</span>
        </Link>
      </div>

      <div className="w-full">
        {loading ? (
          <p className="text-center text-gray-500">Loading members...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Header for larger screens */}
            <div className="hidden md:grid md:grid-cols-5 gap-4 px-4 py-2 font-semibold text-gray-600 bg-gray-50 rounded-t-lg">
              <div>Name</div>
              <div>Role</div>
              <div>Portfolio</div>
              <div>Batch</div>
              <div>Actions</div>
            </div>

            {/* List of Member Cards */}
            <div className="space-y-4 md:space-y-0">
              {members.map((member) => (
                <div key={member._id} className="bg-white p-4 rounded-lg shadow-md md:rounded-none md:shadow-none md:border-b md:grid md:grid-cols-5 md:gap-4 md:items-center hover:bg-gray-50">
                  <div className="font-semibold text-gray-900">{member.name}</div>
                  <div className="text-gray-700">{member.role}</div>
                  <div className="text-gray-700">{member.portfolio}</div>
                  <div className="text-gray-700">{member.batch}</div>
                  <div className="hidden md:flex items-center gap-4">
                    <Link to={`/admin/edit-member/${member._id}`}>
                      <button title="Edit Member" className="text-blue-600 hover:text-blue-800"><FilePenLine size={20} /></button>
                    </Link>
                    <button onClick={() => handleOpenModal(member)} title="Delete Member" className="text-red-600 hover:text-red-800"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity">
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
                This user will be permanently deleted. <br /> Are you sure you
                want to continue?
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                No, Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
