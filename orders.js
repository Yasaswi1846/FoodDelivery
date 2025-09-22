// orders.js - Display order history for the user
function loadOrderHistory() {
    const orderSection = document.getElementById('order-history');
    orderSection.innerHTML = `<h2>Your Order History</h2><div class="order-list"></div>`;
    fetchOrders().then(orders => {
        const list = orderSection.querySelector('.order-list');
        if (!orders.length) {
            list.innerHTML = '<p>No orders found.</p>';
            return;
        }
        orders.forEach(order => {
            const div = document.createElement('div');
            div.className = 'order-card';
            div.style = 'background:#fff;padding:1rem;margin-bottom:1rem;border-radius:12px;box-shadow:0 2px 8px rgba(255,110,48,0.08);';
            div.innerHTML = `
                <h4>Order #${order._id}</h4>
                <p>Restaurant: ${order.restaurantName}</p>
                <p>Total: ₹${order.total}</p>
                <p>Status: ${getStatusBadge(order.status)}</p>
                <ul style='list-style:none;padding:0;'>
                    ${order.items.map(item => `<li>${item.name} x ${item.qty}</li>`).join('')}
                </ul>
            `;
            list.appendChild(div);
        });
    });
async function fetchOrders() {
    // Replace with actual user ID or session
    const res = await fetch('http://localhost:5000/api/orders?userId=demo');
    return await res.json();
}

function getStatusBadge(status) {
    const colors = {
        pending: '#ffb347',
        preparing: '#ff6e30',
        on_the_way: '#3498db',
        delivered: '#2ecc71'
    };
    return `<span style="background:${colors[status]};color:#fff;padding:0.3rem 1rem;border-radius:8px;font-weight:500;">${status.replace('_', ' ').toUpperCase()}</span>`;
}
}

document.addEventListener('DOMContentLoaded', loadOrderHistory);