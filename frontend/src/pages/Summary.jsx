// src/pages/Summary.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import SummaryCard from '../components/SummaryCard';
import AudioPlayer from '../components/AudioPlayer';
import { getTextToSpeech } from '../services/api';

const Summary = () => {
  const { videoId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Use the summary passed in location state or try to get it from history
    if (location.state?.summary) {
      setSummary(location.state.summary);
    } else {
      // Try to find in history
      const history = JSON.parse(localStorage.getItem('summaryHistory') || '[]');
      const savedSummary = history.find(item => item.video_id === videoId);
      
      if (savedSummary) {
        setSummary(savedSummary);
      } else {
        setError('Summary not found');
      }
    }
  }, [videoId, location.state]);

  const handleGenerateAudio = async () => {
    if (!summary) return;
    
    try {
      setLoading(true);
      const blob = await getTextToSpeech(summary.summary);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      setError('Failed to generate audio');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => navigate('/')} className="btn-primary mt-4">
          Back to Home
        </Button>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
        <Button onClick={() => navigate('/')} className="btn-secondary text-sm">
          Back
        </Button>
      </div>
      
      <SummaryCard summary={summary} />
      
      <div className="space-y-4 mt-6">
        <Button 
          onClick={handleGenerateAudio} 
          className="w-full btn-primary"
          disabled={loading}
        >
          {loading ? 'Generating Audio...' : 'Listen to Summary'}
        </Button>
        
        {audioUrl && (
          <AudioPlayer src={audioUrl} />
        )}
      </div>
    </div>
  );
};

export default Summary;