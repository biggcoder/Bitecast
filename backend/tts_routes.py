from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from io import BytesIO
from app.services.ai_service import AIService

router = APIRouter(prefix="/api/tts", tags=["text-to-speech"])

# Initialize service
ai_service = AIService()

class TTSRequest(BaseModel):
    text: str
    voice: str = "alloy"  # Default voice

@router.post("/")
async def text_to_speech(request: TTSRequest):
    """
    Convert text to speech using OpenAI's TTS API
    """
    audio_data = await ai_service.generate_text_to_speech(request.text)
    
    if not audio_data:
        raise HTTPException(status_code=500, detail="Failed to generate speech")
    
    # Return audio as a streaming response
    return StreamingResponse(
        BytesIO(audio_data),
        media_type="audio/mpeg",
        headers={"Content-Disposition": "attachment; filename=speech.mp3"}
    )
