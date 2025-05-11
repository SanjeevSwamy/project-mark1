
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BellRing, Menu, X, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const initialNotifications = [
{ id: 1, title: 'Scan result ready', desc: 'Your ECG scan is available.', time: '2 min ago' },
{ id: 2, title: 'Appointment reminder', desc: 'Dr. Priya Singh, tomorrow 10am.', time: '1 day ago' },
];

const Navbar: React.FC = () => {
const { user, logout } = useAuth();
const [profileOpen, setProfileOpen] = useState(false);
const [notifOpen, setNotifOpen] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const { theme, toggleTheme } = useTheme();

// Notifications state (now clearable)
const [notifications, setNotifications] = useState(initialNotifications);

const clearNotifications = () => setNotifications([]);

return (
<nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 py-3">
<div className="flex justify-between items-center max-w-7xl mx-auto">
<div className="flex items-center space-x-2">
<button className="block md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>
<Link to="/" className="flex items-center space-x-2">
<Heart className="h-8 w-8 text-cyan-700 dark:text-cyan-400" />
<span className="text-xl font-bold text-cyan-800 dark:text-cyan-200">Health-It</span>
</Link>
</div>

<div className="flex items-center space-x-4">
{/* Theme toggle */}
<button
className="p-2 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
aria-label="Toggle theme"
onClick={toggleTheme}
>
{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
</button>

{/* Notifications */}
<div className="relative">
<button
className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
onClick={() => setNotifOpen(v => !v)}
aria-label="Notifications"
>
<BellRing size={20} />
{notifications.length > 0 && (
<span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
)}
</button>
{notifOpen && (
<div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-20 border border-gray-200 dark:border-gray-700">
<div className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
<span>Notifications</span>
{notifications.length > 0 && (
<button
onClick={() => {
clearNotifications();
setNotifOpen(false);
}}
className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline ml-2"
title="Clear all notifications"
>
Clear All
</button>
)}
</div>
{notifications.length === 0 ? (
<div className="px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">No notifications</div>
) : (
notifications.map(n => (
<div key={n.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
<div className="font-medium text-gray-800 dark:text-gray-100">{n.title}</div>
<div className="text-gray-500 dark:text-gray-400 text-xs">{n.desc}</div>
<div className="text-xs text-gray-400 dark:text-gray-500">{n.time}</div>
</div>
))
)}
</div>
)}
</div>

{/* Profile */}
<div className="relative">
<button className="flex items-center space-x-2" onClick={() => setProfileOpen(!profileOpen)}>
<div className="relative">
{user?.profileImage ? (
<img src={user.profileImage} alt={user?.name} className="h-8 w-8 rounded-full object-cover border border-gray-200" />
) : (
<div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center">
<span className="text-cyan-800 font-medium text-sm">{user?.name?.charAt(0)}</span>
</div>
)}
</div>
<span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</span>
</button>
{profileOpen && (
<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-800">
<button
onClick={() => {
logout();
setProfileOpen(false);
}}
className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
>
<LogOut size={16} className="mr-2" />
<span>Sign out</span>
</button>
</div>
)}
</div>
</div>
</div>
</nav>
);
};

export default Navbar;
