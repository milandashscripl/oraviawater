# 🌊 ORAVIAWATER Website - Complete Setup Guide

A step-by-step guide to customize and deploy your mineral water brand website without needing a VPS.

## ✅ Prerequisites

- A text editor (VS Code, Sublime, Notepad++, etc.)
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No coding knowledge required - just follow the steps!
- Optional: GitHub account (for free hosting)

## 🎯 Step 1: Initial Customization (5-10 minutes)

### 1.1 Open the website files
1. Navigate to the `Oraviawater` folder
2. Open `index.html` in your text editor

### 1.2 Update Brand Name
Replace all instances of "HYDRA" with your brand name:

**Find and Replace:**
- Find: `HYDRA`
- Replace: `Your Brand Name`

**Locations to update:**
```html
<!-- In header -->
<div class="logo">
    <h1>HYDRA</h1>  <!-- Change this -->
</div>

<!-- In footer -->
<h3>HYDRA</h3>  <!-- And this -->
<p>©2024 HYDRA Mineral Water. All rights reserved.</p>  <!-- And this -->
```

### 1.3 Update Contact Information
```html
<!-- Find these lines and update with your details -->
<p><a href="tel:+919876543210">+91 98765 43210</a></p>
<p><a href="tel:+919876543211">+91 98765 43211</a></p>
<p><a href="mailto:info@hydrawater.com">info@hydrawater.com</a></p>
<p><a href="mailto:support@hydrawater.com">support@hydrawater.com</a></p>

<!-- Physical Address -->
<p>123 Water Springs Road<br>
Pure City, State 123456<br>India</p>
```

### 1.4 Update Social Media Links
```html
<!-- Find in footer -->
<a href="https://facebook.com" target="_blank"><i class="fab fa-facebook"></i></a>
<a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
<a href="https://twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
<a href="https://whatsapp.com" target="_blank"><i class="fab fa-whatsapp"></i></a>

<!-- Replace with your actual social media URLs -->
```

## 🖼️ Step 2: Update Images (5-10 minutes)

### 2.1 Where to Host Images
**Free Image Hosting Options:**
- **Imgbb**: https://imgbb.com/ (easiest, no signup needed)
- **Cloudinary**: https://cloudinary.com/ (free tier, good for ecommerce)
- **Imgur**: https://imgur.com/ (easy upload)
- **Unsplash** (for stock images): https://unsplash.com/
- **Pexels** (for stock images): https://pexels.com/

### 2.2 Update Product Images
1. Go to your image hosting site
2. Upload your product images
3. Copy the image URL
4. Find in `index.html`:
```html
<div class="product-card">
    <img src="https://images.unsplash.com/photo-1608270861620-7791c0c1d53e?w=300&h=300&fit=crop" 
         alt="Premium Mineral Water">
```
Replace the `src` URL with your image URL.

### 2.3 Update Product Details
```html
<div class="product-card">
    <img src="YOUR_IMAGE_URL" alt="Your Product Name">
    <h3>Your Product Name</h3>
    <p>Your product description</p>
    <div class="price">₹Your Price</div>
    <button class="add-to-cart" data-product="Your Product Name" data-price="100">
        Add to Cart
    </button>
</div>
```

## 📝 Step 3: Setup Contact Forms (10-15 minutes)

### 3.1 Using FormSpree (Easiest - Recommended)

**Step 1: Create FormSpree Account**
1. Go to https://formspree.io
2. Click "Sign Up" (free)
3. Create an account using email

**Step 2: Create Form for Contact**
1. Click "+ New Form"
2. Name it "Contact Form"
3. Click "Create"
4. Copy your Form ID (looks like: `f1a2b3c4d5`)

**Step 3: Update HTML**
Find this in `index.html`:
```html
<form class="contact-form" id="contactForm" 
      action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
Replace `YOUR_FORM_ID` with your actual Form ID from FormSpree.

**Step 4: Create Newsletter Form**
1. Go back to FormSpree dashboard
2. Click "+ New Form"
3. Name it "Newsletter"
4. Click "Create"
5. Copy the Form ID

Find and update:
```html
<form class="newsletter-form" id="newsletterForm" 
      action="https://formspree.io/f/YOUR_NEWSLETTER_FORM_ID" method="POST">
```

**That's it!** Your forms are now working.

### 3.2 Alternative: Basin (Even Simpler)

1. Go to https://basin.js.org
2. Click "Create a Form"
3. Copy the endpoint URL
4. Update the form `action` in `index.html` with the Basin endpoint

## 🎨 Step 4: Customize Colors (Optional - 5 minutes)

Open `css/styles.css` and find the color variables at the top:

```css
:root {
    --primary-color: #2d5f4f;      /* Main brand color */
    --secondary-color: #1abc9c;    /* Accent color */
    --accent-color: #e74c3c;       /* Highlight color */
    --text-dark: #2c3e50;          /* Text color */
    --text-light: #7f8c8d;         /* Light gray text */
    --bg-light: #f8f9fa;           /* Light background */
    --border-color: #ecf0f1;       /* Border color */
    --white: #ffffff;              /* White */
}
```

**To change colors:**
1. Use a color picker like https://www.colorpicker.com/
2. Get a hex color code (e.g., #FF5733)
3. Replace the color values
4. Save and refresh your browser

**Recommended colors for water brand:**
- Primary: `#1e90ff` (Royal Blue)
- Secondary: `#00bcd4` (Cyan)
- Accent: `#4caf50` (Green)

## 🚀 Step 5: Test Locally (2 minutes)

### 5.1 Open in Browser
1. Right-click on `index.html`
2. Select "Open with" > Your browser
3. Or drag and drop into browser

### 5.2 Test Features
- ✅ Click "Add to Cart" button
- ✅ Click cart icon to view cart
- ✅ Open mobile menu on small screen
- ✅ Try contact form
- ✅ Check all links work

## 📤 Step 6: Deploy to Free Hosting (10-15 minutes)

### Option 1: **Netlify** (Easiest)

1. Go to https://netlify.com
2. Click "Sign up" (use GitHub, Google, or email)
3. Click "Add new site"
4. Select "Deploy manually"
5. **Drag and drop the entire `Oraviawater` folder** into the Netlify area
6. Wait for deployment to complete
7. Your site is live! 🎉

**Your site URL:** `https://your-site-name.netlify.app`

### Option 2: **Vercel**

1. Go to https://vercel.com
2. Click "Sign Up"
3. Create account with GitHub
4. Click "New Project"
5. Click "Import Project"
6. Upload your folder
7. Click "Deploy"

### Option 3: **GitHub Pages** (Most Developer-Friendly)

1. Create GitHub account at https://github.com
2. Create new repository named `yourusername.github.io`
3. Upload files to repository
4. Enable GitHub Pages in Settings
5. Your site is live at `https://yourusername.github.io`

### Option 4: **Firebase Hosting**

1. Go to https://firebase.google.com
2. Create a new project
3. Click "Hosting" in left menu
4. Click "Get Started"
5. Follow the setup steps
6. Deploy your site

## 🛒 Step 7: Setup Shopping Cart (Already Working!)

Your shopping cart is **fully functional** by default!

### To customize:
1. Edit product prices in `index.html`
2. Change `data-price="100"` to your price

### To add payment gateway (Optional):

**Using Razorpay (Most Popular in India):**

1. Sign up at https://razorpay.com
2. Get your API key
3. In `js/main.js`, find the `checkout()` function
4. Add Razorpay code (see commented example in code)

**Using Stripe:**

1. Sign up at https://stripe.com
2. Get your publishable key
3. Add Stripe JS library
4. Integrate in checkout function

## 📊 Step 8: Setup Analytics (Optional - 5 minutes)

### Add Google Analytics
1. Go to https://analytics.google.com
2. Sign in with Google account
3. Create new property
4. Copy your Measurement ID
5. Add to `index.html` before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MEASUREMENT_ID');
</script>
```

## 💾 Step 9: Domain & Email Setup (Optional)

### Custom Domain
1. Buy domain from:
   - **Namecheap**: https://namecheap.com
   - **GoDaddy**: https://godaddy.com
   - **Google Domains**: https://domains.google

2. Connect domain to Netlify/Vercel (they provide instructions)

### Business Email
Use free email services:
- **Gmail for Business**: https://mail.google.com
- Create: `info@yourdomain.com`
- Update in `index.html` contact section

## 🔐 Security Checklist

Before going live:
- [ ] Update all contact information
- [ ] Update all social media links
- [ ] Update product information and prices
- [ ] Add real images
- [ ] Test all forms
- [ ] Test shopping cart
- [ ] Setup FormSpree with your email
- [ ] Verify forms send to your email
- [ ] Test on mobile devices
- [ ] Check all links work

## 📞 Troubleshooting

### Q: Forms not sending?
A: Check FormSpree email verification. FormSpree sends confirmation email - you must click the link!

### Q: Images not loading?
A: Verify image URLs are correct. Some image hosts have CORS issues. Use Imgbb or Cloudinary.

### Q: Cart not working?
A: Check browser console (F12) for errors. Make sure localStorage is enabled.

### Q: Site not showing correctly?
A: Clear browser cache (Ctrl+Shift+Delete) and refresh.

### Q: How to update content later?
A: Just edit `index.html` in text editor, save, and re-deploy to Netlify/Vercel.

## 💡 Pro Tips

1. **Mobile First**: Always test on mobile after changes
2. **Fast Images**: Keep image file size < 500KB
3. **Fresh Cache**: Use Shift+Refresh to clear cache
4. **Backup**: Keep local copy of files
5. **SEO**: Add meta description for better search ranking

## 📱 SEO Optimization

Open `index.html` and update the meta tags:
```html
<title>Your Brand Name - Premium Water</title>
<meta name="description" content="Discover premium mineral water from Your Brand Name...">
<meta name="keywords" content="mineral water, pure water, drinking water, hydration">
```

## 🎓 Next Steps

1. **Learn More HTML**: https://www.w3schools.com/html/
2. **Learn CSS**: https://www.w3schools.com/css/
3. **Connect Payment**: Integrate Razorpay or Stripe
4. **Email Campaigns**: Setup Mailchimp for newsletters
5. **Analytics**: Monitor visitors with Google Analytics

## ✨ Final Checklist

- [ ] Website customized with your brand
- [ ] All images updated
- [ ] Contact forms working
- [ ] Forms sending to your email
- [ ] Site deployed to free hosting
- [ ] Custom domain connected (optional)
- [ ] Mobile responsive tested
- [ ] All links verified working
- [ ] Analytics setup (optional)

---

**Congratulations! Your website is ready! 🚀**

For support, refer to the main README.md file or contact the service providers directly.

Happy selling! 💧
