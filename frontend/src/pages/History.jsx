import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import SummaryCard from '../components/SummaryCard';
import { getSummaryHistory, clearSummaryHistory } from '../services/storageService';

const History = () => {
  const [summaries, setSummaries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const history = getSummaryHistory();
    setSummaries(history);
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your history?')) {
      clearSummaryHistory();
      setSummaries([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Summary History</h2>
        <div className="flex space-x-2">
          <Button onClick={() => navigate('/')} className="btn-secondary text-sm">
            Back
          </Button>
          {summaries.length > 0 && (
            <Button onClick={handleClearHistory} className="btn-secondary text-sm">
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {summaries.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No summary history found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {summaries.map((summary, index) => (
            <div 
              key={index} 
              onClick={() => navigate(`/summary/${summary.video_id}`, { state: { summary } })}
              className="cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-lg"
            >
              <SummaryCard summary={summary} isHistoryItem={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;