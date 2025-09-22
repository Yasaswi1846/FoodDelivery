// Add a new restaurant
app.post('/api/restaurants', async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(400).json({ error: 'Failed to add restaurant' });
    }
});

// Edit a restaurant
app.put('/api/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
        res.json(restaurant);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update restaurant' });
    }
});

// Delete a restaurant
app.delete('/api/restaurants/:id', async (req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.json({ message: 'Restaurant deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete restaurant' });
    }
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/swiggy_clone', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// User model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Menu Item model
const menuItemSchema = new mongoose.Schema({
    name: String,
    price: Number
});

// Restaurant model
const restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    cuisine: String,
    location: {
        lat: Number,
        lng: Number
    },
    menu: [menuItemSchema]
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);


// User signup
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Username already exists' });
    }
});

// User login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Get all restaurants
app.get('/api/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
});

// Get menu for a restaurant
app.get('/api/restaurants/:id/menu', async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(restaurant.menu);
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});