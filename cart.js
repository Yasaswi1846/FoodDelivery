// cart.js - Display cart items and payment options
function loadCart() {
    const cartDetails = document.getElementById('cart-details');
    cartDetails.innerHTML = `
        <h2>Your Cart</h2>
        <div class="cart-items">
            <!-- Cart items will be dynamically loaded here -->
        </div>
        <div class="promo-section" style="margin-top:2rem;">
            <h3>Apply Promo Code</h3>
            <input type="text" id="promo-code" placeholder="Enter promo code" style="padding:0.5rem;border-radius:8px;border:1px solid #ffb34733;">
            <button id="apply-promo" style="margin-left:1rem;background:linear-gradient(90deg,#ff6e30 60%,#ffb347 100%);color:#fff;border:none;padding:0.5rem 1.5rem;border-radius:8px;cursor:pointer;">Apply</button>
            <div id="promo-message" style="margin-top:0.5rem;color:#2ecc71;"></div>
        </div>
        <div class="split-bills-section" style="margin-top:2rem;">
            <h3>Split Bills (Group Order)</h3>
            <label>
                <input type="checkbox" id="split-bills"> Enable split bills
            </label>
            <div id="split-details" style="display:none;margin-top:1rem;">
                <input type="number" id="split-count" min="2" max="10" placeholder="Number of people" style="padding:0.5rem;border-radius:8px;border:1px solid #ffb34733;width:150px;">
                <span id="split-info" style="margin-left:1rem;color:#3498db;"></span>
            </div>
        </div>
        <div class="schedule-section" style="margin-top:2rem;">
            <h3>Schedule Order</h3>
            <input type="datetime-local" id="schedule-time" style="padding:0.5rem;border-radius:8px;border:1px solid #ffb34733;">
            <span style="margin-left:1rem;color:#666;">(Leave blank for immediate delivery)</span>
        </div>
        <div class="payment-options" style="margin-top:2rem;">
            <h3>Choose Payment Method</h3>
            <label style="margin-right:2rem;">
                <input type="radio" name="payment" value="upi" checked> UPI
            </label>
            <label style="margin-right:2rem;">
                <input type="radio" name="payment" value="card"> Card
            </label>
            <label style="margin-right:2rem;">
                <input type="radio" name="payment" value="wallet"> Wallet
            </label>
            <label>
                <input type="radio" name="payment" value="cod"> Cash on Delivery
            </label>
        </div>
        <button class="checkout-btn" style="margin-top:2rem;">Checkout</button>
    `;
    document.getElementById('apply-promo').onclick = handlePromo;
    document.getElementById('split-bills').onchange = function(e) {
        document.getElementById('split-details').style.display = e.target.checked ? 'block' : 'none';
        document.getElementById('split-info').textContent = '';
    };
    document.getElementById('split-count').oninput = function(e) {
        const count = parseInt(e.target.value);
        if (count >= 2) {
            document.getElementById('split-info').textContent = `Each pays ₹${(1000/count).toFixed(2)} (demo)`;
        } else {
            document.getElementById('split-info').textContent = '';
        }
    };
    document.getElementById('apply-promo').onclick = handlePromo;
    // Add event listener for checkout
    document.querySelector('.checkout-btn').onclick = handleCheckout;
}

function handleCheckout() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    if (paymentMethod === 'upi') {
        alert('Proceeding to UPI payment...');
        // Integrate UPI payment gateway here
    } else if (paymentMethod === 'card') {
        alert('Proceeding to Card payment...');
        // Integrate card payment gateway here
    } else if (paymentMethod === 'wallet') {
        alert('Proceeding to Wallet payment...');
        // Integrate wallet payment gateway here
    } else {
        alert('Order placed with Cash on Delivery!');
        // Handle COD order logic here
    }
}

function handlePromo() {
    const code = document.getElementById('promo-code').value.trim();
    const message = document.getElementById('promo-message');
    // Simple demo: accept 'SAVE20' for 20% off
    if (code.toUpperCase() === 'SAVE20') {
        message.textContent = 'Promo applied! 20% discount.';
    } else if (code) {
        message.textContent = 'Invalid promo code.';
        message.style.color = '#ff6e30';
    } else {
        message.textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', loadCart);