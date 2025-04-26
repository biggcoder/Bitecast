import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import { getSettings, saveSettings } from '../services/storageService';

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    defaultModel: 'openai',
    autoSummarize: false,
    darkMode: false
  });

  useEffect(() => {
    const userSettings = getSettings();
    setSettings(userSettings);
  }, []);

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    saveSettings(settings);
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
        <Button onClick={() => navigate('/')} className="btn-secondary text-sm">
          Back
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="defaultModel" className="block text-sm font-medium text-gray-700 mb-1">
            Default AI Model
          </label>
          <Dropdown
            id="defaultModel"
            value={settings.defaultModel}
            onChange={(value) => handleChange('defaultModel', value)}
            options={[
              { value: 'openai', label: 'OpenAI' },
              { value: 'gemini', label: 'Google Gemini' }
            ]}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label htmlFor="autoSummarize" className="text-sm font-medium text-gray-700">
            Auto-summarize YouTube videos
          </label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input
              type="checkbox"
              id="autoSummarize"
              name="autoSummarize"
              checked={settings.autoSummarize}
              onChange={(e) => handleChange('autoSummarize', e.target.checked)}
              className="sr-only"
            />
            <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
            <div
              className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${
                settings.autoSummarize ? 'translate-x-4' : 'translate-x-0'
              }`}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <label htmlFor="darkMode" className="text-sm font-medium text-gray-700">
            Dark Mode
          </label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input
              type="checkbox"
              id="darkMode"
              name="darkMode"
              checked={settings.darkMode}
              onChange={(e) => handleChange('darkMode', e.target.checked)}
              className="sr-only"
            />
            <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
            <div
              className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${
                settings.darkMode ? 'translate-x-4' : 'translate-x-0'
              }`}
            ></div>
          </div>
        </div>
      </div>
      
      <Button onClick={handleSave} className="w-full btn-primary mt-6">
        Save Settings
      </Button>
      
      <div className="pt-4 mt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          AI Content Summarizer v1.0.0
        </p>
      </div>
    </div>
  );
};

export default Settings;