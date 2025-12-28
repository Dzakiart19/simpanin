# 🚀 Deploy Backend to Firebase Cloud Functions

Your backend API needs to be deployed to Firebase Cloud Functions so the frontend can call it.

## Quick Deploy Steps:

### 1️⃣ Install Firebase Functions dependencies
```bash
npm install -g firebase-tools
firebase login --no-localhost
```

### 2️⃣ Create Cloud Functions project
```bash
mkdir -p functions
cd functions
npm init -y
npm install firebase-functions express axios
```

### 3️⃣ Create functions/src/index.ts
Copy the content from the backend routes (server/routes.ts) and wrap them in Firebase Functions HTTP handler.

### 4️⃣ Deploy
```bash
firebase deploy --only functions --project simpanin
```

### 5️⃣ Get your function URL
After deployment, Firebase will show your function URL like:
```
https://us-central1-simpanin.cloudfunctions.net/api
```

### 6️⃣ Update frontend API URL
Edit `client/src/lib/api.ts`:
```typescript
const API_BASE_URL = 'https://us-central1-simpanin.cloudfunctions.net';
```

### 7️⃣ Rebuild and redeploy frontend
```bash
npm run build
firebase deploy --only hosting --project simpanin
```

---

## Or use the auto-setup script:
```bash
bash firebase-functions-setup.sh
```

---

## Testing endpoints:
After deployment, test with:
```bash
curl "https://us-central1-simpanin.cloudfunctions.net/api/downloader/tiktok?url=YOUR_TIKTOK_URL"
```

---

## Troubleshooting:
- **CORS errors?** Ensure CORS headers are set in Cloud Functions
- **Timeout?** Increase function timeout in Firebase console
- **Not found?** Check region matches (us-central1 vs europe-west1, etc)
- **View logs:** `firebase functions:log --project simpanin`
