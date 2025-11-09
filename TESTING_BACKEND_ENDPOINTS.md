# 🔍 Testing Backend Endpoints - What You'll See

## Direct Browser Access vs API Calls

When you visit backend endpoints directly in your browser, here's what to expect:

---

## ✅ GET Endpoints (Browser-Friendly)

### `/health` - Health Check
**URL:** `https://your-backend.onrender.com/health`

**What you'll see:**
```json
{
  "status": "ok"
}
```

**Status:** ✅ Works in browser

---

### `/` - Root / Docs
**URL:** `https://your-backend.onrender.com/`

**What you'll see:**
FastAPI automatically generates interactive API documentation!

You'll be redirected to:
- `/docs` - Swagger UI (interactive API explorer)
- `/redoc` - ReDoc (alternative documentation)

**Status:** ✅ Works in browser - You can explore and test all endpoints!

---

## ❌ POST Endpoints (Need Tools, Not Browser)

### `/api/auth/login` - Login Endpoint
**URL:** `https://your-backend.onrender.com/api/auth/login`

**If you visit in browser:**
```json
{
  "detail": "Method Not Allowed"
}
```
OR
```
405 Method Not Allowed
```

**Why?** 
- Browser uses GET request
- Login endpoint requires POST request
- You need to send JSON body with credentials

**How to test properly:**

#### Using curl:
```bash
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword"
  }'
```

**Expected Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "user123",
    "email": "test@example.com",
    "username": "testuser"
  }
}
```

---

## 📊 Summary of Endpoints

| Endpoint | Method | Browser Access | What You See |
|----------|--------|---------------|--------------|
| `/` | GET | ✅ Yes | API docs redirect |
| `/docs` | GET | ✅ Yes | Interactive API documentation |
| `/health` | GET | ✅ Yes | `{"status":"ok"}` |
| `/api/auth/register` | POST | ❌ No | 405 Method Not Allowed |
| `/api/auth/login` | POST | ❌ No | 405 Method Not Allowed |
| `/api/flash-requests` | POST | ❌ No | 405 Method Not Allowed |
| `/api/flash-requests/:id/matches` | GET | ⚠️ Partial | Need valid request ID |
| `/api/users/:id/profile` | GET | ⚠️ Partial | Need valid user ID |

---

## 🎯 Best Way to Test Your Deployed Backend

### Option 1: Use FastAPI Docs (Recommended!)
```
Visit: https://your-backend.onrender.com/docs
```

You'll see an **interactive UI** where you can:
- ✅ See all endpoints
- ✅ Test each endpoint
- ✅ Send requests with example data
- ✅ See responses in real-time
- ✅ No code needed!

**Screenshot of what you'll see:**
```
┌─────────────────────────────────────────────────┐
│ Flash Matchmaker Service                        │
├─────────────────────────────────────────────────┤
│                                                 │
│ ▼ auth                                         │
│   POST /api/auth/register                      │
│   POST /api/auth/login                         │
│                                                 │
│ ▼ flash-requests                               │
│   POST /api/flash-requests                     │
│   GET  /api/flash-requests/{id}/matches        │
│                                                 │
│ ▼ health                                       │
│   GET  /health                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Option 2: Use curl (Command Line)

#### Test Health:
```bash
curl https://your-backend.onrender.com/health
```

#### Test Register:
```bash
curl -X POST https://your-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "myemail@test.com",
    "password": "mypassword123",
    "username": "myusername"
  }'
```

#### Test Login:
```bash
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "myemail@test.com",
    "password": "mypassword123"
  }'
```

#### Test Flash Request:
```bash
curl -X POST https://your-backend.onrender.com/api/flash-requests \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "text": "Need a calculus textbook",
    "metadata": {}
  }'
```

### Option 3: Use Postman or Insomnia
- Import your API
- Set base URL to your backend URL
- Test each endpoint with GUI

### Option 4: Use Your Frontend
The best way! Your frontend already makes all these calls:
```
https://your-frontend.onrender.com
```
- Register a user
- Login
- Submit a request
- View matches

---

## 🔍 What Each Response Means

### Success Response (200 OK)
```json
{
  "success": true,
  "data": {...}
}
```
✅ Everything worked!

### Error Response (400 Bad Request)
```json
{
  "detail": "Invalid credentials"
}
```
❌ Check your request data

### Error Response (401 Unauthorized)
```json
{
  "detail": "Not authenticated"
}
```
❌ Need to login first / include JWT token

### Error Response (404 Not Found)
```json
{
  "detail": "Not Found"
}
```
❌ Endpoint doesn't exist or resource not found

### Error Response (500 Internal Server Error)
```json
{
  "detail": "Internal server error"
}
```
❌ Something wrong with backend - check logs

---

## 📝 Quick Test Script

Save this as `test-backend.sh`:

```bash
#!/bin/bash

# Set your backend URL
BACKEND_URL="https://your-backend.onrender.com"

echo "🔍 Testing Backend API..."
echo ""

# Test 1: Health Check
echo "1. Testing /health endpoint..."
curl -s "$BACKEND_URL/health" | jq '.'
echo ""

# Test 2: Register User
echo "2. Testing user registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123",
    "username": "testuser"
  }')
echo "$REGISTER_RESPONSE" | jq '.'
echo ""

# Test 3: Login
echo "3. Testing user login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }')
echo "$LOGIN_RESPONSE" | jq '.'
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.access_token')
echo ""

# Test 4: Create Flash Request
echo "4. Testing flash request creation..."
curl -s -X POST "$BACKEND_URL/api/flash-requests" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "text": "Need a calculus textbook ASAP",
    "metadata": {}
  }' | jq '.'

echo ""
echo "✅ All tests complete!"
```

Make it executable:
```bash
chmod +x test-backend.sh
./test-backend.sh
```

---

## 🎯 What You Should Do First

1. **Visit the health endpoint:**
   ```
   https://your-backend.onrender.com/health
   ```
   Should show: `{"status":"ok"}`

2. **Visit the docs:**
   ```
   https://your-backend.onrender.com/docs
   ```
   Explore the interactive API documentation!

3. **Test from your frontend:**
   - Visit your frontend URL
   - Try to register
   - Try to login
   - Submit a flash request

---

## ⚠️ Important Notes

### CORS Errors
If you see CORS errors when testing from frontend:
```
Access to fetch ... has been blocked by CORS policy
```

**Fix:** Update `CORS_ALLOW_ORIGINS` in backend with your frontend URL

### Authentication Required
Some endpoints need authentication:
```json
{
  "detail": "Not authenticated"
}
```

**Fix:** Include JWT token in Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### MongoDB Not Connected
If you see MongoDB errors in logs:
```
[WARNING] MongoDB connection error: ...
```

**Fix:** Check `MONGODB_URI` environment variable and MongoDB Atlas network access

---

## 📊 Expected Behavior Summary

| Action | What Happens |
|--------|--------------|
| Visit `/health` in browser | ✅ Shows `{"status":"ok"}` |
| Visit `/docs` in browser | ✅ Shows interactive API docs |
| Visit `/api/auth/login` in browser | ❌ Shows "Method Not Allowed" (needs POST) |
| POST to `/api/auth/login` with curl | ✅ Returns JWT token |
| Use frontend to login | ✅ Frontend POSTs and receives token |

---

## 🚀 Quick Verification Checklist

After deployment, verify:

- [ ] `/health` returns `{"status":"ok"}`
- [ ] `/docs` shows API documentation
- [ ] Can register user via curl or docs
- [ ] Can login via curl or docs
- [ ] MongoDB connection shows in logs: `[OK] MongoDB Connected`
- [ ] Frontend can communicate with backend
- [ ] No CORS errors in browser console

---

**TL;DR:** Visit `https://your-backend.onrender.com/health` first, then explore `/docs` for interactive testing! 🎉
