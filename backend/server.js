// ==========================================
// ORAVIAWATER BACKEND SERVER
// ==========================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load environment variables
const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// MONGODB CONNECTION
// ==========================================

const MONGODB_URI = process.env.MONGODB_URI;

// Connection options with SSL handling
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority',
    ssl: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

mongoose.connect(MONGODB_URI, mongoOptions)
.then(async () => {
    console.log('✅ MongoDB Connected Successfully');
    await createDefaultAdminUser();
    await seedProducts();
})
.catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('📍 Troubleshooting: Check MongoDB Atlas IP whitelist settings');
    console.error('📍 Make sure your current IP is added to the IP Access List');
    console.log('⚠️  Running in offline mode - database features unavailable');
});

// ==========================================
// DATABASE MODELS
// ==========================================

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: false },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    sku: { type: String, unique: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Order Schema
const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        productName: String,
        price: Number,
        quantity: Number
    }],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    address: String,
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    notes: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Newsletter Schema
const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
    createdAt: { type: Date, default: Date.now }
});

// Settings Schema
const settingsSchema = new mongoose.Schema({
    key: { type: String, unique: true },
    value: mongoose.Schema.Types.Mixed,
    updatedAt: { type: Date, default: Date.now }
});

// Create Models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Settings = mongoose.model('Settings', settingsSchema);

// ==========================================
// BOOTSTRAP HELPERS
// ==========================================

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const createDefaultAdminUser = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@oraviawater.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            if (existingAdmin.password && !existingAdmin.password.startsWith('$2') && existingAdmin.password === adminPassword) {
                existingAdmin.password = await bcrypt.hash(adminPassword, 10);
                await existingAdmin.save();
            }
            return existingAdmin;
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const adminUser = new User({
            name: 'Administrator',
            email: adminEmail,
            phone: '0000000000',
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();
        console.log(`✅ Default admin created: ${adminEmail}`);
        return adminUser;
    } catch (error) {
        console.error('❌ Failed to create default admin:', error.message);
    }
};

const seedProducts = async () => {
    try {
        const count = await Product.countDocuments();
        if (count > 0) return;

        const sampleProducts = [
            {
                name: 'Premium Mineral Water',
                description: 'Pure mineral water enriched with essential minerals.',
                price: 150,
                image: 'https://images.unsplash.com/photo-1608270861620-7791c0c1d53e?w=300&h=300&fit=crop',
                category: 'Bottled Water',
                stock: 100,
                sku: 'PMW-001',
                isActive: true
            },
            {
                name: 'Alkaline Water',
                description: 'Balanced pH water for everyday hydration.',
                price: 180,
                image: 'https://images.unsplash.com/photo-1609903528506-86e44b63dbb0?w=300&h=300&fit=crop',
                category: 'Bottled Water',
                stock: 80,
                sku: 'ALK-001',
                isActive: true
            },
            {
                name: 'Sparkling Water',
                description: 'Refreshing carbonated mineral water.',
                price: 120,
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561182?w=300&h=300&fit=crop',
                category: 'Bottled Water',
                stock: 60,
                sku: 'SPK-001',
                isActive: true
            }
        ];

        await Product.insertMany(sampleProducts);
        console.log('✅ Seed products created');
    } catch (error) {
        console.error('❌ Failed to seed products:', error.message);
    }
};

// ==========================================
// MIDDLEWARE - AUTHENTICATION
// ==========================================

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

// ==========================================
// PUBLIC API ROUTES
// ==========================================

// Get all active products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Subscribe to newsletter
app.post('/api/newsletter', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        let subscriber = await Newsletter.findOne({ email });
        if (subscriber) {
            subscriber.isActive = true;
            await subscriber.save();
        } else {
            subscriber = new Newsletter({ email });
            await subscriber.save();
        }
        
        res.json({ message: 'Subscribed successfully', subscriber });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const contact = new Contact({ name, email, phone, message });
        await contact.save();
        
        res.json({ message: 'Message received, we will contact you soon', contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create order (from shopping cart)
app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, customerEmail, customerPhone, items, total, address } = req.body;
        
        if (!customerName || !customerEmail || !items || !total) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        // Generate order number
        const orderNumber = 'ORD-' + Date.now();
        
        const order = new Order({
            orderNumber,
            customerName,
            customerEmail,
            customerPhone,
            items,
            total,
            address
        });
        
        await order.save();
        
        res.json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// AUTHENTICATION API ROUTES
// ==========================================

app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'A user with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            role: 'customer'
        });

        await user.save();

        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        const safeUser = user.toObject();
        delete safeUser.password;

        res.status(201).json({ message: 'Registration successful', token, user: safeUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password).catch(() => false);
        const legacyPasswordMatch = user.password === password;

        if (!isPasswordValid && !legacyPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        const safeUser = user.toObject();
        delete safeUser.password;

        res.json({ message: 'Login successful', token, user: safeUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// ADMIN API ROUTES
// ==========================================

// Admin Login
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        const user = await User.findOne({ email, role: 'admin' });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password).catch(() => false);
        const legacyPasswordMatch = user.password === password;

        if (!isPasswordValid && !legacyPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            role: user.role
        }, JWT_SECRET, { expiresIn: '7d' });

        const safeUser = user.toObject();
        delete safeUser.password;

        res.json({ message: 'Login successful', token, user: safeUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get dashboard stats
app.get('/api/admin/stats', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalRevenue = await Order.aggregate([
            { $match: { status: { $ne: 'cancelled' } } },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        const totalCustomers = await User.countDocuments({ role: 'customer' });
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        const totalSubscribers = await Newsletter.countDocuments({ isActive: true });
        const newContacts = await Contact.countDocuments({ status: 'new' });
        
        res.json({
            totalProducts,
            totalOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
            totalCustomers,
            pendingOrders,
            totalSubscribers,
            newContacts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// ADMIN PRODUCT MANAGEMENT
// ==========================================

// Create product
app.post('/api/admin/products', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { name, description, price, image, category, stock, sku } = req.body;
        
        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: 'Required fields missing' });
        }
        
        const product = new Product({
            name,
            description,
            price,
            image,
            category,
            stock: stock || 0,
            sku: sku || Date.now().toString()
        });
        
        await product.save();
        res.json({ message: 'Product created', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update product
app.put('/api/admin/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete product
app.delete('/api/admin/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { isActive: false, updatedAt: Date.now() },
            { new: true }
        );
        
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// ADMIN ORDER MANAGEMENT
// ==========================================

// Get all orders
app.get('/api/admin/orders', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).populate('userId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get order details
app.get('/api/admin/orders/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId').populate('items.productId');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update order status
app.put('/api/admin/orders/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { status, paymentStatus, notes } = req.body;
        
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { 
                status: status || undefined,
                paymentStatus: paymentStatus || undefined,
                notes: notes || undefined,
                updatedAt: Date.now()
            },
            { new: true }
        );
        
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order updated', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// ADMIN CONTACT MANAGEMENT
// ==========================================

// Get all contacts
app.get('/api/admin/contacts', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mark contact as read
app.put('/api/admin/contacts/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status: 'read' },
            { new: true }
        );
        
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json({ message: 'Contact updated', contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// ADMIN NEWSLETTER MANAGEMENT
// ==========================================

// Get all subscribers
app.get('/api/admin/newsletter', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const subscribers = await Newsletter.find({ isActive: true }).sort({ subscribedAt: -1 });
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// ADMIN USER MANAGEMENT
// ==========================================

// Create admin user
app.post('/api/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Required fields missing' });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const user = new User({
            name,
            email,
            password,
            role: role || 'customer'
        });
        
        await user.save();
        res.json({ message: 'User created', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'ORAVIAWATER Backend is running',
        timestamp: new Date()
    });
});

// ==========================================
// SERVE STATIC FILES
// ==========================================

// Serve static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));

// Serve admin dashboard
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Home page - Serve index.html as default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin login fallback
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 ORAVIAWATER Backend running on port ${PORT}`);
    console.log(`📊 Admin Dashboard: http://localhost:${PORT}/admin`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
    console.log(`💪 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
