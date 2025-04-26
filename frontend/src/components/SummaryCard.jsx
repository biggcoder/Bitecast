import React from 'react';

const SummaryCard = ({ summary, isHistoryItem = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  if (isHistoryItem) {
    return (
      <div className="border border-gray-200 rounded-lg p-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-800 text-sm">
            Video ID: {summary.video_id}
          </h3>
          <span className="text-xs text-gray-500">
            {summary.timestamp && formatDate(summary.timestamp)}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {summary.summary}
        </p>
        <div className="mt-2 text-xs text-gray-500">
          Model: {summary.model_used}
        </div>
      </div>
    );
  }
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">
            YouTube Video Summary
          </h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {summary.model_used}
          </span>
        </div>
        
        <div className="text-xs text-gray-500 mb-1">
          Video ID: {summary.video_id}
        </div>
        
        {summary.timestamp && (
          <div className="text-xs text-gray-500">
            Generated: {formatDate(summary.timestamp)}
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-100 pt-3">
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {summary.summary}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;