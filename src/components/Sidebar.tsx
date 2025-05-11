import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  FileType2,
  Users,
  Settings,
  Wifi,
  X
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  { name: 'Upload Scan', icon: <UploadCloud size={20} />, path: '/upload' },
  { name: 'Results', icon: <FileType2 size={20} />, path: '/results/recent' },
  { name: 'Doctors', icon: <Users size={20} />, path: '/doctors' },
  { name: 'Smart Devices', icon: <Wifi size={20} />, path: '/devices' },
  { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  // Overlay for mobile drawer
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${open ? 'block md:hidden' : 'hidden'}`}
        onClick={onClose}
        aria-label="Close sidebar"
      />
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:relative md:block
        `}
      >
        {/* Mobile close button */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={onClose} aria-label="Close sidebar">
            <X size={28} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-6 pt-0 md:pt-6">
          <h2 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
            Main Menu
          </h2>
          <nav className="mt-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-gray-800'
                      : 'text-gray-700 dark:text-gray-200 hover:text-cyan-700 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`
                }
                onClick={onClose} // Close sidebar on link click (mobile)
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
