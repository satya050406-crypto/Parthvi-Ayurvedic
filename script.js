/* =========================================================
   PARTHVI AYURVEDIC
   SINGLE FLAGSHIP PRODUCT & WHATSAPP CHECKOUT LOGIC
========================================================= */

// Store Owner's WhatsApp Number
const STORE_WHATSAPP_NUMBER = "919319468110"; 

// Single Product Dataset
const products = [
    {
        id: 1,
        name: "Parthvi Ayurvedic Slimming & Immunity Booster",
        price: 2200,
        category: "wellness",
        image: "assets/products/product-1.jpg",
        description: "Pure Ayurvedic formulation enriched with Vrikshamla (Garcinia), Guggulu, Giloy & Triphala to naturally accelerate metabolism, burn fat, and fortify immune health."
    }
];

// Shopping Cart State
let cart = [];

// DOM Elements Initialization
document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initMobileMenu();
    initSearch();
    initCart();
    initCheckoutForm();
});

/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */
function initNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

/* =========================================================
   MOBILE MENU TOGGLE
========================================================= */
function initMobileMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });

        document.querySelectorAll("#mobileMenu a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
            });
        });
    }
}

/* =========================================================
   LIVE SEARCH OVERLAY
========================================================= */
function initSearch() {
    const searchBtn = document.getElementById("searchBtn");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    if (!searchBtn || !searchOverlay) return;

    searchBtn.addEventListener("click", () => {
        searchOverlay.classList.add("active");
        setTimeout(() => searchInput && searchInput.focus(), 200);
    });

    if (closeSearch) {
        closeSearch.addEventListener("click", () => {
            searchOverlay.classList.remove("active");
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            searchOverlay.classList.remove("active");
        }
    });

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase().trim();
            if (!query) {
                searchResults.innerHTML = "";
                return;
            }

            const matches = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));

            if (matches.length === 0) {
                searchResults.innerHTML = `<p style="color: #fff; font-size: 0.95rem; margin-top: 15px;">No matching remedies found.</p>`;
                return;
            }

            searchResults.innerHTML = matches.map(p => `
                <div style="display:flex; align-items:center; justify-content:space-between; padding: 14px 18px; background: rgba(255,255,255,0.1); border-radius: 8px; margin-bottom: 10px; color: #fff;">
                    <div>
                        <strong style="display:block; color: #E2CA94;">${p.name}</strong>
                        <small style="color: rgba(255,255,255,0.7);">${p.description}</small>
                    </div>
                    <strong style="color: #fff; font-size: 1.1rem;">₹${p.price}</strong>
                </div>
            `).join("");
        });
    }
}

/* =========================================================
   CART DRAWER LOGIC
========================================================= */
function initCart() {
    const cartBtn = document.getElementById("cartBtn");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");

    if (cartBtn && cartOverlay) {
        cartBtn.addEventListener("click", () => {
            cartOverlay.classList.add("active");
        });
    }

    if (closeCart && cartOverlay) {
        closeCart.addEventListener("click", () => {
            cartOverlay.classList.remove("active");
        });
    }
}

// Add Item to Cart
function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    updateCartUI();

    // Auto open cart drawer
    const cartOverlay = document.getElementById("cartOverlay");
    if (cartOverlay) cartOverlay.classList.add("active");
}

// Adjust Item Quantity
function adjustQuantity(name, change) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    updateCartUI();
}

// Update Cart Display & Badge Count
function updateCartUI() {
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartCount) cartCount.textContent = totalCount;
    if (cartTotal) cartTotal.textContent = `₹${totalPrice}`;

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🌿</span>
                <p>Your bag is currently empty.</p>
                <small>Select our Weight Loss & Immunity Booster medicine.</small>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div style="display: flex; gap: 16px; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--paper-tint);">
            <img src="${item.image}" alt="${item.name}" style="width: 65px; height: 65px; object-fit: cover; border-radius: 8px;">
            <div style="flex-grow: 1;">
                <h4 style="font-size: 0.95rem; color: var(--forest-deep); font-weight: 600;">${item.name}</h4>
                <span style="font-size: 0.85rem; color: var(--gold-deep); font-weight: 700;">₹${item.price}</span>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
                    <button onclick="adjustQuantity('${item.name}', -1)" style="width: 24px; height: 24px; border: 1px solid var(--paper-tint); border-radius: 4px; font-weight: bold;">-</button>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.quantity}</span>
                    <button onclick="adjustQuantity('${item.name}', 1)" style="width: 24px; height: 24px; border: 1px solid var(--paper-tint); border-radius: 4px; font-weight: bold;">+</button>
                </div>
            </div>
        </div>
    `).join("");
}

/* =========================================================
   CHECKOUT MODAL & WHATSAPP ORDER PROCESSING
========================================================= */
function openCheckout() {
    if (cart.length === 0) {
        // If cart is empty, automatically add 1 unit of our flagship product
        addToCart(products[0].name, products[0].price, products[0].image);
    }

    // Close cart overlay if open
    const cartOverlay = document.getElementById("cartOverlay");
    if (cartOverlay) cartOverlay.classList.remove("active");

    // Open checkout overlay
    const checkoutOverlay = document.getElementById("checkoutOverlay");
    if (checkoutOverlay) {
        checkoutOverlay.classList.add("active");
        renderCheckoutSummary();
    }
}

function closeCheckout() {
    const checkoutOverlay = document.getElementById("checkoutOverlay");
    if (checkoutOverlay) checkoutOverlay.classList.remove("active");
}

function renderCheckoutSummary() {
    const checkoutItems = document.getElementById("checkoutItems");
    const checkoutTotal = document.getElementById("checkoutTotal");

    if (!checkoutItems || !checkoutTotal) return;

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = `₹${totalPrice}`;

    checkoutItems.innerHTML = cart.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; padding: 6px 0; color: var(--forest-deep);">
            <span>${item.name} (x${item.quantity})</span>
            <strong>₹${item.price * item.quantity}</strong>
        </div>
    `).join("");
}

function initCheckoutForm() {
    const checkoutForm = document.getElementById("checkoutForm");
    const closeCheckoutBtn = document.getElementById("closeCheckout");

    if (closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener("click", closeCheckout);
    }

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Extract customer details
            const name = document.getElementById("customerName").value.trim();
            const phone = document.getElementById("customerPhone").value.trim();
            const address = document.getElementById("customerAddress").value.trim();
            const city = document.getElementById("customerCity").value.trim();
            const state = document.getElementById("customerState").value.trim();
            const pincode = document.getElementById("customerPincode").value.trim();

            if (!name || !phone || !address || !city || !state || !pincode) {
                alert("Please fill in all delivery details before placing your order.");
                return;
            }

            const itemsSummary = cart.map(i => `• ${i.name} (x${i.quantity}) - ₹${i.price * i.quantity}`).join("%0A");
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Format WhatsApp Message
            const message = 
`*🛍️ NEW ORDER - PARTHVI AYURVEDIC*%0A` +
`----------------------------------%0A` +
`*ORDER DETAILS:*%0A` +
`${itemsSummary}%0A%0A` +
`*TOTAL AMOUNT:* ₹${total}%0A%0A` +
`*CUSTOMER DETAILS:*%0A` +
`• Name: ${encodeURIComponent(name)}%0A` +
`• Phone: ${encodeURIComponent(phone)}%0A%0A` +
`*DELIVERY ADDRESS:*%0A` +
`• Address: ${encodeURIComponent(address)}%0A` +
`• City: ${encodeURIComponent(city)}%0A` +
`• State: ${encodeURIComponent(state)}%0A` +
`• Pincode: ${encodeURIComponent(pincode)}%0A` +
`----------------------------------%0A` +
`Please confirm and dispatch my order!`;

            const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${message}`;

            // Close checkout modal & redirect to WhatsApp
            closeCheckout();
            window.open(whatsappUrl, "_blank");
        });
    }
}