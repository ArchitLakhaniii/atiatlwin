# 🏗️ FlashRequest Architecture

## Production Architecture on Render

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                                │
│                     (Web Browsers)                          │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  RENDER STATIC SITE                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Frontend Service                         │    │
│  │                                                     │    │
│  │  - React 18 + TypeScript                           │    │
│  │  - Vite build system                               │    │
│  │  - TailwindCSS                                     │    │
│  │  - Zustand (state)                                 │    │
│  │  - React Router                                    │    │
│  │                                                     │    │
│  │  Build: npm install && npm run build               │    │
│  │  Output: dist/                                     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  URL: https://flashrequest.onrender.com                     │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API
                         │ (HTTPS)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  RENDER WEB SERVICE #1                       │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │          Backend API Service                       │    │
│  │                                                     │    │
│  │  - FastAPI (Python 3.11)                           │    │
│  │  - JWT Authentication                              │    │
│  │  - ML Model (scikit-learn)                         │    │
│  │  - Motor (async MongoDB)                           │    │
│  │  - httpx (async HTTP)                              │    │
│  │                                                     │    │
│  │  Build: pip install -r requirements.txt            │    │
│  │  Start: uvicorn backend.app:app --host 0.0.0.0    │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  URL: https://flashrequest-backend.onrender.com             │
└──────┬──────────────────────────────────┬───────────────────┘
       │                                  │
       │ MongoDB                          │ HTTP API
       │ Wire Protocol                    │ Calls
       ▼                                  ▼
┌─────────────────┐      ┌──────────────────────────────────┐
│  MONGODB ATLAS  │      │  RENDER WEB SERVICE #2           │
│                 │      │                                   │
│  ┌───────────┐  │      │  ┌────────────────────────────┐ │
│  │ Database  │  │      │  │  Gemini AI Service         │ │
│  │           │  │      │  │                            │ │
│  │ Users     │  │      │  │  - Node.js 18 + Express   │ │
│  │ Profiles  │  │      │  │  - TypeScript             │ │
│  │ Requests  │  │      │  │  - Google Gemini API      │ │
│  │ Matches   │  │      │  │  - JSON parsing           │ │
│  └───────────┘  │      │  │                            │ │
│                 │      │  │  Build: npm install &&     │ │
│  Cluster:       │      │  │         npm run build      │ │
│  flashrequest   │      │  │  Start: npm start          │ │
│                 │      │  └────────────────────────────┘ │
└─────────────────┘      │                                   │
                         │  URL: https://flashrequest-       │
                         │       gemini.onrender.com         │
                         └────────────────┬──────────────────┘
                                          │
                                          │ HTTPS
                                          ▼
                                ┌──────────────────┐
                                │  GOOGLE GEMINI   │
                                │   API SERVICE    │
                                └──────────────────┘
```

## Data Flow

### 1. User Submits Flash Request

```
User (Browser)
    │
    │ 1. Submit form with text
    ▼
Frontend
    │
    │ 2. POST /api/flash-request
    ▼
Backend API
    │
    │ 3. POST /api/parse-request
    ▼
Gemini Service
    │
    │ 4. Call Gemini API
    ▼
Google Gemini
    │
    │ 5. Return parsed JSON
    ▼
Gemini Service
    │
    │ 6. Return structured data
    ▼
Backend API
    │
    │ 7. Run ML matching
    │ 8. Save to MongoDB
    ▼
MongoDB Atlas
    │
    │ 9. Return matches
    ▼
Frontend
    │
    │ 10. Display results
    ▼
User (Browser)
```

### 2. User Authentication

```
User (Browser)
    │
    │ 1. POST /api/register or /api/login
    ▼
Frontend
    │
    │ 2. Send credentials
    ▼
Backend API
    │
    │ 3. Hash password (bcrypt)
    │ 4. Check MongoDB
    ▼
MongoDB Atlas
    │
    │ 5. Return user data
    ▼
Backend API
    │
    │ 6. Generate JWT token
    │ 7. Return token
    ▼
Frontend
    │
    │ 8. Store in localStorage
    │ 9. Include in future requests
    ▼
User (Browser)
```

## Service Communication

### Frontend → Backend
- Protocol: HTTPS REST API
- Content-Type: application/json
- Auth: Bearer token (JWT)
- Endpoints: /api/*

### Backend → Gemini
- Protocol: HTTPS REST API
- Content-Type: application/json
- Endpoints: /api/parse-request, /api/parse-profile

### Backend → MongoDB
- Protocol: MongoDB Wire Protocol
- Driver: Motor (async)
- Connection: TLS/SSL encrypted

### Gemini → Google
- Protocol: HTTPS
- Library: @google/genai
- Auth: API Key

## Environment Variables Flow

```
┌─────────────────────┐
│   Frontend Service  │
│                     │
│  VITE_API_BASE_URL  ├──────┐
│  (Backend URL)      │      │
└─────────────────────┘      │
                             │ Points to
                             ▼
                ┌────────────────────────┐
                │   Backend Service      │
                │                        │
                │  MONGODB_URI           ├────┐
                │  GEMINI_SERVICE_URL    ├──┐ │
                │  JWT_SECRET_KEY        │  │ │
                │  CORS_ALLOW_ORIGINS    │  │ │
                └────────────────────────┘  │ │
                                            │ │
           Points to                        │ │ Connects to
            ┌───────────────────────────────┘ │
            │                                 │
            ▼                                 ▼
┌──────────────────────┐          ┌──────────────────┐
│  Gemini Service      │          │  MongoDB Atlas   │
│                      │          │                  │
│  GEMINI_API_KEY      │          │  Users           │
│  CORS_ALLOW_ORIGINS  │          │  Profiles        │
└──────────────────────┘          │  Requests        │
                                  └──────────────────┘
```

## Deployment Dependencies

**Deploy in this order:**

```
1. Gemini Service
   │
   │ Get URL
   │
   ▼
2. Backend Service (needs Gemini URL)
   │
   │ Get URL
   │
   ▼
3. Frontend (needs Backend URL)
   │
   │ Get URL
   │
   ▼
4. Update CORS in Backend & Gemini
```

## Network Security

```
┌─────────────────────────────────────────────────────┐
│                    HTTPS/TLS                        │
│            (All traffic encrypted)                  │
└─────────────────────────────────────────────────────┘

Frontend ←→ Backend: HTTPS + CORS
Backend ←→ Gemini: HTTPS
Backend ←→ MongoDB: TLS/SSL + Authentication
Gemini ←→ Google: HTTPS + API Key

Auth: JWT tokens with HS256 algorithm
Passwords: bcrypt hashed (never stored plain)
```

## Scaling Strategy

### Current (Free Tier)
- Each service: 1 instance
- Auto-spin down after 15 min
- Cold start: 30-50 seconds

### Future (Paid Tier)
- Multiple instances per service
- Auto-scaling based on load
- No spin down
- Load balancing

## Monitoring Points

```
┌──────────────────┐
│ Frontend         │ → Check: Browser console, Network tab
└──────────────────┘

┌──────────────────┐
│ Backend API      │ → Check: /health endpoint, Render logs
└──────────────────┘

┌──────────────────┐
│ Gemini Service   │ → Check: /health endpoint, Render logs
└──────────────────┘

┌──────────────────┐
│ MongoDB          │ → Check: Atlas dashboard, connection logs
└──────────────────┘
```

## Performance Characteristics

| Service | Cold Start | Warm Response | Memory Usage |
|---------|-----------|---------------|--------------|
| Frontend | N/A (static) | < 100ms | N/A |
| Backend | 30-50s | 200-500ms | ~512MB |
| Gemini | 30-50s | 1-3s (Gemini API) | ~256MB |

## Costs (USD/month)

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Frontend | $0 (static) | $0 (static) |
| Backend | $0 (750hrs) | $7+ |
| Gemini | $0 (750hrs) | $7+ |
| MongoDB Atlas | $0 (512MB) | $9+ |
| **Total** | **$0** | **$23+** |

---

For deployment instructions, see [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)
