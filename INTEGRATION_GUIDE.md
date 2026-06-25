# Frontend to Backend Integration Guide

## 🔗 Connect Your Website to Backend

This guide shows how to integrate your website (frontend) with the backend API.

---

## 📝 Current Situation

**Frontend (Website):**
- ✅ Runs in browser
- ✅ Shopping cart works (localStorage)
- ✅ Forms work locally
- ⚠️ Forms don't save to database yet
- ⚠️ No admin panel yet

**Backend (API):**
- ✅ Running at `http://localhost:5000`
- ✅ Connected to MongoDB
- ✅ Admin dashboard ready
- ✅ All API endpoints ready

---

## 🔌 Integration Points

### 1. Shopping Cart → Orders API

**Before (Now):**
```javascript
// Cart saved to browser only
localStorage.setItem('cart', JSON.stringify(items));
```

**After (With Backend):**
```javascript
// Send order to backend
fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        customerName: "John Doe",
        customerEmail: "john@email.com",
        customerPhone: "9876543210",
        items: cartItems,
        total: totalAmount,
        address: shippingAddress
    })
})
.then(res => res.json())
.then(data => {
    console.log('Order created:', data);
    // Clear cart
    localStorage.removeItem('cart');
})
```

---

### 2. Contact Form → Backend

**Before:**
```javascript
// Form shown locally, not saved
alert('Form submitted locally');
```

**After:**
```javascript
fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    })
})
.then(res => res.json())
.then(data => {
    console.log('Message saved:', data);
    alert('Thank you! We received your message.');
})
```

---

### 3. Newsletter → Backend

**Before:**
```javascript
// Only shown confirmation, not saved
alert('Subscribed!');
```

**After:**
```javascript
fetch('http://localhost:5000/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: emailInput.value
    })
})
.then(res => res.json())
.then(data => {
    console.log('Newsletter signup:', data);
    alert('Subscribed successfully!');
})
```

---

### 4. Products → Backend

**Before:**
```javascript
// Products hardcoded in HTML
// Product prices in HTML
```

**After:**
```javascript
// Fetch products from backend
fetch('http://localhost:5000/api/products')
    .then(res => res.json())
    .then(products => {
        // Display products from database
        displayProducts(products);
    })
```

---

## 📝 Step-by-Step Integration

### Step 1: Update API URL in Frontend

**Edit:** `js/main.js`

Find:
```javascript
const API_URL = 'http://localhost:8000/api'; // Old (FormSpree URL)
```

Replace with:
```javascript
const API_URL = 'http://localhost:5000/api'; // New (Backend URL)
```

**For Production** (after deployment):
```javascript
const API_URL = 'https://your-deployed-backend.vercel.app/api';
```

---

### Step 2: Update Checkout Function

**Edit:** `js/main.js` → Find `checkout()` function

**Current Code:**
```javascript
checkout() {
    if (this.items.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! Our team will contact you shortly to confirm.');
    this.items = [];
    this.saveCart();
    this.closeCart();
    this.updateCartCount();
}
```

**Replace with:**
```javascript
async checkout() {
    if (this.items.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const totalAmount = this.items.reduce((sum, item) => sum + item.price, 0);

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerName: prompt('Enter your name:') || 'Customer',
                customerEmail: prompt('Enter your email:') || '',
                customerPhone: prompt('Enter your phone:') || '',
                items: this.items,
                total: totalAmount,
                address: prompt('Enter your address:') || ''
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert('Error: ' + (data.message || 'Failed to create order'));
            return;
        }

        alert('✅ Order created successfully!\nOrder #: ' + data.order.orderNumber);
        
        // Clear cart
        this.items = [];
        this.saveCart();
        this.closeCart();
        this.updateCartCount();

        console.log('Order created:', data.order);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}
```

---

### Step 3: Update Contact Form

**Edit:** `index.html` → Contact Form

Change the form to:
```html
<form class="contact-form" id="contactForm" onsubmit="submitContactForm(event)">
    <div class="form-group">
        <label>Name *</label>
        <input type="text" name="name" placeholder="Your name" required>
    </div>
    <div class="form-group">
        <label>Phone Number *</label>
        <input type="tel" name="phone" placeholder="Your phone number" required>
    </div>
    <div class="form-group">
        <label>Email *</label>
        <input type="email" name="email" placeholder="Your email address" required>
    </div>
    <div class="form-group">
        <label>Message *</label>
        <textarea name="message" placeholder="Enter your message" rows="5" required></textarea>
    </div>
    <button type="submit" class="submit-btn">Send Message</button>
</form>
```

**Add to `js/main.js`:**
```javascript
async function submitContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(document.getElementById('contactForm'));
    
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert('Error: ' + (data.message || 'Failed to send'));
            return;
        }

        alert('✅ Thank you! We received your message and will contact you soon.');
        document.getElementById('contactForm').reset();

        console.log('Contact submitted:', data);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}
```

---

### Step 4: Update Newsletter Form

**Edit:** `index.html` → Newsletter Form

Change to:
```html
<form class="newsletter-form" onsubmit="submitNewsletter(event)">
    <input type="email" name="email" placeholder="Enter your email address" required>
    <button type="submit">Subscribe</button>
</form>
```

**Add to `js/main.js`:**
```javascript
async function submitNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    try {
        const response = await fetch(`${API_URL}/newsletter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (!response.ok) {
            alert('Error: ' + (data.message || 'Failed to subscribe'));
            return;
        }

        alert('✅ Thank you for subscribing!');
        event.target.reset();

        console.log('Newsletter subscription:', data);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}
```

---

### Step 5: Load Products from Backend (Optional)

**Add to `js/main.js`:**
```javascript
async function loadProductsFromBackend() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();

        console.log('Products loaded from backend:', products);
        
        // You can now use these products to dynamically render
        // instead of hardcoded HTML
        
        return products;
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', loadProductsFromBackend);
```

---

## 🧪 Testing Integration

### 1. Start Backend
```bash
npm start
```

### 2. Open Frontend
```
http://localhost:8000
```

### 3. Test Order Creation
- Add items to cart
- Click checkout
- Fill in details when prompted
- Check admin dashboard for new order

### 4. Test Contact Form
- Fill contact form
- Submit
- Check admin dashboard → Contacts

### 5. Test Newsletter
- Subscribe with email
- Check admin dashboard → Newsletter

---

## 🔍 Debugging

### Check API Connection
Open browser console (F12) and run:
```javascript
fetch('http://localhost:5000/api/health')
    .then(res => res.json())
    .then(data => console.log(data))
```

Expected response:
```json
{
    "status": "OK",
    "message": "ORAVIAWATER Backend is running",
    "timestamp": "2024-06-22T..."
}
```

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Try to submit form/checkout
4. See API request details
5. Check Response tab for errors

### Enable CORS
Backend already has CORS enabled, but if you get CORS error:
- Check network tab for actual error
- Ensure backend is running
- Check API URL is correct

---

## 📱 Full Integration Checklist

- [ ] Backend running (`npm start`)
- [ ] Updated API_URL in js/main.js
- [ ] Updated checkout() function
- [ ] Updated contact form handler
- [ ] Updated newsletter form handler
- [ ] Test order creation
- [ ] Test contact form submission
- [ ] Test newsletter subscription
- [ ] Check admin dashboard for data
- [ ] All forms save to MongoDB

---

## 🚀 Deployment Integration

Once deployed:

### Update Frontend API URL
**In js/main.js:**
```javascript
const API_URL = 'https://your-backend-url.vercel.app/api';
```

### Update Admin Dashboard URL
**In index.html (if you want to link to admin):**
```html
<a href="https://your-backend-url.vercel.app/admin">Admin Panel</a>
```

### Update Frontend Deployment
- Push frontend changes to GitHub/Netlify
- Wait for auto-deploy
- Test everything works together

---

## ✅ What You Now Have

✅ **Full Stack Application:**
- Frontend (Website + Admin dashboard)
- Backend (API + MongoDB)
- Both communicate via HTTP requests
- Data persisted in MongoDB
- Admin can manage everything

✅ **Production Ready:**
- Can deploy frontend to Netlify
- Can deploy backend to Vercel
- Both work together perfectly
- No VPS needed
- Scalable & secure

---

## 🎯 You're Ready!

Your complete application is now:
1. ✅ Built
2. ✅ Integrated
3. ✅ Tested (locally)
4. ✅ Ready to deploy

**Next:** Deploy both frontend and backend, then go live! 🚀
