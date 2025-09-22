// admin.js - Admin Panel for restaurant management
async function fetchRestaurants() {
    const res = await fetch('http://localhost:5000/api/restaurants');
    return await res.json();
}

function renderAdminPanel() {
    const panel = document.getElementById('admin-panel');
    panel.innerHTML = `
        <h2>Admin Panel</h2>
        <div id="restaurant-admin">
            <h3>Restaurants</h3>
            <div id="restaurant-list"></div>
            <button id="add-restaurant-btn" style="margin-top:1rem;">Add Restaurant</button>
        </div>
        <div id="order-admin" style="margin-top:2rem;">
            <h3>Orders</h3>
            <div id="order-list">(Order management coming soon)</div>
        </div>
        <div id="add-restaurant-form" style="display:none;margin-top:2rem;background:#fff;padding:1rem;border-radius:12px;box-shadow:0 2px 8px rgba(255,110,48,0.08);">
            <h3>Add/Edit Restaurant</h3>
            <form id="restaurant-form">
                <input type="hidden" name="id">
                <label>Name: <input type="text" name="name" required></label><br><br>
                <label>Image URL: <input type="text" name="image" required></label><br><br>
                <label>Cuisine: <input type="text" name="cuisine" required></label><br><br>
                <label>Latitude: <input type="number" name="lat" step="any" required></label><br><br>
                <label>Longitude: <input type="number" name="lng" step="any" required></label><br><br>
                <button type="submit">Save</button>
                <button type="button" id="cancel-btn">Cancel</button>
            </form>
        </div>
    `;
    loadRestaurantAdmin();
    document.getElementById('add-restaurant-btn').onclick = showAddRestaurantForm;
}

async function loadRestaurantAdmin() {
    const list = document.getElementById('restaurant-list');
    const restaurants = await fetchRestaurants();
    list.innerHTML = '';
    restaurants.forEach(r => {
        const div = document.createElement('div');
        div.className = 'restaurant-card';
        div.innerHTML = `
            <h4>${r.name}</h4>
            <p>${r.cuisine}</p>
            <button onclick="editRestaurant('${r._id}')">Edit</button>
            <button onclick="deleteRestaurant('${r._id}')" style="margin-left:1rem;">Delete</button>
        `;
        list.appendChild(div);
    });
}

function showAddRestaurantForm() {
    document.getElementById('add-restaurant-form').style.display = 'block';
    document.getElementById('restaurant-form').reset();
    document.querySelector('#restaurant-form [name=id]').value = '';
}

window.editRestaurant = async function(id) {
    const restaurants = await fetchRestaurants();
    const r = restaurants.find(x => x._id === id);
    if (!r) return;
    document.getElementById('add-restaurant-form').style.display = 'block';
    const form = document.getElementById('restaurant-form');
    form.name.value = r.name;
    form.image.value = r.image;
    form.cuisine.value = r.cuisine;
    form.lat.value = r.location.lat;
    form.lng.value = r.location.lng;
    form.id.value = r._id;
}

window.deleteRestaurant = async function(id) {
    await fetch(`http://localhost:5000/api/restaurants/${id}`, { method: 'DELETE' });
    loadRestaurantAdmin();
}

document.addEventListener('DOMContentLoaded', () => {
    renderAdminPanel();
    document.getElementById('restaurant-form').onsubmit = async function(e) {
        e.preventDefault();
        const form = e.target;
        const data = {
            name: form.name.value,
            image: form.image.value,
            cuisine: form.cuisine.value,
            location: { lat: parseFloat(form.lat.value), lng: parseFloat(form.lng.value) }
        };
        const id = form.id.value;
        if (id) {
            await fetch(`http://localhost:5000/api/restaurants/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            await fetch('http://localhost:5000/api/restaurants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        document.getElementById('add-restaurant-form').style.display = 'none';
        loadRestaurantAdmin();
    };
    document.getElementById('cancel-btn').onclick = function() {
        document.getElementById('add-restaurant-form').style.display = 'none';
    };
});