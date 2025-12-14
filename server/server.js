const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // New
const jwt = require('jsonwebtoken'); // New
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "secretkey123"; // Real projects lo idhi .env lo pettali

// --- MONGODB CONNECTION ---
mongoose.connect('mongodb://127.0.0.1:27017/cognetix_ecommerce')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// --- SCHEMAS ---
// 1. User Schema (New)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// 2. Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String
});
const Product = mongoose.model('Product', productSchema);

// --- ROUTES ---

// 1. REGISTER API
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Save user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// 2. LOGIN API
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate Token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
});

// 3. PRODUCTS API
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. SEED API (GET method fix from previous step)
app.get('/api/seed', async (req, res) => {
    try {
        // Clean up old data
        await Product.deleteMany({}); 

        const dummyProducts = [
            { 
                name: "Premium Laptop", 
                price: 55000, 
                description: "High performance laptop with 16GB RAM", 
                image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80", 
                category: "Electronics" 
            },
            { 
                name: "Wireless Headphones", 
                price: 2500, 
                description: "Noise cancelling over-ear headphones", 
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", 
                category: "Electronics" 
            },
            { 
                name: "Smart Watch", 
                price: 1800, 
                description: "Fitness tracker with heart rate monitor", 
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", 
                category: "Electronics" 
            },
            { 
                name: "Running Shoes", 
                price: 1200, 
                description: "Comfortable sports shoes for running", 
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", 
                category: "Fashion" 
            },
            { 
                name: "Digital Camera", 
                price: 45000, 
                description: "DSLR camera with 4k video recording", 
                image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80", 
                category: "Electronics" 
            },
            { 
                name: "Stylish Sunglasses", 
                price: 999, 
                description: "UV protection sunglasses", 
                image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80", 
                category: "Fashion" 
            }
        ];

        await Product.insertMany(dummyProducts);
        res.json({ message: "New Products with Images added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. ORDER API
app.post('/api/orders', (req, res) => {
    // In real app, verify token here
    console.log("Order:", req.body);
    res.json({ success: true, message: "Order placed!" });
});

app.listen(5000, () => console.log(`Server running on port 5000`));