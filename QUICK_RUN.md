# Quick Start Guide

## 🚀 Running the Application

All services have been started in separate PowerShell windows. Please wait 10-15 seconds for them to fully initialize.

### Services Running:

1. **Gemini Service** - Port 3001
   - Handles LLM bio processing
   - URL: http://localhost:3001

2. **Backend API** - Port 8000
   - FastAPI backend with MongoDB
   - API Docs: http://localhost:8000/docs
   - Health: http://localhost:8000/api/health

3. **Frontend App** - Port 5173
   - React + Vite application
   - **👉 Open this in your browser: http://localhost:5173**

### Access the Application

1. Wait 10-15 seconds for services to start
2. Open your browser and go to: **http://localhost:5173**
3. You should see the Flash Request homepage

### Features Available

- **Homepage**: Browse the marketplace
- **Login/Sign Up**: Create an account at http://localhost:5173/login
- **User Profiles**: View enhanced seller profiles
- **Smart Ping**: Find matches for flash requests

### Stopping Services

To stop all services:
1. Close each PowerShell window that was opened
2. Or press `Ctrl+C` in each service window

### Troubleshooting

If a service doesn't start:
1. Check the PowerShell window for error messages
2. Ensure ports 3001, 8000, and 5173 are not in use
3. Verify dependencies are installed:
   - Frontend: `npm install` (root directory)
   - Gemini: `npm install` (json-parsing-gemini directory)
   - Backend: `pip install -r requirements.txt`

### MongoDB Connection

The backend will connect to MongoDB automatically. If MongoDB is unavailable, the app will continue running but user features may not work.

