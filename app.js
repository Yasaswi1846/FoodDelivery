
let restaurants = [];

async function fetchRestaurants() {
    const res = await fetch('http://localhost:5000/api/restaurants');
    restaurants = await res.json();
    loadRestaurants();
}

function loadRestaurants() {
    const list = document.querySelector('.restaurant-list');
    list.innerHTML = '';
    restaurants.forEach((r, idx) => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.innerHTML = `
            <img src="${r.image}" alt="${r.name}">
            <div class="info">
                <h3>${r.name}</h3>
                <p>${r.cuisine}</p>
                <button onclick="showMenu(${idx})">View Menu</button>
            </div>
        `;
        list.appendChild(card);
    });
}

function showMenu(idx) {
    const restaurant = restaurants[idx];
    fetch(`http://localhost:5000/api/restaurants/${restaurant._id}/menu`)
        .then(res => res.json())
        .then(menu => {
            let menuHtml = `<h3>Menu - ${restaurant.name}</h3><ul style='list-style:none;padding:0;'>`;
            menu.forEach(item => {
                menuHtml += `<li style='margin-bottom:10px;'>
                    <span style='font-weight:500;'>${item.name}</span> - ₹${item.price}
                </li>`;
            });
            menuHtml += '</ul>';
            const menuSection = document.createElement('div');
            menuSection.className = 'menu-popup';
            menuSection.style = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(255,110,48,0.12);padding:2rem;z-index:1000;max-width:350px;';
            menuSection.innerHTML = menuHtml + `<button onclick="this.parentElement.remove()" style="margin-top:1rem;background:linear-gradient(90deg,#ff6e30 60%,#ffb347 100%);color:#fff;border:none;padding:0.5rem 1.5rem;border-radius:8px;cursor:pointer;">Close</button>`;
            document.body.appendChild(menuSection);
        });
}
}

document.addEventListener('DOMContentLoaded', loadRestaurants);
document.addEventListener('DOMContentLoaded', function() {
    fetchRestaurants();
    const nearbyBtn = document.getElementById('find-nearby');
    if (nearbyBtn) {
        nearbyBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(pos) {
                    const userLat = pos.coords.latitude;
                    const userLng = pos.coords.longitude;
                    showNearbyRestaurants(userLat, userLng);
                }, function() {
                    alert('Location access denied.');
                });
            } else {
                alert('Geolocation not supported.');
            }
        });
    }
});

function showNearbyRestaurants(userLat, userLng) {
    const list = document.querySelector('.restaurant-list');
    list.innerHTML = '';
    // Show restaurants within 50km
    restaurants.forEach((r, idx) => {
        if (!r.location) return;
        const dist = getDistanceFromLatLonInKm(userLat, userLng, r.location.lat, r.location.lng);
        if (dist <= 50) {
            const card = document.createElement('div');
            card.className = 'restaurant-card';
            card.innerHTML = `
                <img src="${r.image}" alt="${r.name}">
                <div class="info">
                    <h3>${r.name}</h3>
                    <p>${r.cuisine}</p>
                    <p style='color:#ff6e30;font-weight:500;'>${dist.toFixed(1)} km away</p>
                    <button onclick="showMenu(${idx})">View Menu</button>
                </div>
            `;
            list.appendChild(card);
        }
    });
}

// Haversine formula to calculate distance between two lat/lng points
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lon2-lon1);
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI/180);
}
