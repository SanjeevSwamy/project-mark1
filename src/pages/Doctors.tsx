import React, { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import ScheduleAppointment from '../components/ScheduleAppointment';

const doctors = [
  {
    id: '1',
    name: 'Dr. Ashok Seth',
    specialty: 'Interventional Cardiologist',
    location: 'New Delhi',
    hospital: 'Fortis Escorts Heart Institute',
    rating: 4.9,
    reviews: 420,
    available: true,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '2',
    name: 'Dr. Subash Chandra',
    specialty: 'Interventional Cardiologist',
    location: 'Delhi',
    hospital: 'BLK-Max Super Speciality Hospital',
    rating: 4.8,
    reviews: 390,
    available: true,
    image: 'https://images.unsplash.com/photo-1612363584451-cd060fb62018?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRvY3RvciUyMGluZGlhbnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '3',
    name: 'Dr. Balbir Singh',
    specialty: 'Cardiologist',
    location: 'Delhi',
    hospital: 'Indraprastha Apollo Hospital',
    rating: 4.8,
    reviews: 370,
    available: true,
    image: 'https://images.unsplash.com/photo-1637059824899-a441006a6875?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGRvY3RvciUyMGluZGlhbnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '4',
    name: 'Dr. K K Saxena',
    specialty: 'Interventional Cardiologist',
    location: 'Delhi NCR',
    hospital: 'Fortis Hospital Noida',
    rating: 4.7,
    reviews: 350,
    available: true,
    image: 'https://plus.unsplash.com/premium_photo-1677165654854-a62b469ef44f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGRvY3RvciUyMGluZGlhbnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '5',
    name: 'Dr. Nidhi Rawal',
    specialty: 'Pediatric Cardiologist',
    location: 'Delhi',
    hospital: 'PGIMER, Delhi',
    rating: 4.9,
    reviews: 320,
    available: true,
    image: 'https://plus.unsplash.com/premium_photo-1682089872205-dbbae3e4ba32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yJTIwaW5kaWFuJTIwd29tZW58ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '6',
    name: 'Dr. Mahesh Ghogare',
    specialty: 'Interventional Cardiologist',
    location: 'Mumbai',
    hospital: 'Apollo Hospital, Navi Mumbai',
    rating: 4.8,
    reviews: 310,
    available: true,
    image: 'https://plus.unsplash.com/premium_photo-1661699733041-a4e02693adf5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGRvY3RvciUyMGluZGlhbnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '7',
    name: 'Dr. Devi Prasad Shetty',
    specialty: 'Cardiac Surgeon',
    location: 'Bangalore',
    hospital: 'Narayana Health',
    rating: 4.9,
    reviews: 500,
    available: true,
    image: 'https://media.istockphoto.com/id/1447908696/photo/medical-concept-of-asian-beautiful-female-doctor-in-white-coat-with-stethoscope-waist-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=vxmRI4XdZwMxhl8gdDdMXATprWJ-rH3u1H0_GDacJLw=',
  },
  {
    id: '8',
    name: 'Dr. Ramakanta Panda',
    specialty: 'Cardiac Surgeon',
    location: 'Mumbai',
    hospital: 'Asian Heart Institute',
    rating: 4.8,
    reviews: 410,
    available: true,
    image: 'https://plus.unsplash.com/premium_photo-1661745711599-7f3f3544b579?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGRvY3RvciUyMGluZGlhbiUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '9',
    name: 'Dr. S. Radhakrishnan',
    specialty: 'Cardiologist',
    location: 'Chennai',
    hospital: 'Apollo Hospitals',
    rating: 4.8,
    reviews: 190,
    available: true,
    image: 'https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGRvY3RvciUyMGluZGlhbiUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '10',
    name: 'Dr. Simran Jain',
    specialty: 'Pediatric Cardiologist',
    location: 'Indore',
    hospital: 'CARE CHL Hospitals',
    rating: 4.8,
    reviews: 160,
    available: true,
    image: 'https://media.istockphoto.com/id/1292859438/photo/portrait-female-doctor-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=fbYUEMUGQJm3bb24q3Eh3YSqcWsCQwhChK2TmshupQE=',
  },
];

// Get unique specialties and locations for filters
const specialties = Array.from(new Set(doctors.map(d => d.specialty)));
const locations = Array.from(new Set(doctors.map(d => d.location)));

const Doctors: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Filtering logic
  const filteredDoctors = doctors.filter(doc => {
    return (
      (selectedSpecialty === '' || doc.specialty === selectedSpecialty) &&
      (selectedLocation === '' || doc.location === selectedLocation)
    );
  });

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Find a Heart Specialist</h1>
        <p className="text-gray-600 dark:text-gray-300">Connect with top cardiologists and cardiac specialists</p>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
        <div className="flex items-center mb-3 md:mb-0">
          <Filter className="text-cyan-600 dark:text-cyan-400 mr-2" />
          <span className="text-gray-700 dark:text-gray-200 font-medium mr-2">Filter by:</span>
        </div>
        <select
          value={selectedSpecialty}
          onChange={e => setSelectedSpecialty(e.target.value)}
          className="mb-2 md:mb-0 mr-3 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-cyan-500"
        >
          <option value="">All Specialties</option>
          {specialties.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
        <select
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
          className="py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-cyan-500"
        >
          <option value="">All Locations</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        {(selectedSpecialty || selectedLocation) && (
          <button
            onClick={() => {
              setSelectedSpecialty('');
              setSelectedLocation('');
            }}
            className="ml-4 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md">
              <div className="p-6 flex flex-col md:flex-row md:items-center">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <img src={doctor.image} alt={doctor.name} className="h-20 w-20 rounded-full object-cover border-2 border-gray-200" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{doctor.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
                  <p className="text-gray-500 dark:text-gray-400">{doctor.hospital}, {doctor.location}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm text-gray-700 dark:text-gray-200">{doctor.rating} ({doctor.reviews} reviews)</span>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doctor.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {doctor.available ? 'Available for appointments' : 'Limited availability'}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      onClick={() => setSelectedDoctor(doctor.name)}
                      disabled={!doctor.available}
                    >
                      <Calendar size={16} className="mr-1" />
                      Schedule Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 p-6 text-center">
            <p className="text-gray-500 dark:text-gray-300">No doctors found matching your search criteria</p>
          </div>
        )}
      </div>
      {/* Modal for scheduling */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ScheduleAppointment doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
        </div>
      )}
    </div>
  );
};

export default Doctors;
