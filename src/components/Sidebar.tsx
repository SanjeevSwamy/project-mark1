import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  FileType2,
  Users,
  Settings,
  Wifi,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  { name: 'Upload Scan', icon: <UploadCloud size={20} />, path: '/upload' },
  { name: 'Results', icon: <FileType2 size={20} />, path: '/results/recent' },
  { name: 'Doctors', icon: <Users size={20} />, path: '/doctors' },
  { name: 'Smart Devices', icon: <Wifi size={20} />, path: '/devices' },
  { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Sidebar content
  const sidebarContent = (
    <div className="p-6">
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
            onClick={() => setOpen(false)} // Close sidebar on link click (mobile)
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-gray-900 p-2 rounded-full shadow border border-gray-200 dark:border-gray-700"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
        style={{ display: open ? 'none' : 'block' }}
      >
        <Menu size={24} className="text-cyan-700 dark:text-cyan-400" />
      </button>

      {/* Sidebar Drawer for Mobile */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:relative md:block
        `}
        style={{ boxShadow: open ? '0 2px 16px rgba(0,0,0,0.2)' : undefined }}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)} aria-label="Close sidebar">
            <X size={28} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        {sidebarContent}
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        />
      )}
    </>
  );
};

export default Sidebar;
