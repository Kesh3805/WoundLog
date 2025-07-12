# 🚀 Deployment Guide

## Frontend Deployment (Vercel)

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Select the `client` directory as the root

2. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

## Backend Deployment (Render)

1. **Create New Web Service**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository
   - Select "Web Service"

2. **Configure Service**
   - **Name**: woundlog-backend
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   PORT=10000
   ```

## Database Setup (MongoDB Atlas)

1. **Create Cluster**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create a free cluster
   - Choose your preferred region

2. **Database Access**
   - Create a database user
   - Set username and password
   - Grant "Read and write to any database" permissions

3. **Network Access**
   - Add IP address: `0.0.0.0/0` (for production)
   - Or add your specific IP for development

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Environment Variables Reference

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/woundlog?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_jwt_secret_key_here
PORT=5000
NODE_ENV=production
```

## Post-Deployment Checklist

- [ ] Frontend is accessible and loads without errors
- [ ] Backend API endpoints are responding
- [ ] Database connection is working
- [ ] Authentication is functioning
- [ ] Bleed wall posts are loading
- [ ] Heart/report functionality works
- [ ] Mobile responsiveness is working
- [ ] Environment variables are properly set

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for your frontend domain
   - Check that `NEXT_PUBLIC_API_URL` is correct

2. **Database Connection Issues**
   - Verify MongoDB Atlas network access includes your deployment IP
   - Check that connection string is correct
   - Ensure database user has proper permissions

3. **Build Failures**
   - Check that all dependencies are in package.json
   - Verify Node.js version compatibility
   - Check for TypeScript compilation errors

4. **Environment Variables**
   - Ensure all required variables are set in deployment platform
   - Check that variable names match exactly (case-sensitive)
   - Verify no extra spaces or quotes in values

## Monitoring

- Set up logging for backend errors
- Monitor API response times
- Track database connection status
- Set up alerts for service downtime 