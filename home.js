// home.js - Load and display restaurants beautifully
async function fetchRestaurants() {
    const res = await fetch('http://localhost:5000/api/restaurants');
    const restaurants = await res.json();
    const list = document.querySelector('.restaurant-list');
    list.innerHTML = '';
    restaurants.forEach(r => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.innerHTML = `
            <img src="${r.image}" alt="${r.name}" style="border-radius:12px 12px 0 0;">
            <div class="info">
                <h3 style="color:#ff6e30;">${r.name}</h3>
                <p style="color:#666;">${r.cuisine}</p>
                <button onclick="window.location.href='restaurant.html?id=${r._id}'" style="background:linear-gradient(90deg,#ff6e30 60%,#ffb347 100%);color:#fff;border:none;padding:0.7rem 1.5rem;border-radius:8px;cursor:pointer;margin-top:1rem;">View Menu</button>
            </div>
        `;
        card.style.boxShadow = "0 4px 24px rgba(255,110,48,0.12)";
        card.style.transition = "transform 0.2s";
        card.onmouseover = () => card.style.transform = "scale(1.03)";
        card.onmouseout = () => card.style.transform = "scale(1)";
        list.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', fetchRestaurants);