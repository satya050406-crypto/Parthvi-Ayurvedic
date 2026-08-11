/* =========================================================
   PARTHVI AYURVEDA - ECOMMERCE & HOME LOGIC
========================================================= */

// Support Helpline Number
const STORE_HELPLINE_NUMBER = "+919319468110"; 

// Ayurvedic Product Catalog
const products = [
    {
        id: 1,
        name: "Parthvi Weight Loss Rasayana & Capsules",
        category: "Health Care",
        price: 2200,
        originalPrice: 2800,
        image: "assets/products/product-1.png",
        rating: 4.9,
        reviewsCount: 384,
        isFlagship: true,
        tag: "Featured",
        description: "Dual-action Vedic formula powered by Garcinia, Guggulu, Giloy & Triphala. Accelerates natural fat breakdown while building robust daily immunity."
    },
    {
        id: 2,
        name: "Parthvi Pure Shilajit Gold Himalayan Resin",
        category: "Nutraceuticals",
        price: 1499,
        originalPrice: 1999,
        image: "assets/products/product-2.png",
        rating: 4.9,
        reviewsCount: 219,
        isFlagship: false,
        tag: "Featured",
        description: "100% pure Himalayan Shilajit resin enriched with 80+ ionic minerals and fulvic acid for stamina, vitality, and cellular rejuvenation."
    },
    {
        id: 3,
        name: "Parthvi Kumkumadi Ayurvedic Glow Tailam",
        category: "Personal Care",
        price: 999,
        originalPrice: 1350,
        image: "assets/products/product-3.png",
        rating: 4.8,
        reviewsCount: 167,
        isFlagship: false,
        tag: "Featured",
        description: "Authentic Kashmiri saffron infused facial oil that enhances skin luminescence, reduces pigmentation, and deeply hydrates."
    },
    {
        id: 4,
        name: "Parthvi Ashwagandha Pro Vitality Churna",
        category: "Medicine",
        price: 899,
        originalPrice: 1200,
        image: "assets/products/product-4.png",
        rating: 4.9,
        reviewsCount: 194,
        isFlagship: false,
        tag: "Featured",
        description: "Organic KSM-66 Ashwagandha root powder to reduce cortisol, relieve anxiety, and promote restful deep sleep."
    }
];

// Shopping Cart State (Persisted in localStorage)
let cart = [];
let wishlist = [];

try {
    const savedCart = localStorage.getItem("parthvi_cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
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

try {
    const savedWishlist = localStorage.getItem("parthvi_wishlist");
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
} catch (e) {}

function saveCart() {
    try {
        localStorage.setItem("parthvi_cart", JSON.stringify(cart));
    } catch (e) {}
}

function saveWishlist() {
    try {
        localStorage.setItem("parthvi_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
}

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initMobileMenu();
    initSearch();
    initCart();
    renderFeaturedProducts();
    updateCartUI();
    updateWishlistUI();
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
   CATEGORY DRAWER
========================================================= */
function toggleCategoryDrawer() {
    const drawer = document.getElementById("categoryDrawer");
    const overlay = document.getElementById("categoryDrawerOverlay");
    if (drawer && overlay) {
        drawer.classList.toggle("active");
        overlay.classList.toggle("active");
    }
}

function filterByCategory(categoryName) {
    toggleCategoryDrawer();
    showToast(`Exploring ${categoryName} Collection 🌿`);
    const featuredSec = document.getElementById("featuredSection");
    if (featuredSec) {
        featuredSec.scrollIntoView({ behavior: "smooth" });
    }
}

/* =========================================================
   WISHLIST & STORE ACTIONS
========================================================= */
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast("Item removed from Wishlist");
    } else {
        wishlist.push(productId);
        showToast("Item added to Wishlist ❤️");
    }
    saveWishlist();
    updateWishlistUI();
}

function updateWishlistUI() {
    const countEl = document.getElementById("wishlistCount");
    if (countEl) {
        countEl.textContent = wishlist.length;
    }
}

function showPrescriptionUpload() {
    showToast("📑 Doctor Consultation & Ayurvedic Prescription Desk: WhatsApp +91 93194 68110");
}

function openAccountModal() {
    // Navigate directly to Google Login / Checkout
    window.location.href = "checkout.html?step=1";
}

/* =========================================================
   FEATURED PRODUCT RENDERING
========================================================= */
function renderFeaturedProducts() {
    const grid = document.getElementById("featuredProductsGrid");
    if (!grid) return;

    grid.innerHTML = products.map(p => `
        <div class="featured-product-card">
            <span class="product-featured-tag">${p.tag}</span>
            
            <div class="featured-product-img-wrap">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>

            <div style="flex: 1;">
                <div class="featured-product-rating">
                    ★ ★ ★ ★ ★ <span style="color: var(--text-muted); font-size: 0.75rem;">(${p.reviewsCount})</span>
                </div>
                <h3 class="featured-product-title">${p.name}</h3>
                
                <div class="featured-product-price-row">
                    <span class="featured-price-current">₹${p.price.toLocaleString("en-IN")}</span>
                    <span class="featured-price-original">₹${p.originalPrice.toLocaleString("en-IN")}</span>
                </div>
            </div>

            <div class="featured-product-btn-group">
                <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')" class="btn-add-bag" aria-label="Add to Bag">
                    + Add
                </button>
                <button onclick="instantBuyProduct(${p.id})" class="btn-quick-buy" title="Instant Buy (3-Step Checkout)">
                    ⚡ Buy Now
                </button>
            </div>
        </div>
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
    const subNavSearchBtn = document.getElementById("subNavSearchBtn");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    if (!searchOverlay) return;

    const openSearchFn = () => {
        searchOverlay.classList.add("active");
        setTimeout(() => searchInput && searchInput.focus(), 200);
    };

    if (searchBtn) searchBtn.addEventListener("click", openSearchFn);
    if (subNavSearchBtn) subNavSearchBtn.addEventListener("click", openSearchFn);

    if (closeSearch) {
        closeSearch.addEventListener("click", () => {
            searchOverlay.classList.remove("active");
        });
    }

    if (searchInput && searchResults) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                searchResults.innerHTML = "";
                return;
            }

            const matched = products.filter(p => 
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );

            if (matched.length === 0) {
                searchResults.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">No remedies matching "${query}". Try searching 'Weight Loss', 'Shilajit', or 'Kumkumadi'.</div>`;
            } else {
                searchResults.innerHTML = matched.map(p => `
                    <div onclick="instantBuyProduct(${p.id})" style="display:flex; align-items:center; gap:14px; padding:12px; border-bottom:1px solid var(--border-subtle); cursor:pointer; background:#FFFFFF; border-radius:8px; margin-bottom:8px;">
                        <img src="${p.image}" alt="${p.name}" style="width:50px; height:50px; object-fit:contain;">
                        <div style="flex:1;">
                            <strong style="color:var(--forest-deep); font-size:0.95rem;">${p.name}</strong>
                            <div style="color:var(--emerald-vibrant); font-weight:700;">₹${p.price}</div>
                        </div>
                        <span class="primary-btn" style="padding:6px 14px; font-size:0.8rem;">Buy →</span>
                    </div>
                `).join("");
            }
        });
    }
}

/* =========================================================
   CART DRAWER & FUNCTIONALITY
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

function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    showToast(`Added ${name} to your Bag! 🛍️`);
}

function updateCartQty(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        updateCartUI();
    }
}

function updateCartUI() {
    const countEl = document.getElementById("cartCount");
    const itemsContainer = document.getElementById("cartItems");
    const subtotalEl = document.getElementById("cartSubtotal");

    const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    if (countEl) countEl.textContent = totalCount;
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;

    if (itemsContainer) {
        if (cart.length === 0) {
            itemsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                    <div style="font-size: 2.5rem; margin-bottom: 12px;">🌿</div>
                    <strong>Your Bag is Empty</strong>
                    <p style="font-size: 0.88rem; margin-top: 6px;">Add authentic Ayurvedic formulations to begin your wellness journey.</p>
                </div>
            `;
        } else {
            itemsContainer.innerHTML = cart.map((item, idx) => `
                <div class="cart-item-row" style="display:flex; gap:12px; align-items:center; padding:12px 0; border-bottom:1px solid var(--border-subtle);">
                    <img src="${item.image}" alt="${item.name}" style="width:60px; height:60px; object-fit:contain; border-radius:8px; border:1px solid var(--sage-tint); background:#FFFFFF;">
                    <div style="flex:1;">
                        <h4 style="font-size:0.9rem; color:var(--forest-deep); margin-bottom:4px;">${item.name}</h4>
                        <div style="color:var(--emerald-vibrant); font-weight:700; font-size:0.92rem;">₹${(item.price * item.quantity).toLocaleString("en-IN")}</div>
                        <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
                            <button onclick="updateCartQty(${idx}, -1)" style="width:22px; height:22px; border:1px solid var(--border-card); border-radius:4px; font-weight:bold; cursor:pointer;">-</button>
                            <span style="font-size:0.85rem; font-weight:700;">${item.quantity}</span>
                            <button onclick="updateCartQty(${idx}, 1)" style="width:22px; height:22px; border:1px solid var(--border-card); border-radius:4px; font-weight:bold; cursor:pointer;">+</button>
                        </div>
                    </div>
                </div>
            `).join("");
        }
    }
}

/* =========================================================
   TOAST NOTIFICATION
========================================================= */
function showToast(msg) {
    let toast = document.getElementById("homeToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "homeToast";
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #082116;
            color: #FFFFFF;
            padding: 12px 20px;
            border-radius: 24px;
            font-size: 0.88rem;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
            z-index: 100000;
            transition: all 0.3s ease;
            border-left: 4px solid #2FA368;
            opacity: 0;
            transform: translateY(10px);
        `;
        document.body.appendChild(toast);
    }

    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
    }, 3000);
}