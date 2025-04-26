import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Summary from './pages/Summary';
import History from './pages/History';
import Settings from './pages/Settings';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (chrome.runtime) {
      chrome.runtime.sendMessage({ action: "getCurrentUrl" }, (response) => {
        if (response && response.url) {
          setCurrentUrl(response.url);
        }
      });
    }
  }, []);

  return (
    <div className="w-96 h-[600px] bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-auto p-4">
        <Routes>
          <Route path="/" element={<Home currentUrl={currentUrl} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/summary/:videoId" element={<Summary />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;