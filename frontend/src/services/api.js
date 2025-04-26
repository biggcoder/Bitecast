const API_BASE_URL = 'http://localhost:8000/api';

const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `API request failed with status ${response.status}`);
  }

  return response;
};

export const getSummary = async (url, model = 'openai') => {
  const response = await fetchWithAuth('/summary/', {
    method: 'POST',
    body: JSON.stringify({ url, model })
  });
  return response.json();
};

export const getTextToSpeech = async (text) => {
  const response = await fetchWithAuth('/tts/', {
    method: 'POST',
    body: JSON.stringify({ text })
  });
  return response.blob();
};

export const getUserSummaryHistory = async () => {
  const response = await fetchWithAuth('/summary/history');
  return response.json();
};