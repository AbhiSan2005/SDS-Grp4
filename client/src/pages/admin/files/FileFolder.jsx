// --- FileOrFolderItem.jsx ---
import React, { useState } from 'react';
import { File, Folder, FileText, Image as ImageIcon, MoreVertical, Edit, Trash2 } from 'lucide-react';

const FileOrFolderItem = ({ item, viewMode, isSelected, onSelect, onFolderClick, onRename, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isFolder = item.type === 'folder';

    // Determine the icon based on file type
    const Icon = isFolder ? Folder :
                 item.name.endsWith('.pdf') ? FileText :
                 item.name.match(/\.(jpeg|jpg|png|gif|svg|webp)$/i) ? ImageIcon : // Added more image types
                 File;

    // Handle click: navigate into folder or do something else for files
    const handleClick = (e) => {
        // Prevent interfering with checkbox or menu clicks
        if (e.target.type === 'checkbox' || e.target.closest('button')) {
            return;
        }
        if (isFolder) {
            onFolderClick(item);
        } else {
            console.log("Clicked file:", item.name); // Placeholder for file preview action
        }
    };

    const handleMenuToggle = (e) => {
        e.stopPropagation(); // Prevent item click
        setIsMenuOpen(prev => !prev);
    };

    const handleRenameClick = (e) => {
        e.stopPropagation();
        onRename();
        setIsMenuOpen(false);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete();
        setIsMenuOpen(false);
    };

    // Close menu if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.action-menu-container')) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <div
            className={`group relative rounded-lg border flex flex-col cursor-pointer transition-all duration-150 ${
                isSelected ? 'bg-blue-50 border-blue-400 shadow-sm' : 'bg-white hover:bg-gray-50 border-gray-200 hover:shadow-sm'
            }`}
            onClick={handleClick} // Use main click handler
        >
            {/* Main Item Content */}
            <div className={`flex-grow p-4 flex ${viewMode === 'grid' ? 'flex-col items-center justify-center text-center' : 'flex-row items-center'} gap-3`}>
                <Icon className={`flex-shrink-0 ${viewMode === 'grid' ? 'h-12 w-12 mb-2' : 'h-8 w-8'} ${isFolder ? 'text-blue-500' : 'text-gray-500'}`} />
                <div className={viewMode === 'list' ? 'flex-grow truncate' : 'w-full'}>
                     <p className={`text-sm font-medium text-gray-800 truncate ${viewMode === 'grid' ? 'w-full mt-1' : ''}`}>{item.name}</p>
                    {!isFolder && viewMode === 'grid' && <p className="text-xs text-gray-500">{item.size}</p>}
                    {!isFolder && viewMode === 'list' && <p className="text-xs text-gray-500 mt-1">{item.size} - {item.uploadDate}</p>}
                </div>
            </div>

            {/* Checkbox */}
            <input
                type="checkbox"
                checked={isSelected}
                onClick={(e) => e.stopPropagation()} // Prevent navigation on checkbox click
                onChange={(e) => {
                    e.stopPropagation();
                    onSelect(item.id);
                }}
                className={`absolute top-2 left-2 h-4 w-4 z-10 transition-opacity rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            />

            {/* Action Menu Button & Dropdown */}
            <div className="absolute top-2 right-2 z-10 action-menu-container"> {/* Container to help with click outside */}
                <button onClick={handleMenuToggle} className={`p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-opacity ${isMenuOpen ? 'opacity-100 bg-gray-200' : 'opacity-0 group-hover:opacity-100 focus:opacity-100'}`}>
                    <MoreVertical size={18} />
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border z-20 py-1">
                        <ul>
                            <li><button onClick={handleRenameClick} className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"><Edit size={14}/> Rename</button></li>
                            <li><button onClick={handleDeleteClick} className="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"><Trash2 size={14}/> Delete</button></li>
                        </ul>
                    </div>
                )}
            </div>

             {/* Click overlay for list view to make selection easier */}
             {viewMode === 'list' && (
                 <div
                     onClick={(e) => { e.stopPropagation(); onSelect(item.id); }}
                     className="absolute inset-0 z-0 cursor-pointer"
                 ></div>
             )}
        </div>
    );
};

export default FileOrFolderItem;