let restaurants = [];

async function fetchRestaurants() {
  try {
    // Fetch restaurants from backend API
    const res = await fetch('http://localhost:5000/api/restaurants');
    
    // Check if response is OK
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    // Parse JSON data
    restaurants = await res.json();

    // Load restaurants into HTML
    loadRestaurants();

  } catch(err) {
    console.error("Error fetching restaurants:", err);
    // Show error message on page
    document.querySelector('.restaurant-list').innerHTML = 
      '<p class="text-center text-danger">Failed to load restaurants. Make sure backend is running.</p>';
  }
}

// Example loadRestaurants function to display cards
function loadRestaurants() {
  const list = document.querySelector('.restaurant-list');
  list.innerHTML = '';

  restaurants.forEach((r, idx) => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.innerHTML = `
      <img src="${r.image}" alt="${r.name}">
      <div class="info">
        <h3>${r.name}</h3>
        <p>${r.cuisine}</p>
        <button class="btn w-100 mt-2" onclick="showMenu(${idx})">View Menu</button>
      </div>
    `;

    col.appendChild(card);
    list.appendChild(col);
  });
}

// Call fetchRestaurants on page load
document.addEventListener('DOMContentLoaded', fetchRestaurants);
