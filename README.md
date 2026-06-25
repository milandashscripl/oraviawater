# ORAVIAWATER - Premium Mineral Water Website

A modern, responsive website for a premium mineral water brand built with HTML, CSS, and JavaScript. No backend server required - uses free cloud services for functionality.

## 🌊 Features

- **Responsive Design**: Mobile-first approach, works seamlessly on all devices
- **Product Catalog**: Showcase products with prices and add-to-cart functionality
- **Shopping Cart**: Client-side cart management with localStorage persistence
- **Contact Form**: Get in touch with integrated form submission
- **Newsletter Signup**: Email subscription management
- **Social Media Integration**: Links to all major social platforms
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Fast loading, optimized images, smooth animations
- **No Backend Server Required**: Uses free cloud services

## 📁 Project Structure

```
Oraviawater/
├── index.html              # Main website page
├── css/
│   └── styles.css         # All styling
├── js/
│   ├── main.js            # Main functionality
│   └── firebase-config.js # Firebase setup (optional)
├── README.md              # This file
└── .gitignore             # Git ignore file
```

## 🚀 Quick Start

### 1. **Clone or Download**
```bash
git clone <your-repo-url>
cd Oraviawater
```

### 2. **Open in Browser**
Simply open `index.html` in your web browser. No build process required!

```bash
# On Windows
start index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

Or serve using a simple HTTP server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if installed)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## ⚙️ Setup Backend Services (Optional)

### Form Submission (FormSpree or Basin)

For contact forms to work, you need to set up a free form service:

#### Option 1: **FormSpree** (Recommended)
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form
4. Get your Form ID (e.g., `f1a2b3c4d5`)
5. In `index.html`, find both forms and update the `action` attribute:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

#### Option 2: **Basin**
1. Go to [basin.js.org](https://basin.js.org)
2. Create a form endpoint
3. Update the form `action` in `index.html`

### Email Newsletter (Optional - Firebase or Basin)

Use Firebase Realtime Database to store newsletter subscriptions:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Realtime Database
3. Create `js/firebase-config.js` with your config:
   ```javascript
   // Firebase configuration
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       databaseURL: "YOUR_DATABASE_URL",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
   };

   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   ```

4. Update `index.html` to include Firebase SDK before `main.js`:
   ```html
   <script src="https://www.gstatic.com/firebasedb/9.22.2/firebase-app.js"></script>
   <script src="https://www.gstatic.com/firebasedb/9.22.2/firebase-database.js"></script>
   <script src="js/firebase-config.js"></script>
   ```

5. Update newsletter form handling in `js/main.js`:
   ```javascript
   const newsletter = firebase.database().ref('newsletter');
   newsletter.push({ email: formData.get('email'), timestamp: new Date() });
   ```

## 🛍️ Shopping Cart

The shopping cart is **fully functional** and uses browser localStorage:

- **Add Products**: Click "Add to Cart" buttons
- **View Cart**: Click the cart icon in header
- **Remove Items**: Click trash icon in cart sidebar
- **Persistent Storage**: Cart data saved even after page refresh
- **Checkout**: Integration-ready (you can add Razorpay, Stripe, etc.)

### Integrating Payment Gateway (Razorpay/Stripe)

Update the `checkout()` method in `js/main.js`:

```javascript
checkout() {
    const totalAmount = this.items.reduce((sum, item) => sum + item.price, 0);
    
    // Razorpay integration example
    const options = {
        key: 'YOUR_RAZORPAY_KEY',
        amount: totalAmount * 100,
        currency: 'INR',
        name: 'ORAVIAWATER Water',
        handler: (response) => {
            // Payment successful
            this.items = [];
            this.saveCart();
            this.updateCartCount();
        }
    };
    
    const razorpay = new Razorpay(options);
    razorpay.open();
}
```

## 🎨 Customization

### Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #2d5f4f;
    --secondary-color: #1abc9c;
    --accent-color: #e74c3c;
    /* ... other variables */
}
```

### Products
Edit the products grid in `index.html`:
```html
<div class="product-card">
    <img src="your-image-url" alt="Product Name">
    <h3>Product Name</h3>
    <p>Description</p>
    <div class="price">₹Price</div>
    <button class="add-to-cart" data-product="Name" data-price="100">Add to Cart</button>
</div>
```

### Brand Name
Replace "HYDRA" throughout the file with your brand name:
- In `index.html` header logo
- In footer
- In meta tags
- In form emails

### Contact Information
Update in `index.html`:
- Phone numbers
- Email addresses
- Physical address
- Social media links

## 📱 Mobile Optimization

The site is fully responsive with:
- Mobile-first CSS design
- Touch-friendly buttons
- Optimized navigation menu
- Tested on iOS and Android

## 🔒 Privacy & Security

- No sensitive data stored on frontend
- Use HTTPS when deploying
- Forms use CSRF-protected endpoints (FormSpree)
- Never commit API keys to git

## 🚀 Deployment Options (All FREE)

### 1. **Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

### 2. **Vercel**
```bash
npm install -g vercel
vercel --prod
```

### 3. **GitHub Pages**
1. Push to GitHub repository
2. Enable GitHub Pages in Settings
3. Choose main branch as source

### 4. **Firebase Hosting**
```bash
npm install -g firebase-tools
firebase init
firebase deploy
```

## 📊 Analytics

Add Google Analytics:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 🐛 Troubleshooting

### Forms not working?
- Check FormSpree account is active
- Verify Form ID in HTML matches FormSpree
- Check browser console for errors

### Cart not persisting?
- Enable localStorage in browser (check privacy settings)
- Clear browser cache and try again
- Check DevTools > Application > LocalStorage

### Images not loading?
- Update image URLs in HTML
- Ensure external image URLs are accessible
- Use your own image hosting (Cloudinary, ImgBB, etc.)

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [FormSpree Docs](https://formspree.io/forms/create/)
- [Firebase Docs](https://firebase.google.com/docs)
- [CSS Tricks](https://css-tricks.com/)

## 🤝 Contributing

Feel free to customize and improve this template!

## 📄 License

Open source - use freely for commercial and personal projects.

## 📞 Support

For questions about setup:
1. Check the troubleshooting section
2. Review the code comments
3. Check browser console for error messages

---

**Happy Coding! 💧**

Built with ❤️ for refreshing experiences
