# ✅ Render Deployment Checklist

Use this checklist to track your deployment progress.

## Pre-Deployment Setup

- [ ] GitHub repository is ready and pushed
- [ ] MongoDB Atlas database is created
- [ ] MongoDB connection string is ready
- [ ] Google Gemini API key is obtained
- [ ] Render account is created and verified

---

## Service 1: Gemini AI Service

- [ ] Created new Web Service in Render
- [ ] Set Root Directory to `gemini-service`
- [ ] Set Build Command: `npm install && npm run build`
- [ ] Set Start Command: `npm start`
- [ ] Added `GEMINI_API_KEY` environment variable
- [ ] Service deployed successfully
- [ ] Copied service URL: `___________________________________`
- [ ] Tested health endpoint: `curl <gemini-url>/health`

---

## Service 2: Backend API

- [ ] Created new Web Service in Render
- [ ] Set Root Directory to `backend-service`
- [ ] Set Build Command: `pip install -r requirements.txt`
- [ ] Set Start Command: `uvicorn backend.app:app --host 0.0.0.0 --port $PORT`
- [ ] Added `MONGODB_URI` environment variable
- [ ] Added `DB_NAME` environment variable (flashrequest)
- [ ] Added `GEMINI_SERVICE_URL` environment variable (from Service 1)
- [ ] Added `JWT_SECRET_KEY` environment variable (generated)
- [ ] Added `JWT_ALGORITHM` environment variable (HS256)
- [ ] Added `PYTHON_VERSION` environment variable (3.11.0)
- [ ] Service deployed successfully
- [ ] Copied service URL: `___________________________________`
- [ ] Tested health endpoint: `curl <backend-url>/health`

---

## Service 3: Frontend

- [ ] Created new Static Site in Render
- [ ] Set Root Directory to `frontend`
- [ ] Set Build Command: `npm install && npm run build`
- [ ] Set Publish Directory to `dist`
- [ ] Added `VITE_API_BASE_URL` environment variable (from Service 2)
- [ ] Added `NODE_VERSION` environment variable (18.17.0)
- [ ] Static site deployed successfully
- [ ] Copied site URL: `___________________________________`
- [ ] Opened frontend in browser

---

## Post-Deployment Configuration

- [ ] Updated Backend `CORS_ALLOW_ORIGINS` with frontend URL
- [ ] Backend service redeployed with new CORS settings
- [ ] Updated Gemini Service `CORS_ALLOW_ORIGINS` with frontend URL
- [ ] Gemini service redeployed with new CORS settings

---

## Testing & Verification

- [ ] Frontend loads without errors
- [ ] Can register a new user
- [ ] Can log in successfully
- [ ] Can submit a flash request
- [ ] Flash request gets parsed by Gemini service
- [ ] Can view matches
- [ ] No CORS errors in browser console
- [ ] All API calls work correctly

---

## Optional Enhancements

- [ ] Set up custom domain (if available)
- [ ] Configure monitoring/alerting
- [ ] Set up automatic backups for MongoDB
- [ ] Upgrade to paid tier for better performance
- [ ] Add SSL certificate (Render provides free SSL)
- [ ] Set up environment-specific branches (staging/production)

---

## My Deployment URLs

**Gemini Service:** _______________________________________________

**Backend API:** ___________________________________________________

**Frontend:** _____________________________________________________

**MongoDB URI:** __________________________________________________

---

## Notes & Issues

Record any issues or notes during deployment:

```
[Date] - [Issue/Note]
_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________
```

---

## 🎉 Deployment Complete!

Once all checkboxes are marked:
- [ ] All three services are live and communicating
- [ ] Frontend is accessible and functional
- [ ] All features work as expected
- [ ] Documentation is updated with live URLs

**Congratulations! Your FlashRequest marketplace is now live on Render!** 🚀
