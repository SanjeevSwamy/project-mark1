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
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import ConnectDevices from './pages/ConnectDevices';


// Auth context
import { AuthProvider } from './context/AuthContext';
// Theme context
import { ThemeProvider } from './context/ThemeContext'; // <-- Import this

function App() {
  return (
    <ThemeProvider> {/* <-- Wrap your app in ThemeProvider */}
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
              <Route path="*" element={<NotFound />} />
              <Route path="/devices" element={<ConnectDevices />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
