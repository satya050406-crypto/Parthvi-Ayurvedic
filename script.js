/* =========================================================
   PARTHVI AYURVEDIC
   ECOMMERCE & CHECKOUT LOGIC
========================================================= */

// Support Helpline Number
const STORE_HELPLINE_NUMBER = "+919319468110"; 

// Flagship Botanical Ayurvedic Remedy Dataset (Single Medicine)
const products = [
    {
        id: 1,
        name: "Parthvi Slim & Immunity Rasayana",
        price: 2200,
        originalPrice: 2800,
        image: "assets/products/product-1.png",
        rating: 4.9,
        reviewsCount: 284,
        isFlagship: true,
        tag: "FLAGSHIP REMEDY",
        description: "Dual-action Vedic formula powered by Garcinia, Guggulu, Giloy & Triphala. Accelerates natural fat breakdown while building robust daily immunity.",
        benefits: ["Burns obstinate belly & visceral fat", "Strengthens WBC & immune defense", "Curbs stress-induced overeating", "Improves gut digestion & metabolism"],
        dosage: "1-2 spoons / tablets twice daily with lukewarm water 30 mins before meals."
    }
];

// Shopping Cart State (Persisted in localStorage)
let cart = [];
try {
    const savedCart = localStorage.getItem("parthvi_cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        // Default flagship remedy in bag
        cart = [{
            name: products[0].name,
            price: products[0].price,
            image: products[0].image,
            quantity: 1
        }];
        localStorage.setItem("parthvi_cart", JSON.stringify(cart));
    }
} catch (e) {
    cart = [{
        name: products[0].name,
        price: products[0].price,
        image: products[0].image,
        quantity: 1
    }];
}

// Save cart helper
function saveCart() {
    try {
        localStorage.setItem("parthvi_cart", JSON.stringify(cart));
    } catch (e) {}
}

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initMobileMenu();
    initSearch();
    initCart();
    renderCatalog();
    updateCartUI();
});

/* =========================================================
   NAVBAR & SCROLL EFFECTS
========================================================= */
function initNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

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
   PRODUCT RENDERING & INSTANT BUY FLOW
========================================================= */
function renderCatalog() {
    const catalogGrid = document.getElementById("catalogGrid");
    if (!catalogGrid) return;

    catalogGrid.innerHTML = products.map(p => `
        <article class="product-card">
            <div class="product-media">
                <span class="product-badge ${p.isFlagship ? 'flagship' : ''}">${p.tag}</span>
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div>
                    <span class="product-category-tag">100% AYUSH CERTIFIED</span>
                    <h3 class="product-title">${p.name}</h3>
                    <div style="display:flex; align-items:center; gap:6px; margin-bottom: 10px;">
                        <span class="star-rating">★ ★ ★ ★ ★</span>
                        <span class="rating-count">(${p.reviewsCount} Verified Reviews)</span>
                    </div>
                    <p class="product-card-desc">${p.description}</p>
                </div>
                <div class="product-card-bottom">
                    <div class="card-price-wrap">
                        <span class="card-price">₹${p.price}</span>
                        <span class="card-price-sub"><del>₹${p.originalPrice}</del> • Save ₹${p.originalPrice - p.price}</span>
                    </div>
                    <div class="card-btn-group">
                        <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')" class="card-add-btn" aria-label="Add to Bag">
                            + Add to Bag
                        </button>
                        <button onclick="instantBuyProduct(${p.id})" class="icon-btn" title="Buy Now" style="background: var(--forest-main); color: #FFFFFF;">
                            ⚡
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `).join("");
}

function instantBuyProduct(productId) {
    const p = products.find(prod => prod.id === productId) || products[0];
    if (p) {
        cart = [{ name: p.name, price: p.price, image: p.image, quantity: 1 }];
        saveCart();
        window.location.href = "checkout.html";
    }
}

function openCheckout() {
    if (cart.length === 0) {
        addToCart(products[0].name, products[0].price, products[0].image);
    }
    window.location.href = "checkout.html";
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

            const searchableKeywords = [
                "weight", "slim", "fat", "immunity", "rasayana", "garcinia",
                "guggulu", "giloy", "triphala", "metabolism", "detox", "belly",
                "digestion", "ayush", "herbal", "organic", "medicine", "remedy"
            ];

            const isMatch = searchableKeywords.some(kw => query.includes(kw) || kw.includes(query)) ||
                products.some(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));

            if (!isMatch) {
                searchResults.innerHTML = `<p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 15px;">No matching botanical remedy found for "${query}". Try searching "Weight Loss", "Immunity", or "Garcinia".</p>`;
                return;
            }

            const p = products[0];
            searchResults.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:space-between; padding: 14px 18px; background: var(--bg-sage-mist); border-radius: 10px; margin-bottom: 10px; border: 1px solid var(--sage-tint);">
                    <div style="display:flex; align-items:center; gap: 14px;">
                        <img src="${p.image}" alt="${p.name}" style="width: 54px; height: 54px; border-radius: 8px; object-fit: cover;">
                        <div>
                            <strong style="display:block; color: var(--forest-deep); font-size: 0.95rem;">${p.name}</strong>
                            <small style="color: var(--emerald-vibrant); font-weight: 600;">Flagship Ayurvedic Remedy • ₹${p.price}</small>
                        </div>
                    </div>
                    <button onclick="instantBuyProduct(1)" class="primary-btn" style="padding: 8px 16px; font-size: 0.8rem;">
                        Buy Now →
                    </button>
                </div>
            `;
        });
    }

    // Search Tag click handlers
    document.querySelectorAll(".search-tag-pill").forEach(pill => {
        pill.addEventListener("click", () => {
            const tag = pill.getAttribute("data-tag") || pill.textContent;
            if (searchInput) {
                searchInput.value = tag;
                searchInput.dispatchEvent(new Event("input"));
            }
        });
    });
}

/* =========================================================
   SHOPPING CART DRAWER
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

    // Close on backdrop click
    if (cartOverlay) {
        cartOverlay.addEventListener("click", (e) => {
            if (e.target === cartOverlay) {
                cartOverlay.classList.remove("active");
            }
        });
    }
}

function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    saveCart();
    updateCartUI();

    // Auto open cart drawer
    const cartOverlay = document.getElementById("cartOverlay");
    if (cartOverlay) cartOverlay.classList.add("active");
}

function adjustQuantity(name, change) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    saveCart();
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartCount) cartCount.textContent = totalCount;
    if (cartTotal) cartTotal.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                <div style="font-size: 3rem; margin-bottom: 16px;">🌿</div>
                <h3 style="font-size: 1.2rem; color: var(--forest-deep); margin-bottom: 8px;">Your Bag is Empty</h3>
                <p style="font-size: 0.9rem; margin-bottom: 24px;">Discover pure Ayurvedic remedy for healthy weight loss and vitality.</p>
                <button onclick="addToCart('${products[0].name}', ${products[0].price}, '${products[0].image}')" class="primary-btn" style="padding: 10px 20px; font-size: 0.88rem; margin: 0 auto;">
                    + Add Slim Medicine (₹2,200)
                </button>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item-row">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="cart-item-price">₹${item.price.toLocaleString("en-IN")}</div>
                <div class="cart-qty-ctrl">
                    <button onclick="adjustQuantity('${item.name}', -1)" class="qty-btn" aria-label="Decrease quantity">-</button>
                    <span style="font-size: 0.88rem; font-weight: 700; min-width: 18px; text-align: center;">${item.quantity}</span>
                    <button onclick="adjustQuantity('${item.name}', 1)" class="qty-btn" aria-label="Increase quantity">+</button>
                </div>
            </div>
            <strong style="color: var(--forest-deep); font-size: 0.95rem;">₹${(item.price * item.quantity).toLocaleString("en-IN")}</strong>
        </div>
    `).join("");
}