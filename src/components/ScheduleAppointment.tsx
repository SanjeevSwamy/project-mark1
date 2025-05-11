import React, { useState } from 'react';

interface ScheduleAppointmentProps {
  doctor?: string;
  onClose?: () => void;
}

const ScheduleAppointment: React.FC<ScheduleAppointmentProps> = ({ doctor, onClose }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctorName, setDoctorName] = useState(doctor || '');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleScheduleAppointment = async () => {
    setError('');
    if (!date || !time || !doctorName) {
      setError('Please select date, time, and doctor');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setConfirmation(`Appointment scheduled with ${doctorName} on ${date} at ${time}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg relative">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Schedule Appointment</h2>
      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Doctor:</span>
        <input
          type="text"
          value={doctorName}
          onChange={e => setDoctorName(e.target.value)}
          placeholder="Doctor's name"
          className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          disabled={!!doctor}
        />
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
          onClick={handleScheduleAppointment}
          disabled={loading}
          className="px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        >
          {loading ? 'Scheduling...' : 'Schedule Appointment'}
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

export default ScheduleAppointment;
