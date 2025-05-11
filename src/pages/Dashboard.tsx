import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, FileCheck, Clock, Heart, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ScheduleAppointment from '../components/ScheduleAppointment';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showAppointment, setShowAppointment] = useState(false);

  const recentScans = [
    {
      id: '1',
      date: '2025-02-15',
      type: 'ECG',
      status: 'abnormal',
      result: 'Possible arrhythmia detected',
      confidence: 89,
    },
    {
      id: '2',
      date: '2025-01-30',
      type: 'Echocardiogram',
      status: 'normal',
      result: 'No abnormalities detected',
      confidence: 95,
    },
    {
      id: '3',
      date: '2025-01-15',
      type: 'ECG',
      status: 'normal',
      result: 'Normal sinus rhythm',
      confidence: 97,
    },
  ];

  const stats = [
    { name: 'Heart Rate', value: '72', unit: 'bpm', icon: <Heart className="h-6 w-6 text-rose-500" /> },
    { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: <Activity className="h-6 w-6 text-cyan-500" /> },
    { name: 'Total Scans', value: '8', unit: '', icon: <FileCheck className="h-6 w-6 text-emerald-500" /> },
    { name: 'Next Checkup', value: 'May 10', unit: '2025', icon: <Clock className="h-6 w-6 text-amber-500" /> },
  ];

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
        <p className="text-gray-600 dark:text-gray-300">Here's your health summary and recent activity</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                <p className="mt-1 text-2xl font-semibold">
                  {stat.value}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">{stat.unit}</span>
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-full p-2">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Health Status Alert */}
      <div className="mb-8 bg-amber-50 dark:bg-amber-900 border-l-4 border-amber-500 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">Attention needed</h3>
            <div className="mt-2 text-sm text-amber-700 dark:text-amber-100">
              <p>
                Based on your recent ECG scan, we recommend scheduling a follow-up appointment with your cardiologist.
              </p>
            </div>
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  onClick={() => setShowAppointment(true)}
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for scheduling */}
      {showAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ScheduleAppointment onClose={() => setShowAppointment(false)} />
        </div>
      )}

      {/* Recent Scans */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8 border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium">Recent Scans</h3>
          <Link 
            to="/upload" 
            className="text-sm font-medium text-cyan-600 hover:text-cyan-500 flex items-center"
          >
            Upload New Scan
            <ArrowUpRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Result</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentScans.map((scan) => (
                <tr key={scan.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{scan.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{scan.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      scan.status === 'normal' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {scan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{scan.result}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{scan.confidence}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/results/${scan.id}`} className="text-cyan-600 hover:text-cyan-900">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
