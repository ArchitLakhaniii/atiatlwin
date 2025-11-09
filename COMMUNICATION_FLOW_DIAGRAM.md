# 🔄 Complete Communication Flow Diagram

## Overview: How Your App Works End-to-End

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                           │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │            FRONTEND (React/Vite)                        │    │
│  │                                                         │    │
│  │  • Landing Page                                         │    │
│  │  • Login/Register                                       │    │
│  │  • Flash Request Form                                   │    │
│  │  • Matches Display                                      │    │
│  │  • User Profiles                                        │    │
│  │                                                         │    │
│  │  Config: VITE_API_BASE_URL                             │    │
│  └────────────────────────────────────────────────────────┘    │
│                          ↕ HTTPS REST API                       │
└──────────────────────────┼──────────────────────────────────────┘
                           │
                           │ fetch(`${API_BASE_URL}/api/...`)
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                    BACKEND API (FastAPI)                         │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   ENDPOINTS                              │   │
│  │                                                          │   │
│  │  POST /api/auth/register  ────► User Registration       │   │
│  │  POST /api/auth/login     ────► User Login (JWT)        │   │
│  │  POST /api/flash-requests ────► Submit Flash Request    │   │
│  │  GET  /api/flash-requests/:id/matches ──► Get Matches   │   │
│  │  GET  /api/users/:id/profile  ────► User Profile        │   │
│  │  GET  /api/trust-score/:id    ────► Trust Score         │   │
│  │  GET  /health             ────► Health Check            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Dependencies:                                                   │
│  • JWT Authentication                                            │
│  • ML Model (scikit-learn)                                      │
│  • Feature Encoder                                              │
│                                                                  │
└──────────┬────────────────────────────┬──────────────────────────┘
           │                            │
           │                            │
           ▼                            ▼
┌──────────────────────┐    ┌──────────────────────────┐
│   GEMINI SERVICE     │    │    MONGODB ATLAS         │
│   (Node.js/Express)  │    │    (Database)            │
│                      │    │                          │
│  POST /api/parse-    │    │  Collections:            │
│       request        │    │  • users                 │
│  POST /api/parse-    │    │  • flash_requests        │
│       profile        │    │  • seller_profiles       │
│  GET  /health        │    │  • transactions          │
│                      │    │                          │
│  Uses: Google Gemini │    │  Connection: Motor       │
│  API for NLP         │    │  (async driver)          │
└──────────────────────┘    └──────────────────────────┘
```

---

## 🔄 Example: Submit Flash Request Flow

```
Step 1: User Types Request
┌─────────────────────┐
│   Browser/Frontend  │
│                     │
│  User types:        │
│  "Need a calculus   │
│   textbook ASAP"    │
└──────────┬──────────┘
           │
           │ 1. Capture text
           ▼
┌─────────────────────────────────────────┐
│  React Component:                       │
│  FlashRequestWizardPage.tsx             │
│                                         │
│  onClick={handleSubmit}                 │
└──────────┬──────────────────────────────┘
           │
           │ 2. Call API function
           ▼
┌─────────────────────────────────────────┐
│  api.createFlashRequest({               │
│    text: "Need a calculus textbook...", │
│    metadata: {...}                      │
│  })                                     │
└──────────┬──────────────────────────────┘
           │
           │ 3. HTTP POST
           │    fetch(`${VITE_API_BASE_URL}/api/flash-requests`)
           │    Body: { text, metadata }
           ▼
┌──────────────────────────────────────────┐
│  BACKEND: POST /api/flash-requests       │
│                                          │
│  1. Receives request                     │
│  2. Validates user (JWT)                 │
│  3. Sends text to Gemini Service ───────┐│
│  4. Waits for parsed result              ││
└──────────────────────────────────────────┘│
                                            │
           ┌────────────────────────────────┘
           │ 4. POST to Gemini
           │    ${GEMINI_SERVICE_URL}/api/parse-request
           │    Body: { text }
           ▼
┌──────────────────────────────────────────┐
│  GEMINI SERVICE                          │
│                                          │
│  1. Receives text                        │
│  2. Calls Google Gemini API              │
│  3. Gets structured JSON:                │
│     {                                    │
│       "item": "calculus textbook",       │
│       "category": "textbooks",           │
│       "urgency": "high",                 │
│       "price_max": 50                    │
│     }                                    │
│  4. Returns to Backend                   │
└──────────┬───────────────────────────────┘
           │
           │ 5. Parsed JSON returned
           ▼
┌──────────────────────────────────────────┐
│  BACKEND continues:                      │
│                                          │
│  6. Encodes features for ML model        │
│  7. Runs matchmaking algorithm           │
│  8. Queries MongoDB for sellers ─────────┐
│  9. Scores each match                    ││
│  10. Ranks by compatibility              ││
└──────────────────────────────────────────┘│
                                            │
           ┌────────────────────────────────┘
           │ MongoDB query
           ▼
┌──────────────────────────────────────────┐
│  MONGODB                                 │
│                                          │
│  db.seller_profiles.find({               │
│    category: "textbooks",                │
│    location: nearby                      │
│  })                                      │
│                                          │
│  Returns matching sellers                │
└──────────┬───────────────────────────────┘
           │
           │ 11. Seller data
           ▼
┌──────────────────────────────────────────┐
│  BACKEND:                                │
│                                          │
│  12. Creates matches array               │
│  13. Calculates scores                   │
│  14. Saves request to DB                 │
│  15. Returns response:                   │
│      {                                   │
│        success: true,                    │
│        requestId: "req_123",             │
│        matches: [...]                    │
│      }                                   │
└──────────┬───────────────────────────────┘
           │
           │ 16. HTTP 200 OK response
           ▼
┌─────────────────────────────────────────┐
│  FRONTEND: api.createFlashRequest()     │
│                                         │
│  Receives: { success, requestId, ... }  │
└──────────┬──────────────────────────────┘
           │
           │ 17. Navigate to matches page
           ▼
┌─────────────────────────────────────────┐
│  FRONTEND: Fetch matches                │
│                                         │
│  api.getSmartMatches(requestId)         │
│  ↓                                      │
│  GET /api/flash-requests/req_123/matches│
└──────────┬──────────────────────────────┘
           │
           │ 18. HTTP GET
           ▼
┌──────────────────────────────────────────┐
│  BACKEND: GET /matches                   │
│                                          │
│  Returns ranked matches from DB          │
└──────────┬───────────────────────────────┘
           │
           │ 19. Matches data
           ▼
┌─────────────────────────────────────────┐
│  FRONTEND: Display matches              │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ 🎯 Perfect Match! (95% score)    │  │
│  │ Alex Chen - Calculus Textbook    │  │
│  │ $25 • Baker House • 5 min away   │  │
│  │ [Contact Seller]                 │  │
│  └──────────────────────────────────┘  │
│                                         │
│  User sees results! ✅                  │
└─────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
REGISTER:
Frontend ──POST /api/auth/register──► Backend
                                        │
                                        ├─► Hash password (bcrypt)
                                        ├─► Save to MongoDB
                                        └─► Return user data

LOGIN:
Frontend ──POST /api/auth/login────► Backend
                                      │
                                      ├─► Verify password
                                      ├─► Generate JWT token
                                      └─► Return { token, user }
                                          
Frontend stores token in localStorage

AUTHENTICATED REQUESTS:
Frontend ──GET /api/...───────────────► Backend
  Headers: Authorization: Bearer <token>
                                        │
                                        ├─► Verify JWT
                                        ├─► Get user from token
                                        └─► Process request
```

---

## 🌐 URL Configuration by Environment

### Local Development
```
Frontend:  http://localhost:5173
  ↓ calls
Backend:   http://127.0.0.1:8000
  ↓ calls
Gemini:    http://127.0.0.1:3001
  ↓ calls
MongoDB:   mongodb+srv://...atlas... (cloud)
```

### Production (Render)
```
Frontend:  https://flashrequest.onrender.com
  ↓ calls (via VITE_API_BASE_URL)
Backend:   https://flashrequest-backend.onrender.com
  ↓ calls (via GEMINI_SERVICE_URL)
Gemini:    https://flashrequest-gemini.onrender.com
  ↓ calls
MongoDB:   mongodb+srv://...atlas... (cloud)
```

---

## 📊 Data Format Examples

### Flash Request Submission
```json
// Frontend sends:
{
  "text": "Need a calculus textbook ASAP",
  "metadata": {
    "location": "Baker House",
    "urgency": "high"
  }
}

// Backend returns:
{
  "success": true,
  "requestId": "req_abc123",
  "parsed": {
    "item": "calculus textbook",
    "category": "textbooks",
    "urgency": "high",
    "price_max": 50
  }
}
```

### Matches Response
```json
{
  "success": true,
  "matches": [
    {
      "sellerId": "seller_xyz",
      "name": "Alex Chen",
      "item": "Calculus 3rd Edition",
      "price": 25,
      "score": 0.95,
      "distance": "5 min walk",
      "trustScore": 92
    }
  ]
}
```

---

## ✅ Communication Checklist

### Required for Communication to Work:

**Frontend:**
- [x] Code has API calls implemented
- [x] Uses `VITE_API_BASE_URL` environment variable
- [ ] `VITE_API_BASE_URL` set to backend URL in Render

**Backend:**
- [x] API endpoints implemented
- [x] CORS middleware configured
- [ ] `CORS_ALLOW_ORIGINS` includes frontend URL

**Gemini Service:**
- [x] API endpoints implemented
- [x] CORS middleware configured
- [ ] `CORS_ALLOW_ORIGINS` includes backend URL (optional)

**MongoDB:**
- [x] Connection string configured
- [ ] Network access allows Render IPs

---

## 🎯 Summary

**Everything is connected!** ✅

The frontend talks to the backend, the backend talks to Gemini and MongoDB. All you need to do is:

1. Set `VITE_API_BASE_URL` in Frontend → Backend URL
2. Set `CORS_ALLOW_ORIGINS` in Backend → Frontend URL  
3. Services will communicate exactly like on localhost!

🚀 **Your app will work perfectly on Render with all features intact!**
