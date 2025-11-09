# 🔧 Troubleshooting Guide

Common issues and their solutions when deploying to Render.

---

## 🚫 Service Won't Start

### Symptom
Service shows "Deploy failed" or keeps restarting in Render dashboard.

### Solutions

#### 1. Check Build Logs
- Go to Render dashboard → Your service → "Logs" tab
- Look for error messages during build phase
- Common issues:
  - Missing dependencies
  - Wrong Python/Node version
  - Build command typos

#### 2. Verify Build Commands

**Gemini Service:**
```bash
npm install && npm run build
```

**Backend:**
```bash
pip install -r requirements.txt
```

**Frontend:**
```bash
npm install && npm run build
```

#### 3. Check Start Commands

**Gemini Service:**
```bash
npm start
```

**Backend:**
```bash
uvicorn backend.app:app --host 0.0.0.0 --port $PORT
```

#### 4. Verify Root Directory
- Gemini: `gemini-service`
- Backend: `backend-service`
- Frontend: `frontend`

---

## 🔴 CORS Errors

### Symptom
Browser console shows:
```
Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy
```

### Solutions

#### 1. Update CORS_ALLOW_ORIGINS
Both Backend AND Gemini services need this variable:
```
CORS_ALLOW_ORIGINS=https://your-frontend.onrender.com,http://localhost:5173
```

#### 2. Check URL Formatting
- ✅ Correct: `https://myapp.onrender.com`
- ❌ Wrong: `https://myapp.onrender.com/`
- ❌ Wrong: `http://myapp.onrender.com` (should be https)

#### 3. Verify Service Redeployed
After changing CORS settings, services must redeploy. Check:
- Render dashboard shows latest deploy time
- Latest deploy includes your CORS changes

#### 4. Clear Browser Cache
```bash
# In browser console
localStorage.clear()
sessionStorage.clear()
# Then hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

---

## 🔌 Cannot Connect to Backend

### Symptom
Frontend shows connection errors or API calls fail.

### Solutions

#### 1. Verify VITE_API_BASE_URL
In Frontend environment variables:
```
VITE_API_BASE_URL=https://your-backend.onrender.com
```
- Must match your actual backend URL
- No trailing slash
- Must use https (not http)

#### 2. Test Backend Health
```bash
curl https://your-backend.onrender.com/health
```
Should return:
```json
{"status":"ok"}
```

#### 3. Check Backend Logs
- Go to Backend service → Logs
- Look for startup errors
- Verify MongoDB connection succeeded:
  ```
  [OK] MongoDB Connected: flashrequest Database
  ```

#### 4. Rebuild Frontend
After changing `VITE_API_BASE_URL`:
1. Frontend must rebuild
2. Check Render dashboard for latest deploy
3. Clear browser cache

---

## 🗄️ MongoDB Connection Failed

### Symptom
Backend logs show:
```
[WARNING] MongoDB connection error: ...
```

### Solutions

#### 1. Verify Connection String
```
mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```
- Check username is correct
- Check password is correct
- Special characters in password must be URL-encoded:
  - `@` → `%40`
  - `:` → `%3A`
  - `/` → `%2F`

#### 2. Check MongoDB Atlas Network Access
1. Log in to MongoDB Atlas
2. Go to "Network Access"
3. Add `0.0.0.0/0` to allow all IPs (or specific Render IPs)
4. Wait 2-3 minutes for changes to propagate

#### 3. Verify Database User
1. MongoDB Atlas → Database Access
2. Check user exists
3. Verify user has read/write permissions
4. Reset password if needed

#### 4. Test Connection Locally
```bash
# Install mongosh
# Then test connection
mongosh "your-connection-string"
```

---

## 🤖 Gemini API Errors

### Symptom
Backend logs show errors when parsing requests.

### Solutions

#### 1. Verify API Key
- Go to https://makersuite.google.com/app/apikey
- Check your key is valid
- Generate new key if needed
- Update `GEMINI_API_KEY` in Gemini service

#### 2. Check API Quota
- Gemini has rate limits
- Check your usage at https://makersuite.google.com/
- Consider upgrading plan if needed

#### 3. Verify Gemini Service Health
```bash
curl https://your-gemini-service.onrender.com/health
```

#### 4. Check Backend Connection to Gemini
In Backend environment variables:
```
GEMINI_SERVICE_URL=https://your-gemini-service.onrender.com
```
- Must match actual Gemini URL
- No trailing slash
- Use https

---

## 🐌 Slow Response Times

### Symptom
Services take 30+ seconds to respond after being idle.

### Cause
Render's free tier spins down services after 15 minutes of inactivity.

### Solutions

#### 1. Upgrade to Paid Tier
- $7/month per service
- No spin-down
- Faster performance

#### 2. Keep Services Warm
Use external monitoring service to ping every 10 minutes:
```bash
# UptimeRobot, Pingdom, etc.
GET https://your-service.onrender.com/health
```

#### 3. Optimize Cold Starts
- Minimize dependencies
- Use lightweight Docker images
- Lazy-load heavy modules

---

## 🔑 Authentication Issues

### Symptom
Cannot log in, JWT errors, "Unauthorized" messages.

### Solutions

#### 1. Verify JWT_SECRET_KEY
- Must be set in Backend
- Use Render's "Generate" button for secure key
- Don't change this after users are registered (they'll need to re-register)

#### 2. Check JWT_ALGORITHM
```
JWT_ALGORITHM=HS256
```

#### 3. Clear Browser Storage
```javascript
// In browser console
localStorage.clear()
sessionStorage.clear()
```

#### 4. Test Registration
```bash
curl -X POST https://your-backend.onrender.com/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "username": "testuser"
  }'
```

---

## 📦 Build Failures

### Symptom
"Build failed" message in Render logs.

### Solutions

#### 1. Node.js Version Issues (Frontend/Gemini)
Add to environment variables:
```
NODE_VERSION=18.17.0
```

#### 2. Python Version Issues (Backend)
Add to environment variables:
```
PYTHON_VERSION=3.11.0
```

#### 3. Missing Dependencies
Check `package.json` or `requirements.txt` are in root of service directory.

#### 4. TypeScript Compilation Errors
```bash
# Locally test build
cd gemini-service
npm run build
```

---

## 🌐 Frontend Not Loading

### Symptom
Blank page or "Not Found" error.

### Solutions

#### 1. Check Publish Directory
Must be set to `dist` for Vite apps.

#### 2. Verify Build Output
In frontend build logs, should see:
```
vite v5.x.x building for production...
✓ built in Xs
```

#### 3. Check Static Site Configuration
- Type: Static Site (not Web Service)
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

#### 4. Test Build Locally
```bash
cd frontend
npm install
npm run build
ls dist/  # Should show index.html and assets
```

---

## 🔍 Debugging Tips

### 1. Check Service Logs
Every service in Render has a "Logs" tab. Check for:
- Startup messages
- Error stack traces
- Connection attempts
- API calls

### 2. Test Services Independently
```bash
# Gemini
curl -X POST https://gemini-url/api/parse-request \
  -H "Content-Type: application/json" \
  -d '{"text": "test"}'

# Backend
curl https://backend-url/health

# Frontend
curl https://frontend-url
```

### 3. Use Browser DevTools
- Network tab: Check failed requests
- Console tab: Check JavaScript errors
- Application tab: Check localStorage/cookies

### 4. Compare with Local
If it works locally but not in production:
- Compare environment variables
- Check service URLs
- Verify CORS settings

---

## 🆘 Still Having Issues?

### Check These Resources

1. **Render Documentation**: https://render.com/docs
2. **Service Logs**: Render Dashboard → Service → Logs
3. **Environment Variables**: Double-check all values
4. **Health Endpoints**: Test each service individually

### Get Help

1. Check individual service READMEs:
   - `frontend/README.md`
   - `backend-service/README.md`
   - `gemini-service/README.md`

2. Review deployment guide: `RENDER_DEPLOYMENT_GUIDE.md`

3. Check environment variables: `ENVIRONMENT_VARIABLES.md`

---

## 📊 Success Checklist

When everything works correctly:

- ✅ All three services show "Live" in Render dashboard
- ✅ Health endpoints respond with 200 OK
- ✅ Frontend loads without errors
- ✅ Can register and log in
- ✅ Can submit flash requests
- ✅ No CORS errors in browser console
- ✅ Backend connects to MongoDB successfully
- ✅ Gemini service parses requests correctly

If all items are checked, your deployment is successful! 🎉
