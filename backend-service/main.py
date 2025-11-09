"""
Main entry point for the backend API service.
This file is used by Render for deployment.
"""
from backend.app import app

if __name__ == "__main__":
    import uvicorn
    import os
    
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
