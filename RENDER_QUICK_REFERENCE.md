# 📋 Render Deployment - Quick Reference Card

## 🎯 Service 1: Gemini AI Service

**Root Directory:** `gemini-service`

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm start
```

**Environment Variables:**
| Variable | Value | Description |
|----------|-------|-------------|
| `GEMINI_API_KEY` | `<your-key>` | Your Google Gemini API key |
| `PORT` | `3001` | Service port (optional) |
| `CORS_ALLOW_ORIGINS` | `<frontend-url>` | Frontend URL for CORS |

**Health Check:** `GET /health`

---

## 🎯 Service 2: Backend API

**Root Directory:** `backend-service`

**Build Command:**
```
pip install -r requirements.txt
```

**Start Command:**
```
uvicorn backend.app:app --host 0.0.0.0 --port $PORT
```

**Environment Variables:**
| Variable | Value | Description |
|----------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://...` | MongoDB connection string |
| `DB_NAME` | `flashrequest` | Database name |
| `GEMINI_SERVICE_URL` | `<gemini-url>` | Gemini service URL |
| `JWT_SECRET_KEY` | Generate | JWT secret (use Render's generate) |
| `JWT_ALGORITHM` | `HS256` | JWT algorithm |
| `CORS_ALLOW_ORIGINS` | `<frontend-url>` | Frontend URL for CORS |
| `PYTHON_VERSION` | `3.11.0` | Python version |

**Health Check:** `GET /health`

---

## 🎯 Service 3: Frontend (Static Site)

**Root Directory:** `frontend`

**Build Command:**
```
npm install && npm run build
```

**Publish Directory:**
```
dist
```

**Environment Variables:**
| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_BASE_URL` | `<backend-url>` | Backend API URL |
| `NODE_VERSION` | `18.17.0` | Node.js version |

---

## 🔄 Deployment Order

1. ✅ Deploy **Gemini Service** first → Get URL
2. ✅ Deploy **Backend API** (use Gemini URL) → Get URL
3. ✅ Deploy **Frontend** (use Backend URL) → Get URL
4. ✅ Update **CORS settings** in Gemini and Backend with Frontend URL
5. ✅ Test everything!

---

## 🧪 Testing Commands

### Test Gemini Service
```bash
curl https://your-gemini-url.onrender.com/health
```

### Test Backend
```bash
curl https://your-backend-url.onrender.com/health
```

### Test Full Flow
```bash
# Parse request
curl -X POST https://your-gemini-url.onrender.com/api/parse-request \
  -H "Content-Type: application/json" \
  -d '{"text": "Looking for a bike"}'

# Register user
curl -X POST https://your-backend-url.onrender.com/api/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123", "username": "testuser"}'
```

---

## ⚠️ Common Issues

### CORS Errors
- Ensure `CORS_ALLOW_ORIGINS` is set in both Gemini and Backend
- Include both production URL and `http://localhost:5173` for dev
- No trailing slashes in URLs

### Service Not Starting
- Check logs in Render dashboard
- Verify all environment variables are set
- Test MongoDB connection string separately

### 500 Errors
- Check service logs for details
- Verify Gemini API key is valid
- Ensure all service URLs are correct

---

## 💡 Pro Tips

1. **Deploy in order**: Gemini → Backend → Frontend
2. **Use consistent naming**: e.g., `flashrequest-*`
3. **Keep URLs handy**: Copy each URL after deployment
4. **Test incrementally**: Test each service before moving to next
5. **Monitor logs**: Keep Render dashboard open during deployment

---

## 📱 URLs Template

Fill this out as you deploy:

```
Gemini Service:  https://__________________.onrender.com
Backend API:     https://__________________.onrender.com
Frontend:        https://__________________.onrender.com
```

---

## 🆘 Need Help?

See full guide: [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)
