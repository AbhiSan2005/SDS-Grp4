// --- FileManager.jsx ---
import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../layouts/AdminLayout.jsx'; // Adjust path as needed
import axios from 'axios'; // Import axios, even if not used yet
import { Upload, FolderPlus, Search, Grid, List, ChevronRight } from 'lucide-react';
import FileOrFolderItem from './FileFolder.jsx'; // Assuming it's in the same folder
// import CreateFolderModal from './modals/CreateFolderModal'; // Assuming modals are in a subfolder
// import RenameModal from './modals/RenameModal';
// import DeleteModal from './modals/DeleteModal';

// --- MOCK API CALLS (Placeholders for your future backend calls) ---
const mockApi = {
    fetchItems: async (path) => {
        console.log("Mock Fetching items for path:", path);
        // Simulate fetching based on path - very basic example
        if (path === 'Home/Project Mockups') {
            return [{ id: 'f4', type: 'file', name: 'mockup_v1.png', size: '2.1 MB', path: 'Project Mockups', uploadDate: '2025-10-20' }];
        }
        if (path === 'Home/Final Reports') {
            return []; // Simulate empty folder
        }
        // Default mock data for 'Home'
        return [
             { id: 'f1', type: 'file', name: 'project_alpha_logo.png', size: '1.2 MB', uploadDate: '2025-10-10', path:'Home' },
             { id: 'f2', type: 'file', name: 'user_flow_diagram.pdf', size: '3.4 MB', uploadDate: '2025-10-09', path:'Home' },
             { id: 'd1', type: 'folder', name: 'Project Mockups', path:'Home' },
             { id: 'f3', type: 'file', name: 'meeting_notes.docx', size: '256 KB', uploadDate: '2025-10-08', path:'Home' },
             { id: 'd2', type: 'folder', name: 'Final Reports', path:'Home' },
        ];
    },
    createFolder: async (name, path) => {
        console.log("Mock Creating folder:", name, "at path:", path);
        // Simulate success - In real backend, you'd get the new folder details back
        return { id: `d${Date.now()}`, type: 'folder', name, path: path.split('/').pop() };
    },
    renameItem: async (id, newName, type) => {
        console.log("Mock Renaming", type, id, "to", newName);
        // Simulate success
        return { id, type, name: newName };
    },
    deleteItem: async (id, type) => {
        console.log("Mock Deleting", type, id);
        // Simulate success
        return true;
    },
};
// --- END MOCK API ---

const FileManager = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPath, setCurrentPath] = useState(['Home']); // Array of folder names
    const [viewMode, setViewMode] = useState('grid');
    const [selectedItems, setSelectedItems] = useState([]);

    // Modal States
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null); // { id, name, type }

    // Helper to get the current path as a string like "Home/Subfolder"
    const getCurrentPathString = useCallback(() => currentPath.join('/'), [currentPath]);

    // Function to fetch items based on the current path
    const fetchItems = useCallback(async () => {
        setLoading(true);
        setSelectedItems([]); // Clear selection when navigating
        try {
            const pathString = getCurrentPathString();
            // --- REPLACE MOCK WITH ACTUAL API CALL ---
            // const response = await axios.get(`/api/filesystem?path=${encodeURIComponent(pathString)}`);
            // setItems(response.data);
            const data = await mockApi.fetchItems(pathString);
            setItems(data);
            // --- END REPLACE ---
        } catch (error) {
            console.error("Failed to fetch items:", error);
            // TODO: Set an error state to display to the user
        } finally {
            setLoading(false);
        }
    }, [getCurrentPathString]); // Re-run fetchItems if the path string changes

    // Fetch items when the component mounts or the path changes
    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    // Handler for selecting/deselecting items
    const handleSelect = (itemId) => {
        setSelectedItems(prev =>
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        );
    };

    // --- CRUD Handlers ---
    const handleCreateFolder = async (folderName) => {
        setLoading(true); // Indicate activity
        try {
            const pathString = getCurrentPathString();
             // --- REPLACE MOCK WITH ACTUAL API CALL ---
            // await axios.post('/api/folders', { name: folderName, parentPath: pathString });
            await mockApi.createFolder(folderName, pathString);
             // --- END REPLACE ---
            setIsCreateFolderModalOpen(false);
            await fetchItems(); // Refresh the list to show the new folder
        } catch (error) {
            console.error("Failed to create folder:", error);
            // TODO: Show error in the modal or via alert/toast
        } finally {
            setLoading(false);
        }
    };

    const handleRename = async (newName) => {
        if (!itemToEdit) return;
        setLoading(true);
        try {
            // --- REPLACE MOCK WITH ACTUAL API CALL ---
            // const apiUrl = `/api/${itemToEdit.type === 'folder' ? 'folders' : 'files'}/${itemToEdit.id}`;
            // await axios.put(apiUrl, { name: newName });
             await mockApi.renameItem(itemToEdit.id, newName, itemToEdit.type);
             // --- END REPLACE ---
            setIsRenameModalOpen(false);
            setItemToEdit(null);
            await fetchItems(); // Refresh the list
        } catch (error) {
            console.error("Failed to rename:", error);
            // TODO: Show error in the modal or via alert/toast
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!itemToEdit) return;
        setLoading(true);
        try {
            // --- REPLACE MOCK WITH ACTUAL API CALL ---
            // const apiUrl = `/api/${itemToEdit.type === 'folder' ? 'folders' : 'files'}/${itemToEdit.id}`;
            // await axios.delete(apiUrl);
             await mockApi.deleteItem(itemToEdit.id, itemToEdit.type);
             // --- END REPLACE ---
            setIsDeleteModalOpen(false);
            setItemToEdit(null);
            await fetchItems(); // Refresh the list
        } catch (error) {
            console.error("Failed to delete:", error);
             // TODO: Show error in the modal or via alert/toast
        } finally {
            setLoading(false);
        }
    };

    // --- Action Menu Openers ---
    const openRenameModal = (item) => {
        setItemToEdit({ id: item.id, name: item.name, type: item.type });
        setIsRenameModalOpen(true);
    };

    const openDeleteModal = (item) => {
        setItemToEdit({ id: item.id, name: item.name, type: item.type });
        setIsDeleteModalOpen(true);
    };

    // --- Navigation Handlers ---
    const handleFolderClick = (folder) => {
        // Append the clicked folder's name to the path array
        setCurrentPath([...currentPath, folder.name]);
    };

    const handleBreadcrumbClick = (index) => {
        // Navigate back to a specific part of the path
        setCurrentPath(currentPath.slice(0, index + 1));
    };

    return (
        <AdminLayout activePage="File Manager" pageTitle="File Manager">
            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    {/* Search Input */}
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" placeholder="Search files..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                    </div>
                    {/* View Mode and Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button title="List View" className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setViewMode('list')}><List size={20} /></button>
                        <button title="Grid View" className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setViewMode('grid')}><Grid size={20} /></button>
                        <button onClick={() => setIsCreateFolderModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 font-medium">
                            <FolderPlus size={18} /><span>New Folder</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                            <Upload size={18} /><span>Upload</span>
                        </button>
                    </div>
                </div>

                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-4 flex-wrap bg-gray-50 p-2 rounded-md">
                    {currentPath.map((part, index) => (
                        <React.Fragment key={index}>
                            <button
                                onClick={() => handleBreadcrumbClick(index)}
                                className={`px-2 py-1 rounded hover:bg-gray-200 disabled:hover:bg-transparent disabled:text-gray-800 disabled:font-semibold ${index === currentPath.length - 1 ? 'font-semibold text-gray-800' : 'hover:underline'}`}
                                disabled={index === currentPath.length -1}
                            >
                                {part}
                            </button>
                            {index < currentPath.length - 1 && <ChevronRight size={16} className="flex-shrink-0 text-gray-400"/>}
                        </React.Fragment>
                    ))}
                </div>

                {/* File/Folder Grid or List */}
                <div className="min-h-[300px]"> {/* Added min-height for empty/loading states */}
                    {loading ? ( <p className="text-center text-gray-500 py-10">Loading...</p> ) :
                     items.length === 0 ? ( <p className="text-center text-gray-500 py-10">Folder is empty</p>) :
                     (
                        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6' : 'grid-cols-1'} gap-4`}>
                            {items.map(item => (
                                <FileOrFolderItem
                                    key={item.id}
                                    item={item}
                                    viewMode={viewMode}
                                    isSelected={selectedItems.includes(item.id)}
                                    onSelect={handleSelect}
                                    onFolderClick={handleFolderClick}
                                    onRename={() => openRenameModal(item)}
                                    onDelete={() => openDeleteModal(item)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modals Rendered Conditionally */}
            {isCreateFolderModalOpen && (
                <CreateFolderModal
                    onClose={() => setIsCreateFolderModalOpen(false)}
                    onCreate={handleCreateFolder}
                />
            )}
            {isRenameModalOpen && itemToEdit && (
                <RenameModal
                    item={itemToEdit}
                    onClose={() => { setIsRenameModalOpen(false); setItemToEdit(null); }}
                    onRename={handleRename}
                />
            )}
             {isDeleteModalOpen && itemToEdit && (
                <DeleteModal
                    item={itemToEdit}
                    onClose={() => { setIsDeleteModalOpen(false); setItemToEdit(null); }}
                    onDelete={handleDelete}
                />
            )}
        </AdminLayout>
    );
};

export default FileManager;