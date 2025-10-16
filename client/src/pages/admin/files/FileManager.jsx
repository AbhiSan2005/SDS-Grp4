import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout.jsx';
import { Upload, FolderPlus, Search, Grid, List, MoreVertical, ChevronRight } from 'lucide-react';

// Mock data to simulate files and folders
const mockFileSystem = [
  { id: 'f1', type: 'file', name: 'project_alpha_logo.png', size: '1.2 MB', uploadDate: '2025-10-10' },
  { id: 'f2', type: 'file', name: 'user_flow_diagram.pdf', size: '3.4 MB', uploadDate: '2025-10-09' },
  { id: 'd1', type: 'folder', name: 'Project Mockups' },
  { id: 'f3', type: 'file', name: 'meeting_notes.docx', size: '256 KB', uploadDate: '2025-10-08' },
  { id: 'd2', type: 'folder', name: 'Final Reports' },
];

const FileManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(['Home']);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch items for the currentPath from your API
    setLoading(true);
    setTimeout(() => { // Simulate network delay
      setItems(mockFileSystem);
      setLoading(false);
    }, 500);
  }, [currentPath]);

  const handleSelect = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <AdminLayout activePage="File Manager" pageTitle="File Manager">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Header with Search and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search files..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"/>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md" onClick={() => setViewMode('list')}><List size={20} /></button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md" onClick={() => setViewMode('grid')}><Grid size={20} /></button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
              <FolderPlus size={18} /><span>New Folder</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Upload size={18} /><span>Upload</span>
            </button>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          {currentPath.map((part, index) => (
            <React.Fragment key={index}>
              <button className="hover:underline">{part}</button>
              {index < currentPath.length - 1 && <ChevronRight size={16} />}
            </React.Fragment>
          ))}
        </div>

        {/* File and Folder Grid/List */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6' : 'grid-cols-1'} gap-4`}>
            {items.map(item => (
              <FileOrFolderItem 
                key={item.id} 
                item={item} 
                viewMode={viewMode}
                isSelected={selectedItems.includes(item.id)}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// --- Helper component for rendering items ---
import { File, Folder, FileText, Image as ImageIcon } from 'lucide-react';

const FileOrFolderItem = ({ item, viewMode, isSelected, onSelect }) => {
  const isFolder = item.type === 'folder';
  const Icon = isFolder ? Folder : 
               item.name.endsWith('.pdf') ? FileText : 
               item.name.match(/\.(jpeg|jpg|png|gif)$/) ? ImageIcon : 
               File;

  return (
    <div className={`group relative rounded-lg border cursor-pointer flex flex-col ${isSelected ? 'bg-blue-50 border-blue-400' : 'bg-white hover:bg-gray-50'}`}>
      <div className="flex-grow p-4 flex flex-col items-center justify-center text-center">
        <Icon className={`h-12 w-12 ${isFolder ? 'text-blue-500' : 'text-gray-500'}`} />
        <p className="mt-2 text-sm font-medium text-gray-800 truncate w-full">{item.name}</p>
        {!isFolder && <p className="text-xs text-gray-500">{item.size}</p>}
      </div>
      <input 
        type="checkbox" 
        checked={isSelected}
        onChange={() => onSelect(item.id)}
        className="absolute top-2 left-2 h-4 w-4 opacity-0 group-hover:opacity-100 checked:opacity-100 transition-opacity"
      />
      <button className="absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-opacity">
        <MoreVertical size={16} />
      </button>
    </div>
  );
};

export default FileManager;