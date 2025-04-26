import { API_BASE_URL } from '../config';

export const getSummary = async (url, model = 'openai') => {
  try {
    const response = await fetch(`${API_BASE_URL}/summary/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url, model })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `API request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching summary:', error);
    throw error;
  }
};

export const getTextToSpeech = async (text) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `TTS request failed with status ${response.status}`);
    }

    return response.blob();
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
};

export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health/`);
    return response.ok;
  } catch (error) {
    console.error('Backend not reachable:', error);
    return false;
  }
};
