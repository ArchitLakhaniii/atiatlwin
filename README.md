# 🎯 FlashRequest - Campus Marketplace

A modern marketplace platform for campus communities with AI-powered matching.

## 📁 Project Structure

```
atiatlwin/
├── frontend/              # React + Vite frontend application
│   ├── src/              # React components and pages
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.ts    # Vite configuration
│   └── README.md         # Frontend-specific documentation
│
├── backend-service/       # Python FastAPI backend
│   ├── backend/          # Main application code
│   ├── MLmodel/          # Machine learning model artifacts
│   ├── synthetic-data/   # Training/test data
│   ├── requirements.txt  # Python dependencies
│   └── README.md         # Backend-specific documentation
│
├── gemini-service/        # Node.js Gemini AI service
│   ├── src/              # TypeScript source code
│   ├── package.json      # Node.js dependencies
│   └── README.md         # Gemini service documentation
│
└── RENDER_DEPLOYMENT_GUIDE.md  # Deployment instructions
```

## 🚀 Quick Start

### Option 1: Deploy to Render (Recommended for Production)
Follow the comprehensive guide: [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)

### Option 2: Local Development

#### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- MongoDB (local or Atlas)
- Google Gemini API key

#### 1. Start Gemini Service
```bash
cd gemini-service
npm install
cp .env.example .env
# Add your GEMINI_API_KEY to .env
npm run dev
# Running on http://localhost:3001
```

#### 2. Start Backend API
```bash
cd backend-service
pip install -r requirements.txt
cp .env.example .env
# Configure MongoDB and other settings in .env
uvicorn backend.app:app --reload --port 8000
# Running on http://localhost:8000
```

#### 3. Start Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Set VITE_API_BASE_URL=http://localhost:8000
npm run dev
# Running on http://localhost:5173
```

## 🏗️ Architecture

```
┌─────────────┐
│   Browser   │
│  (Frontend) │
└──────┬──────┘
       │ HTTP
       ▼
┌─────────────────┐
│  Backend API    │
│  (FastAPI)      │◄────┐
└────┬────────┬───┘     │
     │        │         │ HTTP
     │        │         │
     │        └─────────┼─────┐
     │                  │     │
     ▼                  ▼     ▼
┌─────────┐      ┌──────────────┐
│ MongoDB │      │Gemini Service│
│ Database│      │  (Node.js)   │
└─────────┘      └──────────────┘
```

## 🔑 Key Features

- **AI-Powered Parsing**: Natural language processing via Google Gemini
- **Smart Matching**: ML model for buyer-seller matching
- **User Authentication**: JWT-based secure authentication
- **Real-time Updates**: Modern reactive UI with React
- **Scalable Architecture**: Microservices design ready for production

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB with Motor (async driver)
- **Authentication**: JWT tokens with bcrypt
- **ML**: Scikit-learn + Joblib
- **API Client**: httpx for async HTTP

### Gemini Service
- **Runtime**: Node.js + TypeScript
- **Framework**: Express
- **AI**: Google Generative AI SDK
- **Process Manager**: Nodemon (dev)

## 📊 API Endpoints

### Backend API (Port 8000)
- `GET /health` - Health check
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/flash-request` - Submit flash request
- `POST /api/seller-profile` - Create seller profile
- `POST /api/match` - Get matches for request
- `GET /api/user/{user_id}` - Get user details
- `GET /api/trust-score/{user_id}` - Get trust score

### Gemini Service (Port 3001)
- `GET /health` - Health check
- `POST /api/parse-request` - Parse buyer request
- `POST /api/parse-profile` - Parse seller profile

## 🔐 Environment Variables

### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://...
DB_NAME=flashrequest
GEMINI_SERVICE_URL=http://localhost:3001
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
CORS_ALLOW_ORIGINS=http://localhost:5173
```

### Gemini Service (.env)
```env
GEMINI_API_KEY=your-gemini-api-key
PORT=3001
CORS_ALLOW_ORIGINS=http://localhost:5173
```

## 📝 Development Workflow

1. **Make changes** in your local environment
2. **Test locally** with all three services running
3. **Commit and push** to GitHub
4. **Auto-deploy** to Render (if configured)

## 🧪 Testing

### Test Backend
```bash
cd backend-service
pytest
```

### Test Gemini Service
```bash
cd gemini-service
npm test
```

### Test Frontend
```bash
cd frontend
npm run lint
```

## 📈 Monitoring

- **Render Dashboard**: Monitor service health and logs
- **Health Endpoints**: Automated health checks
- **Error Tracking**: Check logs for each service

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

[Your License Here]

## 👥 Team

[Your Team Information]

## 📧 Support

For deployment issues, see [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)

For technical issues, check individual service READMEs:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend-service/README.md)
- [Gemini Service README](./gemini-service/README.md)
