let cart = {};
let statsAnimated = false;

/* ================= CART ================= */

function addToCart(name, price) {
    if (!cart[name]) {
        cart[name] = { price: price, qty: 0 };
    }
    cart[name].qty++;
    updateCart();
}

function removeItem(name) {
    delete cart[name];
    updateCart();
}

function clearCart() {
    cart = {};
    updateCart();
}

function updateCart() {
    const countEl = document.getElementById('cart-count');
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('total');

    if (!countEl || !itemsEl || !totalEl) return;

    let count = 0;
    let total = 0;

    itemsEl.innerHTML = "";

    for (let name in cart) {
        const item = cart[name];
        count += item.qty;
        total += item.price * item.qty;

        const li = document.createElement("li");
        li.innerHTML = `
            ${name} × ${item.qty} = ${item.price * item.qty} MDL
            <button onclick="removeItem('${name}')" style="margin-left:10px;">✕</button>
        `;
        itemsEl.appendChild(li);
    }
localStorage.setItem("cart", JSON.stringify(cart));

    countEl.textContent = count;
    totalEl.textContent = total;
}

/* ================= PROCENTE ================= */

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    const numbers = document.querySelectorAll('.number');
    const duration = 5000;

    numbers.forEach(num => {
        const target = +num.dataset.target;
        let start = 0;
        const step = target / (duration / 16);

        function update() {
            start += step;
            if (start < target) {
                num.textContent = Math.floor(start);
                requestAnimationFrame(update);
            } else {
                num.textContent = target;
            }
        }
        update();
    });
}

window.addEventListener('load', () => {
    updateCart();
    animateStats();
});
