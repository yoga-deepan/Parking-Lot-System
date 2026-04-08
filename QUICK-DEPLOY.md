# ⚡ Quick Deploy Reference

## 🗄️ Database (Railway - Recommended)

1. Go to [railway.app](https://railway.app)
2. New Project → Provision MySQL
3. Copy connection details
4. Run `setup-database.sql` in Railway query editor

## 🖥️ Backend (Render)

1. Go to [render.com](https://render.com)
2. New Web Service → Connect GitHub repo
3. Settings:
   - Root: `backend`
   - Build: `npm install`
   - Start: `npm start`
4. Add environment variables:
```
NODE_ENV=production
DB_HOST=<from-railway>
DB_USER=<from-railway>
DB_PASSWORD=<from-railway>
DB_NAME=parking_lot
DB_PORT=3306
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
FRONTEND_URL=<will-add-after-netlify>
```
5. Deploy and copy URL

## 🌐 Frontend (Netlify)

1. Go to [netlify.com](https://netlify.com)
2. New Site → Import from GitHub
3. Settings:
   - Base: `frontend`
   - Build: `npm install && npm run build`
   - Publish: `dist`
4. Add environment variable:
```
VITE_API_URL=<your-render-backend-url>/api
```
5. Deploy and copy URL

## 🔄 Final Step

Go back to Render → Update `FRONTEND_URL` with your Netlify URL → Redeploy

## ✅ Test

Visit your Netlify URL and test parking/exit functionality!

---

**Full guide**: See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
