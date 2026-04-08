# 🧪 Test Production Build Locally

Before deploying to production, test the production build locally to catch any issues.

## Frontend Build Test

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create production build
npm run build

# Preview production build
npm run preview
```

The preview server will run on `http://localhost:4173`

### What to Check:
- ✅ Build completes without errors
- ✅ No console errors in browser
- ✅ All pages load correctly
- ✅ API calls work (if backend is running)
- ✅ Styling is correct
- ✅ Images and assets load

## Backend Production Test

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Set NODE_ENV to production (temporarily)
# Windows PowerShell:
$env:NODE_ENV="production"

# Windows CMD:
set NODE_ENV=production

# Linux/Mac:
export NODE_ENV=production

# Start server
npm start
```

### What to Check:
- ✅ Server starts without errors
- ✅ Database connection successful
- ✅ Health endpoint responds: `http://localhost:5000/health`
- ✅ API endpoints work correctly
- ✅ Error handling works properly
- ✅ CORS is configured

## Full Stack Test

1. Start backend in one terminal
2. Build and preview frontend in another terminal
3. Test complete user flow:
   - View dashboard
   - Park a vehicle
   - Exit a vehicle
   - Check error handling

## Common Issues

### Frontend Build Fails
- Check for TypeScript/ESLint errors
- Verify all imports are correct
- Check for missing dependencies

### Backend Won't Start
- Verify `.env` file exists
- Check database connection
- Ensure all dependencies are installed

### API Calls Fail
- Check CORS configuration
- Verify API URL in frontend
- Check backend is running
- Verify database is accessible

---

Once local production testing passes, you're ready to deploy! 🚀
