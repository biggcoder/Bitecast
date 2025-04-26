from fastapi import APIRouter

# Create a router instance
router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Welcome to the AI Service API"}

@router.get("/health")
async def health_check():
    return {"status": "healthy"}