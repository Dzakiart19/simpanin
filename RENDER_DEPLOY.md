# 🚀 Deploy Backend to Render.com (FREE!)

Render.com adalah hosting FREE terbaik untuk backend Node.js yang TIDAK akan sleep!

## Step 1: Push ke GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push
```

## Step 2: Create Account di Render
1. Buka https://render.com
2. Sign up dengan GitHub
3. Authorize Render untuk access repository Anda

## Step 3: Deploy Backend Service
1. Di Render dashboard, klik **New** → **Web Service**
2. Pilih GitHub repo Anda
3. Configure:
   - **Name**: `simpanin-backend` (atau nama lain)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: **Free** ✅

4. Click **Deploy**

## Step 4: Get Backend URL
Setelah deploy berhasil, Anda akan dapat URL seperti:
```
https://simpanin-backend.onrender.com
```

## Step 5: Update Frontend API URL
Edit `client/src/lib/api.ts`:
```typescript
const API_BASE_URL = 'https://simpanin-backend.onrender.com/api';
```

## Step 6: Rebuild & Redeploy Frontend
```bash
npm run build
firebase deploy --only hosting --project simpanin
```

## Step 7: Test!
1. Pergi ke https://simpanin.web.app
2. Buka TikTok tab
3. Paste URL: `https://vt.tiktok.com/ZS5dWmU1e/`
4. Click Download → ✅ Done!

---

## ✅ Why Render is Best for You?
- 🆓 Completely FREE
- ⏰ Keep running 24/7 (no sleep mode!)
- 🔄 Auto-deploy on git push
- 🌍 Automatic HTTPS/SSL
- 🚀 Fast deployment

---

## Railway Alternative (if Render doesn't work)
1. Buka https://railway.app
2. Sign up dengan GitHub
3. Create new project
4. Deploy dari GitHub repo
5. Get URL dari Railway dashboard

Railway lebih powerful, tapi Render lebih simple untuk case Anda!
