export const saveToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('authToken');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('authToken');
  };
  
  export const saveSummaryToHistory = (summary) => {
    const history = getSummaryHistory();
    history.unshift(summary);
    localStorage.setItem('summaryHistory', JSON.stringify(history));
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