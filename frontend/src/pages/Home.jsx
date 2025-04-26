import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import LoadingSpinner from '../components/LoadingSpinner';
import { getSummary } from '../services/api';
import { getSettings, saveSummaryToHistory } from '../services/storageService';

const Home = ({ currentUrl }) => {
  const [url, setUrl] = useState('');
  const [model, setModel] = useState('openai');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUrl && currentUrl.includes('youtube.com/watch')) {
      setUrl(currentUrl);
    }
    const settings = getSettings();
    setModel(settings.defaultModel);
  }, [currentUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a YouTube URL');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const summary = await getSummary(url, model);
      
      saveSummaryToHistory({
        ...summary,
        url,
        timestamp: new Date().toISOString()
      });
      
      navigate(`/summary/${summary.video_id}`, { state: { summary } });
    } catch (error) {
      setError(error.message || 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">AI Content Summarizer</h1>
        <p className="text-sm text-gray-600">Summarize YouTube videos in seconds</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            YouTube URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="input"
          />
        </div>
        
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
            AI Model
          </label>
          <Dropdown
            id="model"
            value={model}
            onChange={setModel}
            options={[
              { value: 'openai', label: 'OpenAI' },
              { value: 'gemini', label: 'Google Gemini' }
            ]}
          />
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {error}
          </div>
        )}
        
        <Button
          type="submit"
          className="w-full btn-primary"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : 'Generate Summary'}
        </Button>
      </form>
      
      <div className="mt-auto pt-4">
        <div className="flex justify-between text-sm text-gray-500">
          <button 
            onClick={() => navigate('/history')}
            className="text-blue-600 hover:underline"
          >
            View History
          </button>
          <button 
            onClick={() => navigate('/settings')}
            className="text-blue-600 hover:underline"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;