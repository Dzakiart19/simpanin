# 🚀 Firebase Hosting Deployment Guide

## Prasyarat:
- ✅ Firebase CLI sudah installed
- ✅ Build sudah dibuat di `dist/public`
- ✅ `firebase.json` dan `.firebaserc` sudah dikonfigurasi

## Step-by-Step Deployment:

### Step 1: Login ke Firebase
Jalankan command ini di Replit shell:
```bash
npx firebase login
```
- Pilih browser authentication
- Login dengan akun Google Anda
- Authorize access

### Step 2: Initialize Firebase Project
```bash
npx firebase init hosting
```
Saat ditanya, jawab:
```
? What do you want to use as your public directory? dist/public
? Configure as a single-page app? Y
? Auto build and deploy on git push? N
? Set up automatic builds and deploys with GitHub? N
```

### Step 3: Update .firebaserc dengan Project ID
1. Login ke https://console.firebase.google.com/
2. Copy project ID Anda
3. Edit `.firebaserc` dan ganti `YOUR_FIREBASE_PROJECT_ID` dengan project ID asli

Contoh:
```json
{
  "projects": {
    "default": "streamsave-12345"
  }
}
```

### Step 4: Deploy ke Firebase
```bash
npx firebase deploy
```

Tunggu hingga selesai. Output akan menampilkan URL hosting Anda!

---

## ✨ Hasil Akhir:
Website Anda akan live di: `https://YOUR_PROJECT_ID.web.app`

---

## 📝 Tips:
- **Free tier Firebase** mendukung hingga 1GB storage, 10GB download/bulan
- **Auto-scaling**: Traffic melonjak? Firebase auto-scale tanpa biaya tambahan
- **SSL/HTTPS**: Automatic & free
- **CDN Global**: Auto-caching di server Google worldwide

---

## 🔧 Troubleshooting:

### "firebase not found"
```bash
npx firebase --version
```

### "Cannot find dist/public"
```bash
npm run build
```

### Deploy failed
Check logs:
```bash
npx firebase deploy --debug
```

---

## 🎯 Selesai! 
Aplikasi StreamSave Anda sudah live di Firebase! 🎉
