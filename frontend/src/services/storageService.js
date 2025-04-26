// src/services/storageService.js
export const saveSummaryToHistory = (summary) => {
    const history = getSummaryHistory();
    history.unshift(summary);
    // Limit history to 50 items
    const limitedHistory = history.slice(0, 50);
    localStorage.setItem('summaryHistory', JSON.stringify(limitedHistory));
  };
  
  export const getSummaryHistory = () => {
    const history = localStorage.getItem('summaryHistory');
    return history ? JSON.parse(history) : [];
  };
  
  export const clearSummaryHistory = () => {
    localStorage.removeItem('summaryHistory');
  };
  
  export const saveSettings = (settings) => {
    localStorage.setItem('settings', JSON.stringify(settings));
  };
  
  export const getSettings = () => {
    const settings = localStorage.getItem('settings');
    return settings ? JSON.parse(settings) : {
      defaultModel: 'openai',
      autoSummarize: false,
      darkMode: false
    };
  };