import React, { useState } from 'react';

interface ScheduleConsultationProps {
  onClose?: () => void;
}

const ScheduleConsultation: React.FC<ScheduleConsultationProps> = ({ onClose }) => {
  const [consultationType, setConsultationType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleScheduleConsultation = async () => {
    setError('');
    if (!consultationType || !date || !time) {
      setError('Please select consultation type, date, and time');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setConfirmation(`Consultation scheduled for ${consultationType} on ${date} at ${time}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg relative">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Schedule Consultation</h2>
      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Consultation Type:</span>
        <select
          value={consultationType}
          onChange={e => setConsultationType(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        >
          <option value="">Select</option>
          <option value="General">General</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
        </select>
      </label>
      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date:</span>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        />
      </label>
      <label className="block mb-6">
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time:</span>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        />
      </label>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleScheduleConsultation}
          disabled={loading}
          className="px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        >
          {loading ? 'Scheduling...' : 'Schedule Consultation'}
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          >
            Close
          </button>
        )}
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {confirmation && <p className="mt-4 text-sm text-green-600">{confirmation}</p>}
    </div>
  );
};

export default ScheduleConsultation;
