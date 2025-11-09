# 🚀 FlashRequest - Render Deployment Guide

This guide will walk you through deploying the FlashRequest marketplace application on Render. The application consists of three services:
1. **Backend API** (Python/FastAPI)
2. **Gemini AI Service** (Node.js/Express)
3. **Frontend** (React/Vite)

---

## 📋 Prerequisites

Before you begin, ensure you have:
- A Render account ([sign up here](https://render.com))
- A MongoDB Atlas account with a database set up
- A Google Gemini API key
- Your GitHub repository connected to Render

---

## 🔧 Step-by-Step Deployment

### Step 1: Deploy the Gemini AI Service (First!)

The Gemini service needs to be deployed first because the backend depends on it.

1. **Create a New Web Service** in Render
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository: `atiatlwin`

2. **Configure the Service:**
   - **Name:** `flashrequest-gemini` (or your preferred name)
   - **Region:** Select closest to your users
   - **Branch:** `main`
   - **Root Directory:** `gemini-service`
   - **Runtime:** `Node`
   - **Build Command:**
     ```bash
     npm install && npm run build
     ```
   - **Start Command:**
     ```bash
     npm start
     ```

3. **Environment Variables:**
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `PORT`: `3001` (or leave blank, Render will set this)
   - `CORS_ALLOW_ORIGINS`: Your frontend URL (you'll update this later)

4. **Create the Service** and wait for deployment to complete

5. **Copy the Service URL** (e.g., `https://flashrequest-gemini.onrender.com`)

---

### Step 2: Deploy the Backend API

1. **Create a New Web Service** in Render
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Service:**
   - **Name:** `flashrequest-backend`
   - **Region:** Select closest to your users (same as Gemini service)
   - **Branch:** `main`
   - **Root Directory:** `backend-service`
   - **Runtime:** `Python 3`
   - **Build Command:**
     ```bash
     pip install -r requirements.txt
     ```
   - **Start Command:**
     ```bash
     uvicorn backend.app:app --host 0.0.0.0 --port $PORT
     ```

3. **Environment Variables:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
     ```
     mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
     ```
   - `DB_NAME`: `flashrequest`
   - `GEMINI_SERVICE_URL`: The Gemini service URL from Step 1 (e.g., `https://flashrequest-gemini.onrender.com`)
   - `JWT_SECRET_KEY`: Click "Generate" in Render to create a secure key
   - `JWT_ALGORITHM`: `HS256`
   - `CORS_ALLOW_ORIGINS`: Your frontend URL (you'll update this later, for now use `*`)
   - `PYTHON_VERSION`: `3.11.0`

4. **Create the Service** and wait for deployment

5. **Copy the Service URL** (e.g., `https://flashrequest-backend.onrender.com`)

---

### Step 3: Deploy the Frontend

1. **Create a New Static Site** in Render
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure the Static Site:**
   - **Name:** `flashrequest-frontend`
   - **Branch:** `main`
   - **Root Directory:** `frontend`
   - **Build Command:**
     ```bash
     npm install && npm run build
     ```
   - **Publish Directory:**
     ```bash
     dist
     ```

3. **Environment Variables:**
   - `VITE_API_BASE_URL`: The backend service URL from Step 2 (e.g., `https://flashrequest-backend.onrender.com`)
   - `NODE_VERSION`: `18.17.0`

4. **Create the Static Site** and wait for deployment

5. **Copy the Site URL** (e.g., `https://flashrequest.onrender.com`)

---

### Step 4: Update CORS Settings

Now that all services are deployed, update the CORS settings:

1. **Update Backend Service:**
   - Go to your backend service in Render
   - Navigate to "Environment" tab
   - Update `CORS_ALLOW_ORIGINS` to your frontend URL:
     ```
     https://flashrequest.onrender.com,http://localhost:5173
     ```
   - Save and redeploy

2. **Update Gemini Service:**
   - Go to your Gemini service in Render
   - Navigate to "Environment" tab
   - Add/Update `CORS_ALLOW_ORIGINS` to your frontend URL:
     ```
     https://flashrequest.onrender.com,http://localhost:5173
     ```
   - Save and redeploy

---

## 🔗 Service URLs Summary

After deployment, you should have:
- **Frontend:** `https://flashrequest.onrender.com`
- **Backend API:** `https://flashrequest-backend.onrender.com`
- **Gemini Service:** `https://flashrequest-gemini.onrender.com`

---

## ✅ Verification

### Test Backend API
```bash
curl https://flashrequest-backend.onrender.com/health
```

### Test Gemini Service
```bash
curl -X POST https://flashrequest-gemini.onrender.com/api/parse-request \
  -H "Content-Type: application/json" \
  -d '{"text": "Looking for a used bicycle"}'
```

### Test Frontend
Open your browser and navigate to your frontend URL.

---

## 🐛 Troubleshooting

### Issue: Services won't start
- Check the logs in Render dashboard
- Verify all environment variables are set correctly
- Ensure MongoDB connection string is valid

### Issue: CORS errors
- Make sure `CORS_ALLOW_ORIGINS` includes your frontend URL
- Verify the URLs don't have trailing slashes
- Check that all services have redeployed after CORS changes

### Issue: Cannot connect to backend
- Verify `VITE_API_BASE_URL` is set correctly in frontend
- Check that backend service is running in Render dashboard
- Test backend API endpoint directly

### Issue: Gemini API errors
- Verify `GEMINI_API_KEY` is valid
- Check Gemini service logs for detailed error messages
- Ensure `GEMINI_SERVICE_URL` in backend matches actual Gemini service URL

---

## 💰 Free Tier Considerations

Render's free tier includes:
- Free web services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-50 seconds
- 750 hours/month of free usage per service

**Tips:**
- Consider keeping services on paid tier ($7/month) for better performance
- Use Render's "Keep Service Awake" feature or external monitoring services

---

## 🔄 Continuous Deployment

All services are configured for automatic deployment:
- Push to `main` branch triggers automatic redeployment
- Render rebuilds and redeploys the affected service
- Monitor deployment status in Render dashboard

---

## 📝 Local Development

To test locally with deployed services:

1. **Frontend** (connect to deployed backend):
   ```bash
   cd frontend
   echo "VITE_API_BASE_URL=https://flashrequest-backend.onrender.com" > .env.local
   npm install
   npm run dev
   ```

2. **Backend** (connect to deployed Gemini):
   ```bash
   cd backend-service
   echo "GEMINI_SERVICE_URL=https://flashrequest-gemini.onrender.com" > .env
   # Add other env vars from .env.example
   pip install -r requirements.txt
   uvicorn backend.app:app --reload --port 8000
   ```

3. **All services locally:**
   - Follow the original setup instructions in each service's README.md
   - Use local environment variables

---

## 📧 Support

If you encounter issues:
1. Check Render dashboard logs
2. Review environment variables
3. Test each service independently
4. Check MongoDB Atlas network access settings

---

## 🎉 Success!

Once all three services are deployed and communicating:
- Users can access the frontend
- Submit flash requests via the UI
- LLM parsing happens via Gemini service
- Matching occurs in the backend
- All data is stored in MongoDB

Your FlashRequest marketplace is now live! 🚀
