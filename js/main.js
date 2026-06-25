// ==========================================
// CART MANAGEMENT
// ==========================================

class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.updateCartCount();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => this.addToCart(e));
        });

        // Cart button
        document.getElementById('cartBtn').addEventListener('click', () => this.openCart());
        document.getElementById('closeCart').addEventListener('click', () => this.closeCart());
        document.getElementById('cartOverlay').addEventListener('click', () => this.closeCart());

        // Checkout button
        document.getElementById('checkoutBtn').addEventListener('click', () => this.checkout());
    }

    addToCart(event) {
        const btn = event.target;
        const product = btn.dataset.product;
        const price = parseFloat(btn.dataset.price);

        this.items.push({
            id: Date.now(),
            name: product,
            price: price,
            quantity: 1
        });

        this.saveCart();
        this.showNotification(`${product} added to cart!`);
        this.updateCartCount();
    }

    removeFromCart(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
        this.renderCartItems();
        this.updateCartCount();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const count = this.items.length;
        document.querySelector('.cart-count').textContent = count;
    }

    openCart() {
        document.getElementById('cartSidebar').classList.add('active');
        document.getElementById('cartOverlay').classList.add('active');
        this.renderCartItems();
    }

    closeCart() {
        document.getElementById('cartSidebar').classList.remove('active');
        document.getElementById('cartOverlay').classList.remove('active');
    }

    renderCartItems() {
        const container = document.getElementById('cartItems');

        if (this.items.length === 0) {
            container.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            document.getElementById('cartTotal').textContent = '₹0';
            return;
        }

        let total = 0;
        container.innerHTML = this.items.map(item => {
            total += item.price;
            return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price}</div>
                    </div>
                    <button class="remove-item" onclick="cart.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');

        document.getElementById('cartTotal').textContent = `₹${total}`;
    }

    async checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) {
            showAuthModal();
            return;
        }

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: user.name || user.email,
                    customerEmail: user.email,
                    customerPhone: user.phone || '',
                    items: this.items.map(item => ({
                        productName: item.name,
                        price: item.price,
                        quantity: item.quantity
                    })),
                    total: this.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
                    address: 'Will be confirmed by support'
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Order could not be placed');
            }

            alert(`Thank you for your order, ${user.name || user.email}! Our team will contact you shortly to confirm.`);
            this.items = [];
            this.saveCart();
            this.closeCart();
            this.updateCartCount();
        } catch (error) {
            alert(error.message || 'Unable to place order right now.');
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #1abc9c;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 300;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

function setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = mobileMenu.querySelectorAll('a');

    menuBtn.addEventListener('click', () => {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header') && mobileMenu.style.display === 'block') {
            mobileMenu.style.display = 'none';
        }
    });
}

// ==========================================
// FORM HANDLING
// ==========================================

function setupForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const data = Object.fromEntries(new FormData(this));

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                alert(result.message || 'Thank you for contacting us!');
                if (response.ok) contactForm.reset();
            } catch (error) {
                alert('Unable to send your message right now.');
            }
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;
            try {
                const response = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                const result = await response.json();
                alert(result.message || 'Thank you for subscribing!');
                if (response.ok) this.reset();
            } catch (error) {
                alert('Unable to subscribe right now.');
            }
        });
    }
}

// ==========================================
// SMOOTH SCROLL & ANIMATIONS
// ==========================================

function setupScrollAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .benefit-card, .footer-section').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ==========================================
// ANIMATIONS CSS
// ==========================================

function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        @keyframes fadeInUp {
            from {
                transform: translateY(30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================

function setupSearch() {
    // Add search to products if needed
    // This is a placeholder for search functionality
}

// ==========================================
// ANALYTICS & TRACKING
// ==========================================

function setupAnalytics() {
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_path': window.location.pathname,
            'page_title': document.title
        });
    }

    // Track button clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const product = e.target.dataset.product;
            if (typeof gtag !== 'undefined') {
                gtag('event', 'add_to_cart', {
                    'product_name': product,
                    'value': e.target.dataset.price
                });
            }
        }
    });
}

// ==========================================
// AUTHENTICATION MODAL
// ==========================================

function showAuthModal() {
    const authModal = document.getElementById('authModal');
    const authOverlay = document.getElementById('authOverlay');
    const loginForm = document.getElementById('loginForm');

    authModal.classList.add('active');
    authOverlay.classList.add('active');
    loginForm.style.display = 'block';
}

function closeAuthModal() {
    const authModal = document.getElementById('authModal');
    const authOverlay = document.getElementById('authOverlay');

    authModal.classList.remove('active');
    authOverlay.classList.remove('active');
}

function setupAuthModal() {
    const closeBtn = document.getElementById('closeAuthModal');
    const authOverlay = document.getElementById('authOverlay');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginForm = document.getElementById('loginFormElement');
    const registerForm = document.getElementById('registerFormElement');

    // Close modal
    closeBtn.addEventListener('click', closeAuthModal);
    authOverlay.addEventListener('click', closeAuthModal);

    // Switch forms
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('currentUser', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);
            cart.showNotification('Login successful! Please proceed to checkout.');
            closeAuthModal();
            loginForm.reset();
        } catch (error) {
            alert(error.message || 'Unable to log in.');
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            localStorage.setItem('currentUser', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);
            cart.showNotification('Registration successful! Welcome to ORAVIAWATER.');
            closeAuthModal();
            registerForm.reset();
        } catch (error) {
            alert(error.message || 'Unable to register.');
        }
    });
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inject animation styles
    injectAnimationStyles();

    // Initialize shopping cart
    window.cart = new ShoppingCart();

    // Setup mobile menu
    setupMobileMenu();

    // Setup forms
    setupForms();

    // Setup authentication modal
    setupAuthModal();

    // Setup scroll animations
    setupScrollAnimations();

    // Setup analytics
    setupAnalytics();

    console.log('🌊 ORAVIAWATER Website Initialized');
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}
