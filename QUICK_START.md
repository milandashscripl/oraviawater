# Quick Customization Checklist

## 🎯 Must Do (5 minutes)

### 1. Brand Name
- [ ] Open `index.html`
- [ ] Find: `HYDRA`
- [ ] Replace with: Your Brand Name
- [ ] Press Ctrl+H for Find & Replace
- [ ] Save file

### 2. Contact Details
- [ ] Phone: Update both phone numbers
- [ ] Email: Change `Zaynah.agrofood@gmail.com` to your email
- [ ] Address: Update physical address
- [ ] Save file

### 3. Products & Prices
- [ ] Edit product names
- [ ] Update prices (data-price="")
- [ ] Replace product descriptions
- [ ] Save file

### 4. Forms Setup
- [ ] Go to https://formspree.io
- [ ] Sign up (free)
- [ ] Create "Contact Form" and copy ID
- [ ] Paste ID in: `action="https://formspree.io/f/YOUR_ID"`
- [ ] Create "Newsletter Form" and copy ID
- [ ] Paste newsletter ID
- [ ] Save file

### 5. Test Locally
- [ ] Right-click `index.html`
- [ ] Open with your browser
- [ ] Click "Add to Cart"
- [ ] Click cart icon
- [ ] Fill contact form and submit

### 6. Deploy (Choose ONE)
- [ ] **Netlify**: Drag folder to https://netlify.com (easiest)
- [ ] **Vercel**: https://vercel.com
- [ ] **GitHub Pages**: Upload to GitHub
- [ ] **Firebase**: https://firebase.google.com

## 🖼️ Optional (15 minutes)

### Update Images
1. Go to https://imgbb.com (free image hosting)
2. Upload your product images
3. Copy image URL
4. Find image tags in `index.html`
5. Replace `src="https://images.unsplash.com/..."`
6. Paste your image URL instead

### Change Colors
1. Open `css/styles.css`
2. Find: `:root {`
3. Update color codes:
   - `--primary-color: #2d5f4f;` → Your color
   - `--secondary-color: #1abc9c;` → Your color
4. Go to https://colorpicker.com to find hex codes
5. Save and refresh browser

### Update Hero Text
1. Find in `index.html`:
   ```html
   <h1>Experience the Purity of Zealup Mineral Water</h1>
   <p>Discover our premium mineral water...</p>
   ```
2. Replace with your text
3. Save

### Update Social Media
1. Find footer section
2. Replace links:
   ```html
   <a href="https://facebook.com/YOUR_PAGE">
   <a href="https://instagram.com/YOUR_HANDLE">
   ```

## 📱 Test Checklist

- [ ] Open on phone browser
- [ ] Test "Add to Cart"
- [ ] Test cart sidebar
- [ ] Test mobile menu (hamburger icon)
- [ ] Test contact form
- [ ] Click all links
- [ ] Check images load

## ✅ Deployment Checklist

**Before Deploy:**
- [ ] All text updated
- [ ] All images uploaded
- [ ] Forms configured
- [ ] Colors customized
- [ ] Tested on mobile
- [ ] No broken links

**After Deploy:**
- [ ] Visit live URL
- [ ] Test all features
- [ ] Test on phone
- [ ] Share with friends!

## 🆘 Quick Fixes

| Problem | Solution |
|---------|----------|
| Forms not working | Check FormSpree account verification email |
| Images not showing | Verify image URL is correct, use imgbb.com |
| Colors not changing | Clear browser cache (Ctrl+Shift+Delete) |
| Mobile menu stuck | Refresh page with Ctrl+Shift+R |
| Cart not saving | Enable localStorage in browser settings |

## 📞 Important Emails to Update

Find and replace in `index.html`:
- `Zaynah.agrofood@gmail.com` → Your email
- `zaynah.agrofood@gmail.com` → Your email (lowercase)
- `zealup@outlook.com` → Your email

## 🔗 Important Links to Update

Find and replace in `index.html`:
- Social media links (Facebook, Instagram, Twitter, WhatsApp)
- Phone numbers
- Email addresses

## 📝 File Locations

```
Oraviawater/
├── index.html          ← Edit content here
├── css/styles.css      ← Edit colors here
├── js/main.js          ← Don't need to edit
├── README.md           ← View instructions
└── SETUP_GUIDE.md      ← Detailed guide
```

## 🚀 5-Minute Deploy

1. Visit https://netlify.com
2. Sign up (free)
3. Click "Add new site"
4. Drag `Oraviawater` folder
5. Wait 30 seconds
6. Your site is LIVE!

## 🎨 Color Palette Ideas

**Cool (Blue) Theme:**
- Primary: `#1e90ff`
- Secondary: `#00bcd4`
- Accent: `#4caf50`

**Fresh (Green) Theme:**
- Primary: `#27ae60`
- Secondary: `#2ecc71`
- Accent: `#3498db`

**Elegant (Dark) Theme:**
- Primary: `#2c3e50`
- Secondary: `#34495e`
- Accent: `#e74c3c`

---

**That's it! You're ready to launch! 🌊**

For detailed instructions, see `SETUP_GUIDE.md`
