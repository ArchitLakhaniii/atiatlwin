# 📋 Render Configuration - Copy & Paste Ready

Quick reference for Render service configuration. Copy these values directly into Render.

---

## 🎯 Service 1: Gemini AI Service

### Basic Settings
```
Name: flashrequest-gemini
Type: Web Service
Region: [Your preferred region]
Branch: main
Root Directory: gemini-service
Runtime: Node
```

### Build & Deploy
```
Build Command:
npm install && npm run build

Start Command:
npm start
```

### Environment Variables
```
GEMINI_API_KEY=[YOUR_GEMINI_API_KEY]
PORT=3001
NODE_VERSION=18.17.0
CORS_ALLOW_ORIGINS=[FRONTEND_URL_AFTER_DEPLOYMENT]
```

---

## 🎯 Service 2: Backend API

### Basic Settings
```
Name: flashrequest-backend
Type: Web Service
Region: [Same as Gemini service]
Branch: main
Root Directory: backend-service
Runtime: Python 3
```

### Build & Deploy
```
Build Command:
pip install -r requirements.txt

Start Command:
uvicorn backend.app:app --host 0.0.0.0 --port $PORT
```

### Environment Variables
```
MONGODB_URI=[YOUR_MONGODB_CONNECTION_STRING]
DB_NAME=flashrequest
GEMINI_SERVICE_URL=[GEMINI_SERVICE_URL_FROM_STEP_1]
JWT_SECRET_KEY=[CLICK_GENERATE_IN_RENDER]
JWT_ALGORITHM=HS256
PYTHON_VERSION=3.11.0
CORS_ALLOW_ORIGINS=[FRONTEND_URL_AFTER_DEPLOYMENT]
PORT=8000
```

---

## 🎯 Service 3: Frontend (Static Site)

### Basic Settings
```
Name: flashrequest-frontend
Type: Static Site
Region: [Your preferred region]
Branch: main
Root Directory: frontend
```

### Build & Deploy
```
Build Command:
npm install && npm run build

Publish Directory:
dist
```

### Environment Variables
```
VITE_API_BASE_URL=[BACKEND_SERVICE_URL_FROM_STEP_2]
NODE_VERSION=18.17.0
```

---

## 🔄 Post-Deployment Updates

### Update Backend CORS
Navigate to: Backend Service → Environment → Edit

```
CORS_ALLOW_ORIGINS=https://[YOUR_FRONTEND_URL].onrender.com,http://localhost:5173
```

### Update Gemini CORS
Navigate to: Gemini Service → Environment → Edit

```
CORS_ALLOW_ORIGINS=https://[YOUR_FRONTEND_URL].onrender.com,http://localhost:5173
```

---

## 📝 Example Configuration (Fill in your values)

### Your MongoDB Connection String
```
mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```
⚠️ Remember to URL-encode special characters in password!

### Your Service URLs
```
Gemini:   https://flashrequest-gemini-[random].onrender.com
Backend:  https://flashrequest-backend-[random].onrender.com
Frontend: https://flashrequest-[random].onrender.com
```

---

## ✅ Verification Commands

### Test Gemini Service
```bash
curl https://[YOUR_GEMINI_URL]/health
```
Expected: `{"status":"ok","service":"gemini-service","timestamp":"..."}`

### Test Backend Service
```bash
curl https://[YOUR_BACKEND_URL]/health
```
Expected: `{"status":"ok"}`

### Test Full Flow
```bash
# Parse a request
curl -X POST https://[YOUR_GEMINI_URL]/api/parse-request \
  -H "Content-Type: application/json" \
  -d '{"text": "Looking for a used laptop"}'

# Register a user
curl -X POST https://[YOUR_BACKEND_URL]/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123",
    "username": "testuser"
  }'
```

---

## 🔐 Security Checklist

Before deploying:
- [ ] MongoDB password contains no special characters (or is URL-encoded)
- [ ] MongoDB Atlas allows Render IPs (0.0.0.0/0 or specific IPs)
- [ ] Gemini API key is valid
- [ ] JWT_SECRET_KEY is generated (don't use a simple string)
- [ ] CORS_ALLOW_ORIGINS will be updated after frontend deployment

---

## 📊 Expected Deploy Times

| Service | Build Time | Deploy Time |
|---------|-----------|-------------|
| Gemini | 2-4 min | 1 min |
| Backend | 3-5 min | 1 min |
| Frontend | 2-3 min | 1 min |

**Total time**: Approximately 15-20 minutes for all three services.

---

## 🎯 Deployment Sequence

```
1. CREATE Gemini Service
   └─ Wait for: "Live" status
   └─ Copy URL: ____________________

2. CREATE Backend Service
   └─ Use Gemini URL from step 1
   └─ Wait for: "Live" status
   └─ Copy URL: ____________________

3. CREATE Frontend Static Site
   └─ Use Backend URL from step 2
   └─ Wait for: "Live" status
   └─ Copy URL: ____________________

4. UPDATE Backend CORS
   └─ Use Frontend URL from step 3
   └─ Save and redeploy

5. UPDATE Gemini CORS
   └─ Use Frontend URL from step 3
   └─ Save and redeploy

6. TEST everything
   └─ Health endpoints
   └─ User registration
   └─ Flash request submission
```

---

## 🆘 Quick Troubleshooting

### Service won't start
→ Check: Build logs in Render dashboard
→ Verify: Root Directory is correct

### CORS errors
→ Check: CORS_ALLOW_ORIGINS includes frontend URL
→ Verify: No trailing slashes in URLs
→ Ensure: Services redeployed after CORS update

### MongoDB connection failed
→ Check: Connection string format
→ Verify: MongoDB Atlas network access allows 0.0.0.0/0
→ Test: URL-encode password special characters

### Gemini API errors
→ Check: GEMINI_API_KEY is valid
→ Verify: API quota not exceeded
→ Test: Key at https://makersuite.google.com/

---

## 📞 Support Resources

- Full Guide: `RENDER_DEPLOYMENT_GUIDE.md`
- Troubleshooting: `TROUBLESHOOTING.md`
- Environment Variables: `ENVIRONMENT_VARIABLES.md`
- Architecture: `ARCHITECTURE.md`

---

**Ready to deploy? Follow the sequence above and you'll be live in 20 minutes!** 🚀
