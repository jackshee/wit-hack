# FastAPI Backend Deployment to Render

This guide explains how to deploy your FastAPI backend to Render for free.

## 🚀 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a Git repository
3. **Credit Card**: Not required for free tier

## 📁 What Gets Deployed

- ✅ **FastAPI Backend**: Deploys to Render
- ✅ **API Endpoints**: `/api/translate`, `/api/health`, etc.
- ✅ **Static Files**: Video files from assets directory
- ✅ **Environment Variables**: Supabase, PixVerse API keys

## 🔧 Deployment Steps

### Step 1: Sign up for Render
1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)

### Step 2: Create New Web Service
1. **Dashboard** → Click "New +"
2. **Select**: "Web Service"
3. **Connect**: Your GitHub repository
4. **Select**: The repository containing your backend

### Step 3: Configure Service
- **Name**: `wit-backend` (or your preferred name)
- **Environment**: `Python 3`
- **Region**: Choose closest to you
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend` (since your FastAPI code is in backend/)
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 4: Set Environment Variables
Click "Advanced" → "Environment Variables" and add:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET_KEY=your_jwt_secret_key
PIXVERSE_API_KEY=your_pixverse_api_key
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy
3. Wait for build to complete (usually 2-5 minutes)

## 🌐 After Deployment

- **Backend URL**: `https://your-service-name.onrender.com`
- **API Health**: `https://your-service-name.onrender.com/health`
- **Translate Endpoint**: `https://your-service-name.onrender.com/api/translate`

## 🔧 Update Frontend

After successful deployment, update your Vercel frontend:

1. **Vercel Dashboard** → Your project → Settings → Environment Variables
2. **Add**: `REACT_APP_BACKEND_URL` = `https://your-service-name.onrender.com`

## ⚠️ Important Notes

### Free Tier Limitations:
- **Sleeps after 15 minutes** of inactivity
- **First request** after sleep takes 10-30 seconds
- **512 MB RAM** (sufficient for FastAPI)
- **Shared CPU** (good for development/testing)

### Video Files:
- **Assets directory** will be deployed with your backend
- **Static file serving** will work from Render
- **Video URLs** will be: `https://your-service-name.onrender.com/assets/filename.mp4`

## 🧪 Testing

1. **Health Check**: Visit your backend URL + `/health`
2. **API Test**: Use Postman or curl to test `/api/translate`
3. **Frontend Integration**: Update frontend and test full flow

## 📚 Next Steps

After successful deployment:
1. **Test all API endpoints**
2. **Update frontend backend URL**
3. **Test full application** with both frontend and backend deployed
4. **Monitor performance** in Render dashboard

## 🆘 Troubleshooting

### Build Failures:
- Check `requirements.txt` has all dependencies
- Ensure `main.py` is in the backend directory
- Check Python version compatibility

### Runtime Errors:
- Check environment variables are set correctly
- Check Render logs for error details
- Verify Supabase connection

### Slow Response Times:
- Normal for free tier after sleeping
- Consider upgrading to paid plan for production use

## 💡 Pro Tips

1. **Use GitHub integration** for automatic deployments
2. **Set up monitoring** in Render dashboard
3. **Test thoroughly** before updating frontend
4. **Keep environment variables** secure and organized 