from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Dict, Any, Optional
from pydantic import BaseModel, HttpUrl

from app.services.youtube import YouTubeService
from app.services.ai_service import AIService

router = APIRouter(prefix="/api/summary", tags=["summary"])

# Initialize services
youtube_service = YouTubeService()
ai_service = AIService()

class SummaryRequest(BaseModel):
    url: str
    model: Optional[str] = "openai"  # Default to OpenAI

class SummaryResponse(BaseModel):
    video_id: str
    summary: str
    model_used: str

@router.post("/", response_model=SummaryResponse)
async def create_summary(request: SummaryRequest):
    """
    Generate a summary for a YouTube video
    """
    # Extract video ID from URL
    video_id = youtube_service.extract_video_id(request.url)
    if not video_id:
        raise HTTPException(status_code=400, detail="Invalid YouTube URL")
    
    # Get transcript
    success, transcript_data = await youtube_service.get_transcript(video_id)
    if not success:
        raise HTTPException(status_code=404, detail=transcript_data.get("error", "Failed to fetch transcript"))
    
    # Generate summary
    summary_result = await ai_service.generate_summary(
        transcript_data["transcript"], 
        model_choice=request.model
    )
    
    if "error" in summary_result:
        raise HTTPException(status_code=500, detail=summary_result["error"])
    
    return {
        "video_id": video_id,
        "summary": summary_result["summary"],
        "model_used": summary_result["model"]
    }

@router.get("/{video_id}")
async def get_summary(video_id: str, model: str = Query("openai", description="AI model to use")):
    """
    Get a summary for a YouTube video by ID
    """
    # Get transcript
    success, transcript_data = await youtube_service.get_transcript(video_id)
    if not success:
        raise HTTPException(status_code=404, detail=transcript_data.get("error", "Failed to fetch transcript"))
    
    # Generate summary
    summary_result = await ai_service.generate_summary(transcript_data["transcript"], model_choice=model)
    
    if "error" in summary_result:
        raise HTTPException(status_code=500, detail=summary_result["error"])
    
    return {
        "video_id": video_id,
        "summary": summary_result["summary"],
        "model_used": summary_result["model"]
    }
