#!/bin/bash

# StreamSave Firebase Deployment Script
# Run this after login: bash deploy.sh

echo "🚀 Starting StreamSave Firebase Deployment..."
echo ""

# Check if firebase.json exists
if [ ! -f "firebase.json" ]; then
    echo "❌ Error: firebase.json not found!"
    exit 1
fi

# Check if dist/public exists
if [ ! -d "dist/public" ]; then
    echo "⚠️  Building application..."
    npm run build
fi

# Check if .firebaserc has correct project ID
if grep -q "YOUR_FIREBASE_PROJECT_ID" .firebaserc; then
    echo "⚠️  WARNING: .firebaserc still contains placeholder!"
    echo "❌ Please update YOUR_FIREBASE_PROJECT_ID in .firebaserc first"
    echo ""
    echo "Steps:"
    echo "1. Go to https://console.firebase.google.com/"
    echo "2. Create/select a project"
    echo "3. Copy the Project ID"
    echo "4. Update .firebaserc with your Project ID"
    echo ""
    exit 1
fi

echo "✅ Checking Firebase CLI..."
npx firebase --version

echo ""
echo "📦 Deploying to Firebase..."
npx firebase deploy

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your app is now live!"
