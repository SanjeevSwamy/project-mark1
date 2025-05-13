import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ScanUpload from './pages/ScanUpload';
import ScanResults from './pages/ScanResults';
import Doctors from './pages/Doctors';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import ConnectDevices from './pages/ConnectDevices';
import FileUpload from './pages/FileUpload'; // <-- Add this import if your upload page is here

// Layout
import Layout from './components/Layout';

// Auth context
import { AuthProvider } from './context/AuthContext';
// Theme context
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="upload" element={<ScanUpload />} />
              <Route path="results/:scanId" element={<ScanResults />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="settings" element={<Settings />} />
              <Route path="devices" element={<ConnectDevices />} />
              <Route path="upload-scan" element={<FileUpload />} /> {/* <-- Add this line */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
