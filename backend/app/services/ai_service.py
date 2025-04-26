import os
import logging
import requests
import google.generativeai as genai
import openai
from typing import Dict, Any, Optional

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        # Initialize OpenAI client
        openai_api_key = os.getenv("Open_AI_API")
        if not openai_api_key:
            logger.warning("OpenAI API key not found in environment variables")
        else:
            openai.api_key = openai_api_key
            self.openai_client = openai.OpenAI(api_key=openai_api_key)
        
        # Initialize Gemini client
        gemini_api_key = os.getenv("gemini_API")
        if not gemini_api_key:
            logger.warning("Gemini API key not found in environment variables")
        else:
            genai.configure(api_key=gemini_api_key)
    
    async def generate_summary(self, transcript: str, model_choice: str = "openai") -> Dict[str, Any]:
        """
        Generate a summary of the transcript using the selected AI model.
        
        Args:
            transcript: The text to summarize
            model_choice: The AI model to use ('openai' or 'gemini')
            
        Returns:
            Dictionary containing the summary and any additional information
        """
        try:
            if model_choice == "openai":
                return await self._generate_openai_summary(transcript)
            elif model_choice == "gemini":
                return await self._generate_gemini_summary(transcript)
            else:
                return {"error": f"Unsupported model choice: {model_choice}"}
        except Exception as e:
            logger.error(f"Error generating summary: {str(e)}")
            return {"error": f"Failed to generate summary: {str(e)}"}
    
    async def _generate_openai_summary(self, transcript: str) -> Dict[str, Any]:
        """Generate summary using OpenAI models"""
        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that summarizes content."},
                    {"role": "user", "content": f"Please provide a concise summary of the following transcript: {transcript}"}
                ],
                max_tokens=500
            )
            
            summary = response.choices[0].message.content
            return {
                "summary": summary,
                "model": "openai",
                "tokens_used": response.usage.total_tokens
            }
        except Exception as e:
            logger.error(f"OpenAI summary generation error: {str(e)}")
            raise
    
    async def _generate_gemini_summary(self, transcript: str) -> Dict[str, Any]:
        """Generate summary using Google's Gemini models"""
        try:
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(
                f"Please provide a concise summary of the following transcript: {transcript}"
            )
            
            summary = response.text
            return {
                "summary": summary,
                "model": "gemini"
            }
        except Exception as e:
            logger.error(f"Gemini summary generation error: {str(e)}")
            raise
    
    async def generate_text_to_speech(self, text: str) -> Optional[bytes]:
        """
        Convert text to speech using OpenAI's TTS model
        
        Args:
            text: The text to convert to speech
            
        Returns:
            Audio data as bytes or None if an error occurs
        """
        try:
            response = self.openai_client.audio.speech.create(
                model="tts-1",
                voice="alloy",
                input=text
            )
            
            # Get the audio content
            audio_data = response.content
            return audio_data
        except Exception as e:
            logger.error(f"TTS generation error: {str(e)}")
            return None
