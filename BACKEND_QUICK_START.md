# ORAVIAWATER Backend - Quick Start Guide

## 🎯 What's Included

Your complete backend platform with:

```
Backend System
├── ✅ Express.js Server (Node.js)
├── ✅ MongoDB Database (Atlas)
├── ✅ Admin Dashboard (Web UI)
├── ✅ JWT Authentication
├── ✅ REST API (30+ endpoints)
├── ✅ Product Management
├── ✅ Order Management
├── ✅ Contact Form Handler
├── ✅ Newsletter Management
├── ✅ Ready to Deploy (No VPS)
└── ✅ Production Ready
```

---

## ⚡ 5-Minute Setup

### Step 1: Install Node Dependencies
```bash
cd d:\Oraviawater
npm install
```

### Step 2: Start Backend
```bash
npm start
```

Expected output:
```
✅ MongoDB Connected Successfully
🚀 ORAVIAWATER Backend running on port 5000
📊 Admin Dashboard: http://localhost:5000/admin
🔗 API: http://localhost:5000/api
```

### Step 3: Test It
- **Admin Dashboard:** http://localhost:5000/admin
- **API Health:** http://localhost:5000/api/health

### Step 4: Admin Login
- **Email:** admin@oraviawater.com
- **Password:** admin123

---

## 📊 Admin Dashboard Features

Once logged in, you can:

### 1. **Dashboard**
- View total products, orders, revenue
- See pending orders count
- Track newsletter subscribers
- View new contact messages

### 2. **Products Management**
- ➕ Add new products
- ✏️ Edit product details
- 🗑️ Delete products
- 📊 View stock levels

### 3. **Orders Management**
- 👀 View all orders
- 📝 Update order status (pending → shipped → delivered)
- 💰 Check payment status
- 📧 Customer details

### 4. **Contact Messages**
- 📬 View contact form submissions
- ✅ Mark as read/replied
- 📞 Get customer details

### 5. **Newsletter**
- 📧 View all subscribers
- 📥 Download subscriber list
- 📊 Subscriber count

---

## 🔌 API Usage Examples

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
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
  }'
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Subscribe to Newsletter
```bash
curl -X POST http://localhost:5000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@oraviawater.com",
    "password": "admin123"
  }'
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "_id": "...",
    "name": "Admin",
    "email": "admin@oraviawater.com",
    "role": "admin"
  }
}
```

### Get Dashboard Stats (With Auth)
```bash
curl http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer eyJhbGc..."
```

---

## 📁 Project Structure

```
Oraviawater/
├── server.js                      # Main Express server
├── package.json                   # Dependencies
├── .env                          # Environment variables
├── vercel.json                   # Vercel config
├── railway.toml                  # Railway config
├── admin/
│   └── index.html                # Admin dashboard
├── BACKEND_DEPLOYMENT_GUIDE.md   # Deployment guide
├── BACKEND_QUICK_START.md        # This file
└── [Frontend files...]           # Your website files
```

---

## 🗄️ MongoDB Collections

Automatically created in your MongoDB:

1. **users** - Stores admin & customer accounts
2. **products** - Stores all products
3. **orders** - Stores all customer orders
4. **newsletters** - Email subscribers
5. **contacts** - Contact form submissions
6. **settings** - App settings

You can view/manage all in MongoDB Atlas console.

---

## 🚀 Deploy to Production

### Option 1: Vercel (Easiest)
```bash
npm install -g vercel
vercel login
vercel --prod
```
Your URL: `https://your-project.vercel.app`

### Option 2: Railway
```bash
git push origin main  # Push to GitHub
# Connect GitHub at railway.app
# Auto-deployed!
```

### Option 3: Render
Same as Railway but at render.com

**After deployment, update frontend:**
```javascript
// Change in js/main.js
const API_URL = 'https://your-deployed-url/api';
```

---

## 🔐 Security Notes

**Development (Current):**
- ✅ JWT enabled
- ✅ CORS enabled
- ✅ MongoDB connected
- ⚠️ Admin credentials are demo only

**Before Production:**
- Change `JWT_SECRET` in `.env`
- Change admin password
- Enable HTTPS (automatic on Vercel/Railway)
- Disable demo mode
- Use environment variables for all secrets

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:**
```bash
# Check .env file has correct URI
# In MongoDB Atlas: Network Access → Add your IP
# Restart server: npm start
```

### Issue: "Admin login fails"
**Solution:**
```bash
# Make sure MongoDB is running
# Default demo creds: admin@oraviawater.com / admin123
# Check MongoDB connection in console
```

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port:
# Windows: netstat -ano | findstr :5000
# Kill it or change PORT in .env
```

---

## 📚 Useful MongoDB Commands

Connect to MongoDB Atlas:
1. Go to MongoDB Atlas console
2. Click "Collections"
3. View all data in realtime
4. Add/edit/delete documents manually

---

## ✅ Checklist Before Deployment

- [ ] `npm install` runs without errors
- [ ] `npm start` connects to MongoDB
- [ ] Admin dashboard loads at localhost:5000/admin
- [ ] Can login with demo credentials
- [ ] Can add a product via dashboard
- [ ] API endpoints respond (test with curl)
- [ ] .env file has all required variables
- [ ] .gitignore includes .env (don't commit!)
- [ ] Deployment target chosen (Vercel/Railway/Render)
- [ ] Environment variables added to deployment platform

---

## 🎯 What's Next?

1. **Local Testing** ← You are here
2. **Add Sample Products** - Use admin dashboard
3. **Deploy Backend** - Follow deployment guide
4. **Update Frontend** - Change API_URL
5. **Deploy Frontend** - To Netlify
6. **Test End-to-End** - Place an order
7. **Go Live!** - Your store is online! 🎉

---

## 📞 Help & Support

- **Errors in console?** Post error message here
- **MongoDB issues?** Check MongoDB Atlas status
- **Deployment issues?** Check Vercel/Railway logs
- **API not working?** Test with Postman (free tool)

---

**Ready to launch? Deploy now! 🚀**
