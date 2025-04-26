// summaryService.js
const API_URL = "http://localhost:8000/api"; // Your backend URL

export const summaryService = {
  // Generate summary from YouTube URL
  createSummary: async (youtubeUrl, model = "openai") => {
    try {
      const response = await fetch(`${API_URL}/summary/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: youtubeUrl,
          model: model
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate summary');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Summary creation error:", error);
      throw error;
    }
  },
  
  // Get summary by video ID
  getSummary: async (videoId, model = "openai") => {
    try {
      const response = await fetch(`${API_URL}/summary/${videoId}?model=${model}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch summary');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Summary fetch error:", error);
      throw error;
    }
  },
  
  // Convert summary to speech
  textToSpeech: async (text) => {
    try {
      const response = await fetch(`${API_URL}/tts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }
      
      return await response.blob();
    } catch (error) {
      console.error("Text-to-speech error:", error);
      throw error;
    }
  }
};

export default summaryService;