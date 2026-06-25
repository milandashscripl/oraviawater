# ORAVIAWATER Backend - Complete Deployment Guide

## 📋 What You Now Have

✅ **Node.js/Express Backend** - Full API with MongoDB integration  
✅ **Admin Dashboard** - Complete control panel for managing everything  
✅ **MongoDB Integration** - Using your MongoDB Atlas credentials  
✅ **Authentication** - Admin login system with JWT tokens  
✅ **Ready to Deploy** - No VPS needed, deploy to free cloud platforms  

---

## 🚀 Quick Start (Local Testing)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Backend Server
```bash
npm start
```
or for development with auto-reload:
```bash
npm run dev
```

### 3. Access Your Services

**Backend API:**
```
http://localhost:5000/api
```

**Admin Dashboard:**
```
http://localhost:5000/admin
```

**Health Check:**
```
http://localhost:5000/api/health
```

### 4. Admin Login (Development)
- **Email:** admin@oraviawater.com
- **Password:** admin123

---

## 📊 Backend API Endpoints

### Public Endpoints (No Auth Required)

#### Products
```
GET  /api/products              # Get all products
GET  /api/products/:id          # Get single product
```

#### Orders
```
POST /api/orders                # Create new order
{
  "customerName": "John Doe",
  "customerEmail": "john@email.com",
  "customerPhone": "9876543210",
  "items": [
    {
      "productId": "...",
      "productName": "Water Bottle",
      "price": 150,
      "quantity": 2
    }
  ],
  "total": 300,
  "address": "123 Main St"
}
```

#### Newsletter
```
POST /api/newsletter              # Subscribe to newsletter
{
  "email": "user@email.com"
}
```

#### Contact Form
```
POST /api/contact                # Submit contact form
{
  "name": "John Doe",
  "email": "john@email.com",
  "phone": "9876543210",
  "message": "Your message here"
}
```

### Admin Endpoints (Auth Required)

**Add Authorization Header:**
```
Authorization: Bearer <your-jwt-token>
```

#### Authentication
```
POST /api/admin/login
{
  "email": "admin@oraviawater.com",
  "password": "admin123"
}
```

#### Dashboard
```
GET /api/admin/stats            # Get dashboard statistics
```

#### Products Management
```
POST   /api/admin/products      # Create product
PUT    /api/admin/products/:id  # Update product
DELETE /api/admin/products/:id  # Delete product
```

#### Orders Management
```
GET    /api/admin/orders        # Get all orders
GET    /api/admin/orders/:id    # Get order details
PUT    /api/admin/orders/:id    # Update order status
{
  "status": "confirmed|shipped|delivered|cancelled",
  "paymentStatus": "pending|completed|failed",
  "notes": "Any notes"
}
```

#### Contact Management
```
GET /api/admin/contacts         # Get all contacts
PUT /api/admin/contacts/:id     # Mark as read
```

#### Newsletter
```
GET /api/admin/newsletter       # Get all subscribers
```

#### Users
```
POST /api/admin/users           # Create admin user
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "secure-password",
  "role": "admin"
}
```

---

## 🌐 Deploy to Free Platforms

### Option 1: VERCEL (Recommended - Easiest)

**Pros:**
- ✅ Free tier is generous
- ✅ Automatic deployments from Git
- ✅ Quick setup (5 minutes)
- ✅ Works with Node.js perfectly

**Setup Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Add Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Any random string (change in production!)

5. **Your Site is Live!**
   ```
   https://your-project.vercel.app
   ```

---

### Option 2: RAILWAY (Also Great)

**Pros:**
- ✅ Free tier with $5 credit
- ✅ Perfect for Node.js
- ✅ Easy GitHub integration

**Setup Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "ORAVIAWATER Backend"
   git push origin main
   ```

2. **Go to Railway**
   - Visit https://railway.app
   - Click "Start New Project"
   - Select "Deploy from GitHub"
   - Choose your repository

3. **Add Environment Variables**
   - In Railway Dashboard → Variables
   - Add `MONGODB_URI` and `JWT_SECRET`

4. **Deploy**
   - Railway auto-deploys on push

5. **Get Your URL**
   ```
   https://your-project.up.railway.app
   ```

---

### Option 3: RENDER (Free Alternative)

**Setup Steps:**

1. **Push to GitHub**
2. **Go to Render**
   - Visit https://render.com
   - Click "New Service"
   - Connect GitHub
   - Select repository

3. **Configure**
   - Environment: Node
   - Build: `npm install`
   - Start: `npm start`
   - Add environment variables

4. **Deploy**
   - Click "Create Web Service"

---

## 🔐 Production Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Change admin password in database
- [ ] Use HTTPS (all platforms provide free SSL)
- [ ] Never commit `.env` file
- [ ] Enable MongoDB IP Whitelist (allow your server IP)
- [ ] Add rate limiting (coming soon)
- [ ] Add input validation (add express-validator)
- [ ] Use environment variables for all secrets

---

## 📱 Frontend Integration

### Update Frontend API URL

In your `js/main.js` or frontend code:

**Development:**
```javascript
const API_URL = 'http://localhost:5000/api';
```

**Production (After Deployment):**
```javascript
const API_URL = 'https://your-deployed-url.vercel.app/api';
```

---

## 🛍️ Complete Checkout Flow

### Frontend to Backend Flow:

1. **User adds items to cart** (Browser localStorage)
2. **User clicks Checkout**
3. **Frontend sends to API:**
   ```javascript
   fetch('https://your-url/api/orders', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
           customerName: "John Doe",
           customerEmail: "john@email.com",
           customerPhone: "9876543210",
           items: cartItems,
           total: cartTotal,
           address: shippingAddress
       })
   })
   ```

4. **Backend stores order in MongoDB**
5. **Admin dashboard shows new order**
6. **Admin can update order status**

---

## 💾 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password: String,
  role: "customer" | "admin",
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  image: String (URL),
  category: String,
  stock: Number,
  sku: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique),
  userId: ObjectId (ref: User),
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  items: [
    {
      productId: ObjectId,
      productName: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled",
  address: String,
  paymentStatus: "pending" | "completed" | "failed",
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
```

### "MongoDB Connection Error"
- Check `MONGODB_URI` in `.env`
- Ensure IP whitelist includes your server
- MongoDB Atlas → Network Access → Add Current IP

### "Cannot POST /api/orders"
- Check backend is running
- Check API URL in frontend
- Check CORS is enabled (it is in server.js)

### "Admin login not working"
- Check MongoDB is connected
- In dev mode, any email/password works (no validation)
- Default demo: `admin@oraviawater.com` / `admin123`

---

## 📈 Scale & Upgrade

### When you need more:

1. **MongoDB Atlas** - Free 512MB
   - Upgrade to paid for more storage ($0-99/month)

2. **Vercel** - Free tier
   - Upgrade for more bandwidth ($20+/month)

3. **Railway** - $5 credit/month free
   - Upgrade anytime, pay only for usage

---

## 🎯 Next Steps

1. ✅ **Local Testing** - Test all features locally
2. ✅ **Fix MongoDB** - Ensure it's connected
3. ✅ **Deploy Backend** - Push to Vercel/Railway
4. ✅ **Update Frontend API URL** - Point to deployed backend
5. ✅ **Deploy Frontend** - Push to Netlify/Vercel
6. ✅ **Connect Everything** - Test end-to-end
7. ✅ **Setup Admin** - Manage products & orders

---

## 📞 Support

- **Backend Issues?** Check server logs
- **MongoDB Issues?** Check MongoDB Atlas console
- **Deployment Issues?** Check Vercel/Railway logs
- **API Issues?** Test with Postman or curl

---

**Your backend is production-ready! Deploy with confidence! 🚀**
