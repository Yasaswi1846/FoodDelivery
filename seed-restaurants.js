// Run this script with: node seed-restaurants.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/swiggy_clone', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const menuItemSchema = new mongoose.Schema({
    name: String,
    price: Number
});

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

const sampleRestaurants = [
    {
        name: "Spice Villa",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
        cuisine: "Indian, Curry",
        location: { lat: 17.385044, lng: 78.486671 }, // Hyderabad
        menu: [
            { name: "Paneer Butter Masala", price: 220 },
            { name: "Chicken Biryani", price: 250 },
            { name: "Dal Tadka", price: 180 }
        ]
    },
    {
        name: "Tandoori House",
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80",
        cuisine: "Indian, Tandoori",
        location: { lat: 28.613939, lng: 77.209021 }, // Delhi
        menu: [
            { name: "Tandoori Chicken", price: 260 },
            { name: "Butter Naan", price: 40 },
            { name: "Veg Kebab", price: 150 }
        ]
    },
    {
        name: "South Spice",
        image: "https://images.unsplash.com/photo-1464306076886-debede6bbf09?auto=format&fit=crop&w=600&q=80",
        cuisine: "Indian, South Indian",
        location: { lat: 13.082680, lng: 80.270718 }, // Chennai
        menu: [
            { name: "Masala Dosa", price: 90 },
            { name: "Idli Sambar", price: 70 },
            { name: "Vada", price: 50 }
        ]
    }
];

async function seed() {
    await Restaurant.deleteMany({});
    await Restaurant.insertMany(sampleRestaurants);
    console.log('Sample restaurants seeded!');
    mongoose.disconnect();
}

seed();
