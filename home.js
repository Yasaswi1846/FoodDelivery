const foodItems = [
  {
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Classic Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Pasta Carbonara",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
   {
    name: "Caesar Salad",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
  } 
];

// --- Carousel ---
const carouselInner = document.getElementById("carousel-inner");
foodItems.forEach((item, index) => {
  const div = document.createElement("div");
  div.className = index === 0 ? "carousel-item active" : "carousel-item";
  div.innerHTML = `
    <img src="${item.image}" class="d-block w-100" alt="${item.name}">
    <div class="carousel-caption d-none d-md-block">
      <h5>${item.name}</h5>
    </div>
  `;
  carouselInner.appendChild(div);
});

// --- Food Cards ---
const gallery = document.getElementById("food-gallery");
foodItems.forEach(item => {
  const card = document.createElement("div");
  card.className = "col-md-3 mb-4 food-card"; // 4 cards per row
  card.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height:200px; object-fit:cover;">
      <div class="card-body text-center">
        <h5 class="card-title">${item.name}</h5>
      </div>
    </div>
  `;
  gallery.appendChild(card);
});