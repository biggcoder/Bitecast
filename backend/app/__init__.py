from fastapi import FastAPI

# Create a FastAPI instance
app = FastAPI()

# Import routes or other components
from .other_files import router

# Include the router
app.include_router(router)