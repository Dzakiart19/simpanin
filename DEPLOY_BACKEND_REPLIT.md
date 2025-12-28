# 🚀 Deploy Backend on Replit (FREE!)

Since Firebase Cloud Functions requires paid plan, deploy your backend directly on **Replit** instead.

## Step 1: Start Backend Server
In Replit shell, run:
```bash
npm run dev
```

This starts:
- Frontend: http://localhost:5000 (Vite)
- Backend API: http://localhost:5000/api (Express)

## Step 2: Get Your Replit URL
Once running, you'll see a URL like:
```
https://simpanin-projectname.replit.dev
```

## Step 3: Update Frontend API URL
Edit `client/src/lib/api.ts` and change:
```typescript
const API_BASE_URL = 'https://simpanin-projectname.replit.dev/api';
```

## Step 4: Rebuild & Deploy Frontend
```bash
npm run build
firebase deploy --only hosting --project simpanin
```

## Step 5: Test Download
Go to **simpanin.web.app** and test TikTok/YouTube download!

---

## Why Replit Backend?
✅ **FREE** - No payment required  
✅ **Always running** - Replit keeps projects alive  
✅ **Same codebase** - Backend already in `server/` folder  
✅ **Easy CORS** - Replit handles Cross-Origin requests  

---

## Alternative: Deploy on Railway/Heroku/Render
If you want backend on separate hosting:
1. Create account on Railway.app / render.com / heroku.com
2. Create `Procfile` with: `web: npm run start`
3. Deploy your backend
4. Update API_BASE_URL with the deployed URL

But **Replit is the easiest - just keep this project running!**
