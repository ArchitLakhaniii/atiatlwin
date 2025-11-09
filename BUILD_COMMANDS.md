# 🚀 RENDER BUILD & START COMMANDS - QUICK REFERENCE

## Copy these EXACTLY into Render!

---

## 🟢 Service 1: Gemini AI Service

### Service Type
```
Web Service
```

### Root Directory
```
gemini-service
```

### Build Command
```bash
npm install && npm run build
```

### Start Command
```bash
npm start
```

---

## 🟡 Service 2: Backend API

### Service Type
```
Web Service
```

### Root Directory
```
backend-service
```

### Build Command
```bash
pip install -r requirements.txt
```

### Start Command
```bash
uvicorn backend.app:app --host 0.0.0.0 --port $PORT
```

---

## 🔵 Service 3: Frontend

### Service Type
```
Static Site
```

### Root Directory
```
frontend
```

### Build Command
```bash
npm install && npm run build
```

### Publish Directory (NOT Start Command!)
```
dist
```

---

## 📋 Summary Table

| Service | Type | Root Dir | Build Command | Start Command / Publish Dir |
|---------|------|----------|---------------|----------------------------|
| **Gemini** | Web Service | `gemini-service` | `npm install && npm run build` | `npm start` |
| **Backend** | Web Service | `backend-service` | `pip install -r requirements.txt` | `uvicorn backend.app:app --host 0.0.0.0 --port $PORT` |
| **Frontend** | Static Site | `frontend` | `npm install && npm run build` | `dist` *(Publish Directory)* |

---

## ⚠️ Important Notes

### For Frontend (Static Site):
- ✅ **DO** set "Publish Directory" to `dist`
- ❌ **DON'T** set a "Start Command" (static sites don't need one)

### For Backend:
- The `$PORT` variable is automatically set by Render
- Must use `--host 0.0.0.0` to accept external connections
- Don't change the command format!

### For Gemini:
- Make sure `npm start` is defined in package.json
- It should run: `node dist/index.js`

---

## 🎯 Where to Enter These in Render

### When Creating New Service:

1. **Click** "New +" → Choose service type
2. **Select** your GitHub repository
3. **Set** the Root Directory (see table above)
4. **Copy/Paste** Build Command
5. **Copy/Paste** Start Command (or Publish Directory for Static Site)
6. **Add** Environment Variables
7. **Click** "Create Web Service" / "Create Static Site"

### Visual Guide:

```
┌─────────────────────────────────────┐
│  Create Web Service / Static Site   │
├─────────────────────────────────────┤
│                                     │
│  Name: flashrequest-[service]       │
│  Region: [Choose closest]           │
│  Branch: main                       │
│  Root Directory: [SEE TABLE]     ←──┼── IMPORTANT!
│                                     │
│  Build Command:                     │
│  ┌─────────────────────────────┐   │
│  │ [COPY FROM TABLE ABOVE]     │   │
│  └─────────────────────────────┘   │
│                                     │
│  Start Command:                     │
│  ┌─────────────────────────────┐   │
│  │ [COPY FROM TABLE ABOVE]     │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Add Environment Variables]        │
│  [Create Service]                   │
└─────────────────────────────────────┘
```

---

## ✅ Verification

After each service deploys, check the logs for:

### Gemini Service:
```
Server listening on port 3001
```

### Backend Service:
```
[OK] MongoDB Connected: flashrequest Database
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Frontend:
```
vite v5.x.x building for production...
✓ built in Xs
```

---

## 🔧 If Build Fails

### Gemini or Frontend:
- Check that `package.json` exists in the service folder
- Verify `NODE_VERSION=18.17.0` in environment variables

### Backend:
- Check that `requirements.txt` exists in backend-service folder
- Verify `PYTHON_VERSION=3.11.0` in environment variables
- Ensure all environment variables are set

---

**Pro Tip:** Copy these commands EXACTLY as shown. Don't add extra spaces or modify them! 🎯
