# 🔐 Environment Variables Configuration Guide

This document contains all environment variables needed for each service.

## 📦 Service 1: Gemini AI Service

### Required Variables

```env
# Google Gemini API Key
# Get from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=AIzaSy...your-actual-key-here

# Service Port (Render sets this automatically)
PORT=3001

# CORS Configuration
# Add your frontend URL here
# For local dev, use: http://localhost:5173
# For production, use: https://your-frontend.onrender.com
CORS_ALLOW_ORIGINS=http://localhost:5173,https://your-frontend.onrender.com
```

### How to Set in Render
1. Go to your Gemini service dashboard
2. Click "Environment" tab
3. Add each variable with its value
4. Click "Save Changes"

---

## 📦 Service 2: Backend API

### Required Variables

```env
# MongoDB Configuration
# Get from MongoDB Atlas: https://cloud.mongodb.com/
# Format: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Database Name
DB_NAME=flashrequest

# Gemini Service URL
# Use the URL from your deployed Gemini service
# Example: https://flashrequest-gemini.onrender.com
GEMINI_SERVICE_URL=https://your-gemini-service.onrender.com

# JWT Configuration
# Click "Generate" in Render for a secure random key
JWT_SECRET_KEY=your-very-secure-random-string-here

# JWT Algorithm (keep as is)
JWT_ALGORITHM=HS256

# CORS Configuration
# Add your frontend URL(s)
CORS_ALLOW_ORIGINS=http://localhost:5173,https://your-frontend.onrender.com

# Python Version
PYTHON_VERSION=3.11.0

# Service Port (Render sets this automatically)
PORT=8000
```

### How to Set in Render
1. Go to your Backend service dashboard
2. Click "Environment" tab
3. For `JWT_SECRET_KEY`, click "Generate" button
4. Add other variables manually
5. Click "Save Changes"

### MongoDB Atlas Setup
1. Go to https://cloud.mongodb.com/
2. Create a free cluster
3. Create a database user
4. Get the connection string
5. Replace `<username>` and `<password>` with actual credentials
6. Make sure to URL-encode special characters in password

---

## 📦 Service 3: Frontend (Static Site)

### Required Variables

```env
# Backend API URL
# Use the URL from your deployed Backend service
# Example: https://flashrequest-backend.onrender.com
VITE_API_BASE_URL=https://your-backend.onrender.com

# Node.js Version
NODE_VERSION=18.17.0
```

### How to Set in Render
1. Go to your Frontend static site dashboard
2. Click "Environment" tab
3. Add each variable
4. Click "Save Changes"
5. Site will rebuild automatically

---

## 🔄 Update Order

When updating environment variables:

1. **If changing Gemini URL**: Update Backend's `GEMINI_SERVICE_URL`
2. **If changing Backend URL**: Update Frontend's `VITE_API_BASE_URL`
3. **If changing Frontend URL**: Update CORS in both Gemini and Backend

After updating, each affected service will automatically redeploy.

---

## 🧪 Testing Environment Variables

### Test Gemini Service Connection
```bash
# Should return 200 OK
curl -I https://your-gemini-service.onrender.com/health
```

### Test Backend MongoDB Connection
Check the backend logs after deployment. You should see:
```
[OK] MongoDB Connected: flashrequest Database
```

### Test Backend → Gemini Connection
Try to submit a flash request through the frontend. Check backend logs for:
```
Gemini service response: ...
```

### Test Frontend → Backend Connection
Open browser console when using the frontend. There should be no CORS errors.

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** to Git
2. **Use strong passwords** for MongoDB
3. **Rotate JWT_SECRET_KEY** periodically
4. **Restrict MongoDB network access** to Render IPs if possible
5. **Use environment-specific values** (don't mix dev/prod)

---

## 📝 Local Development vs Production

### Local Development (.env files)

**backend-service/.env**
```env
MONGODB_URI=mongodb+srv://...
DB_NAME=flashrequest
GEMINI_SERVICE_URL=http://localhost:3001
JWT_SECRET_KEY=dev-secret-key-not-for-production
JWT_ALGORITHM=HS256
CORS_ALLOW_ORIGINS=http://localhost:5173
```

**gemini-service/.env**
```env
GEMINI_API_KEY=AIzaSy...
PORT=3001
CORS_ALLOW_ORIGINS=http://localhost:5173
```

**frontend/.env.local**
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Production (Render Dashboard)

Use the actual deployed URLs for all service references.

---

## ⚠️ Common Issues

### Issue: "GEMINI_API_KEY is not defined"
- Check that `GEMINI_API_KEY` is set in Gemini service
- Verify the key is valid at https://makersuite.google.com/

### Issue: "MongoDB connection error"
- Check `MONGODB_URI` is correct
- Verify MongoDB Atlas network access allows Render IPs (0.0.0.0/0 for simplicity)
- Check database user credentials are correct

### Issue: "Cannot connect to Gemini service"
- Verify `GEMINI_SERVICE_URL` in Backend matches actual Gemini URL
- Check Gemini service is running (visit its health endpoint)
- Ensure URL has no trailing slash

### Issue: "CORS error in browser"
- Check `CORS_ALLOW_ORIGINS` in Backend includes Frontend URL
- Check `CORS_ALLOW_ORIGINS` in Gemini includes Frontend URL
- Verify URLs match exactly (no http vs https mismatch)

---

## 📋 Quick Copy Template

For easy copying to Render:

### Gemini Service
```
GEMINI_API_KEY: [your-key]
PORT: 3001
CORS_ALLOW_ORIGINS: [frontend-url]
```

### Backend Service
```
MONGODB_URI: [connection-string]
DB_NAME: flashrequest
GEMINI_SERVICE_URL: [gemini-url]
JWT_SECRET_KEY: [generate]
JWT_ALGORITHM: HS256
CORS_ALLOW_ORIGINS: [frontend-url]
PYTHON_VERSION: 3.11.0
```

### Frontend
```
VITE_API_BASE_URL: [backend-url]
NODE_VERSION: 18.17.0
```
