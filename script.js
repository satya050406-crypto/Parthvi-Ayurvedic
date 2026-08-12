/* =========================================================
   PAARTHVI AYURVEDA - ECOMMERCE & HOME LOGIC
========================================================= */

// Support Helpline Numbers
const STORE_HELPLINE_PRIMARY = "+919259760176"; 
const STORE_HELPLINE_SECONDARY = "+919354419950";
const STORE_HELPLINE_NUMBER = "+91 9259760176 / +91 9354419950"; 

// Complete Ayurvedic Multi-Category Catalog
const products = [
    // Health Care
    {
        id: 1,
        name: "Paarthvi Weight Loss Rasayana & Capsules",
        category: "Health Care",
        price: 2200,
        originalPrice: 2800,
        image: "assets/products/product-1.png",
        rating: 4.9,
        reviewsCount: 384,
        isFlagship: true,
        tag: "Best Seller",
        badge: "Top Choice",
        description: "Dual-action Vedic formula powered by Garcinia, Guggulu, Giloy & Triphala. Accelerates natural fat breakdown while building robust daily immunity."
    },
    {
        id: 101,
        name: "Paarthvi Immuno-Shakti Chyawanprash",
        category: "Health Care",
        price: 650,
        originalPrice: 850,
        image: "assets/cat_healthcare.png",
        rating: 4.9,
        reviewsCount: 210,
        isFlagship: false,
        tag: "Immunity",
        badge: "Pure Amla",
        description: "Ancient 48-herb classical Chyawanprash formulated with wild organic amla, Kashmiri saffron, and silver leaf for full-family vitality."
    },
    {
        id: 102,
        name: "Paarthvi Liv-Care Detox & Metabolism Syrup",
        category: "Health Care",
        price: 420,
        originalPrice: 550,
        image: "assets/cat_healthcare.png",
        rating: 4.8,
        reviewsCount: 142,
        isFlagship: false,
        tag: "Liver Care",
        badge: "Detox Formula",
        description: "Pure Bhumi Amla, Kalmegh, and Punarnava formulation to protect liver cells, eliminate toxic Ama, and stimulate healthy metabolic bile."
    },
    {
        id: 103,
        name: "Paarthvi Triphala Cleanse & Digestion Kwath",
        category: "Health Care",
        price: 380,
        originalPrice: 499,
        image: "assets/products/product-1.png",
        rating: 4.9,
        reviewsCount: 178,
        isFlagship: false,
        tag: "Digestion",
        badge: "Tri-Dosha",
        description: "Balanced Haritaki, Bibhitaki, and Amalaki trio. Regulates bowel movements, cures chronic acidity, and purifies the colon naturally."
    },
    {
        id: 104,
        name: "Paarthvi Giloy Tulsi Daily Immunity Drops",
        category: "Health Care",
        price: 299,
        originalPrice: 399,
        image: "assets/cat_healthcare.png",
        rating: 4.7,
        reviewsCount: 95,
        isFlagship: false,
        tag: "Immunity",
        badge: "Ayush 82",
        description: "Concentrated extract of Neem-Giloy stem and Rama Tulsi. Enhances platelet count and fortifies cellular defense against seasonal infections."
    },

    // Personal Care
    {
        id: 3,
        name: "Paarthvi Kumkumadi Ayurvedic Glow Tailam",
        category: "Personal Care",
        price: 999,
        originalPrice: 1350,
        image: "assets/products/product-3.png",
        rating: 4.8,
        reviewsCount: 167,
        isFlagship: false,
        tag: "Best Seller",
        badge: "Kashmiri Saffron",
        description: "Authentic Kashmiri saffron infused facial oil that enhances skin luminescence, reduces pigmentation, and deeply hydrates."
    },
    {
        id: 201,
        name: "Paarthvi Bhringraj & Amla Hair Growth Oil",
        category: "Personal Care",
        price: 649,
        originalPrice: 850,
        image: "assets/cat_personalcare.png",
        rating: 4.9,
        reviewsCount: 234,
        isFlagship: false,
        tag: "Hair Care",
        badge: "Kshir Pak Vidhi",
        description: "Cooked in pure goat milk and sesame oil with 16 potent hair herbs. Stops premature greying, controls severe hair fall, and triggers follicle growth."
    },
    {
        id: 202,
        name: "Paarthvi Neem & Tea Tree Purifying Face Wash",
        category: "Personal Care",
        price: 399,
        originalPrice: 499,
        image: "assets/cat_personalcare.png",
        rating: 4.8,
        reviewsCount: 118,
        isFlagship: false,
        tag: "Skin Cleanser",
        badge: "Sulphate Free",
        description: "Gentle soap-free Ayurvedic herbal cleanser that removes deep impurities, controls excess sebum, and clears active acne blemishes."
    },
    {
        id: 203,
        name: "Paarthvi Pure Aloe Radiance Hydrating Gel",
        category: "Personal Care",
        price: 349,
        originalPrice: 450,
        image: "assets/cat_personalcare.png",
        rating: 4.7,
        reviewsCount: 88,
        isFlagship: false,
        tag: "Moisturizer",
        badge: "99% Pure Gel",
        description: "Cold-extracted organic Aloe Vera enriched with Vitamin E. Soothes sunburns, calms inflammation, and locks in dewy all-day moisture."
    },
    {
        id: 204,
        name: "Paarthvi Herbal Scalp Therapy Shampoo",
        category: "Personal Care",
        price: 499,
        originalPrice: 650,
        image: "assets/cat_personalcare.png",
        rating: 4.8,
        reviewsCount: 145,
        isFlagship: false,
        tag: "Anti-Dandruff",
        badge: "Reetha Shikakai",
        description: "Natural saponin formula with Reetha, Shikakai, and Methi seed. Cleanses gently without stripping scalp natural moisture barrier."
    },

    // Medicine
    {
        id: 4,
        name: "Paarthvi Ashwagandha Pro Vitality Churna",
        category: "Medicine",
        price: 899,
        originalPrice: 1200,
        image: "assets/products/product-4.png",
        rating: 4.9,
        reviewsCount: 194,
        isFlagship: false,
        tag: "Vitality",
        badge: "KSM-66 Extract",
        description: "Organic KSM-66 Ashwagandha root powder to reduce cortisol, relieve anxiety, build physical strength, and promote restful deep sleep."
    },
    {
        id: 301,
        name: "Paarthvi Shuddha Guggulu Metabolic Tablets",
        category: "Medicine",
        price: 749,
        originalPrice: 950,
        image: "assets/cat_medicine.png",
        rating: 4.9,
        reviewsCount: 162,
        isFlagship: false,
        tag: "Lipid Support",
        badge: "Shodhita Resin",
        description: "Purified Commiphora mukul processed in Triphala decoction. Aids healthy cholesterol maintenance, clears blocked srotas, and burns deep tissue fat."
    },
    {
        id: 302,
        name: "Paarthvi Yograj Guggulu for Joint Comfort",
        category: "Medicine",
        price: 699,
        originalPrice: 899,
        image: "assets/cat_medicine.png",
        rating: 4.8,
        reviewsCount: 130,
        isFlagship: false,
        tag: "Joint Relief",
        badge: "Vata Balancing",
        description: "Classical Shastriya formulation of 27 herbs. Calms chronic Vata aggravation, relieves morning stiffness, and lubricates cartilage joints."
    },
    {
        id: 303,
        name: "Paarthvi Maha Sudarshan Antiviral Kwath",
        category: "Medicine",
        price: 450,
        originalPrice: 599,
        image: "assets/cat_medicine.png",
        rating: 4.8,
        reviewsCount: 84,
        isFlagship: false,
        tag: "Fever & Detox",
        badge: "54 Herb Blend",
        description: "Traditional bitter tonic that eliminates chronic systemic toxins, purifies the lymphatic bloodstream, and regulates normal body temperature."
    },
    {
        id: 304,
        name: "Paarthvi Brahmi Memory & Stress Relief Vati",
        category: "Medicine",
        price: 599,
        originalPrice: 750,
        image: "assets/cat_medicine.png",
        rating: 4.9,
        reviewsCount: 112,
        isFlagship: false,
        tag: "Brain Tonic",
        badge: "Medhya Rasayana",
        description: "Concentrated Bacopa monnieri and Shankhpushpi tablet to boost cognitive memory recall, mental focus, and calm nervous restlessness."
    },

    // Nutraceuticals
    {
        id: 2,
        name: "Paarthvi Pure Shilajit Gold Himalayan Resin",
        category: "Nutraceuticals",
        price: 1499,
        originalPrice: 1999,
        image: "assets/products/product-2.png",
        rating: 4.9,
        reviewsCount: 219,
        isFlagship: false,
        tag: "Best Seller",
        badge: "Grade-A Gold",
        description: "100% pure Himalayan Shilajit resin enriched with 80+ ionic minerals and fulvic acid for stamina, vitality, and cellular rejuvenation."
    },
    {
        id: 401,
        name: "Paarthvi Wild Forest Organic Raw Honey",
        category: "Nutraceuticals",
        price: 550,
        originalPrice: 720,
        image: "assets/cat_nutraceuticals.png",
        rating: 4.9,
        reviewsCount: 175,
        isFlagship: false,
        tag: "Superfood",
        badge: "Unpasteurized",
        description: "Unfiltered, unheated Himalayan wild bee honey packed with live pollen enzymes, rich amino acids, and high antioxidant potency."
    },
    {
        id: 402,
        name: "Paarthvi Organic Moringa Superfood Capsules",
        category: "Nutraceuticals",
        price: 699,
        originalPrice: 899,
        image: "assets/cat_nutraceuticals.png",
        rating: 4.8,
        reviewsCount: 96,
        isFlagship: false,
        tag: "Daily Greens",
        badge: "Nutrient Dense",
        description: "Rich green miracle leaf capsules containing 7x more Vitamin C than oranges and 4x more calcium than milk for non-stop daily stamina."
    },
    {
        id: 403,
        name: "Paarthvi Apple Cider Vinegar with Mother",
        category: "Nutraceuticals",
        price: 499,
        originalPrice: 650,
        image: "assets/cat_nutraceuticals.png",
        rating: 4.7,
        reviewsCount: 104,
        isFlagship: false,
        tag: "Weight & Gut",
        badge: "With Mother",
        description: "Raw fermented Himalayan apple vinegar with live probiotics, Garcinia, and ginger for appetite control and healthy gut microbiome."
    },
    {
        id: 404,
        name: "Paarthvi Golden Turmeric Curcumin 95%",
        category: "Nutraceuticals",
        price: 799,
        originalPrice: 999,
        image: "assets/cat_nutraceuticals.png",
        rating: 4.9,
        reviewsCount: 140,
        isFlagship: false,
        tag: "Antioxidant",
        badge: "95% Curcuminoids",
        description: "Standardized organic Lakadong turmeric extract with BioPerine black pepper for 2000% improved bio-absorption and cellular repair."
    },
    // Hawan Samagri
    {
        id: 601,
        name: "Paarthvi Sacred Vedic Hawan Samagri (51 Herbs)",
        category: "Hawan Samagri",
        price: 499,
        originalPrice: 699,
        image: "assets/cat_hawan.png",
        rating: 4.9,
        reviewsCount: 188,
        isFlagship: false,
        tag: "Best Seller",
        badge: "51 Sacred Herbs",
        description: "Authentic Vedic blend of Jatamansi, Guggal, Loban, Nagarmotha, Kapoor Kachri, and Kamal Gatta for sacred environmental purification."
    },
    {
        id: 602,
        name: "Paarthvi Organic Guggal & Loban Dhoop Cups (24 Pcs)",
        category: "Hawan Samagri",
        price: 399,
        originalPrice: 549,
        image: "assets/cat_hawan.png",
        rating: 4.9,
        reviewsCount: 145,
        isFlagship: false,
        tag: "Dhoop Cups",
        badge: "Charcoal Free",
        description: "Ready-to-light natural cow dung sambrani cups filled with organic Guggal and fragrant Frankincense to cleanse negative energies."
    },
    {
        id: 603,
        name: "Paarthvi 100% Pure Bhimseni Camphor (250g)",
        category: "Hawan Samagri",
        price: 349,
        originalPrice: 450,
        image: "assets/cat_hawan.png",
        rating: 4.9,
        reviewsCount: 120,
        isFlagship: false,
        tag: "Pure Camphor",
        badge: "Edible Grade",
        description: "Original crystalline Bhimseni Kapoor that leaves zero residue upon burning. Produces sweet therapeutic medicinal aroma."
    },
    {
        id: 604,
        name: "Paarthvi Desi Cow Ghee Hawan Sticks (500g)",
        category: "Hawan Samagri",
        price: 299,
        originalPrice: 399,
        image: "assets/cat_hawan.png",
        rating: 4.8,
        reviewsCount: 88,
        isFlagship: false,
        tag: "Yajna Woods",
        badge: "A2 Cow Ghee",
        description: "Sacred Mango wood and Palash samidha dipped in pure Gir cow Vedic ghee for smokeless, divine Agnihotra rituals."
    },
    {
        id: 605,
        name: "Paarthvi Premium Sandalwood Hawan Wood Pack",
        category: "Hawan Samagri",
        price: 599,
        originalPrice: 799,
        image: "assets/cat_hawan.png",
        rating: 4.9,
        reviewsCount: 72,
        isFlagship: false,
        tag: "Chandan",
        badge: "Pure Chandan",
        description: "Natural fragrant red and white sandalwood billets for elevating yajna spiritual atmosphere and attracting prosperity."
    }
];

// Shopping Cart State (Persisted in localStorage)
let cart = [];
let wishlist = [];

try {
    const savedCart = localStorage.getItem("paarthvi_cart") || localStorage.getItem("parthvi_cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [{
            name: products[0].name,
            price: products[0].price,
            image: products[0].image,
            quantity: 1
        }];
        localStorage.setItem("paarthvi_cart", JSON.stringify(cart));
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
    const savedWishlist = localStorage.getItem("paarthvi_wishlist") || localStorage.getItem("parthvi_wishlist");
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
} catch (e) {}

function saveCart() {
    try {
        localStorage.setItem("paarthvi_cart", JSON.stringify(cart));
    } catch (e) {}
}

function saveWishlist() {
    try {
        localStorage.setItem("paarthvi_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
}

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initMobileMenu();
    initSearch();
    initCart();
    renderFeaturedProducts();
    initCategoryPageIfPresent();
    updateCartUI();
    updateWishlistUI();
});

function initCategoryPageIfPresent() {
    const grid = document.getElementById("categoryProductGrid");
    if (grid && grid.dataset.category) {
        renderCategoryPageProducts(grid.dataset.category, "ALL");
    }
}

function renderCategoryPageProducts(categoryName, filterType = "ALL") {
    const grid = document.getElementById("categoryProductGrid");
    if (!grid) return;

    let items = products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
    
    if (filterType === "BEST") {
        items = items.filter(p => p.tag === "Best Seller" || p.rating >= 4.9);
    } else if (filterType === "PRICE_LOW") {
        items = [...items].sort((a, b) => a.price - b.price);
    } else if (filterType === "PRICE_HIGH") {
        items = [...items].sort((a, b) => b.price - a.price);
    } else if (filterType === "RATING") {
        items = [...items].sort((a, b) => b.rating - a.rating);
    }

    grid.innerHTML = items.map(p => `
        <div class="cat-product-card">
            <span class="cat-product-badge">${p.badge || p.tag}</span>
            <button onclick="toggleWishlist(${p.id})" class="cat-product-wishlist-btn" title="Save to Wishlist" aria-label="Wishlist">
                <i class="${wishlist.includes(p.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}" style="${wishlist.includes(p.id) ? 'color:#E11D48;' : ''}"></i>
            </button>
            
            <div class="cat-product-img-wrap">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>

            <div>
                <div class="cat-product-rating">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    <span style="color:var(--text-muted); font-size:0.75rem; margin-left:4px;">(${p.reviewsCount})</span>
                </div>
                <h3 class="cat-product-title">${p.name}</h3>
                <p class="cat-product-desc">${p.description}</p>
                
                <div class="cat-product-price-row">
                    <span class="cat-price-current">₹${p.price.toLocaleString("en-IN")}</span>
                    <span class="cat-price-original">₹${p.originalPrice.toLocaleString("en-IN")}</span>
                    <span class="cat-price-save">Save ${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% Off</span>
                </div>
            </div>

            <div class="cat-product-actions">
                <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')" class="cat-btn-add">
                    <i class="fa-solid fa-cart-plus"></i> Add
                </button>
                <button onclick="instantBuyProduct(${p.id})" class="cat-btn-buy">
                    <i class="fa-solid fa-bolt"></i> Buy Now
                </button>
            </div>
        </div>
    `).join("");
}

function handleCategoryFilter(filterType, btnEl, categoryName) {
    document.querySelectorAll(".cat-filter-pill-btn").forEach(btn => btn.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
    renderCategoryPageProducts(categoryName, filterType);
}

function handleCategorySort(sortSelect, categoryName) {
    const sortVal = sortSelect.value;
    renderCategoryPageProducts(categoryName, sortVal);
}

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
    const map = {
        'Health Care': 'category-healthcare.html',
        'Personal Care': 'category-personalcare.html',
        'Medicine': 'category-medicine.html',
        'Nutraceuticals': 'category-nutraceuticals.html',
        'Hawan Samagri': 'category-hawan.html'
    };
    if (map[categoryName]) {
        window.location.href = map[categoryName];
    } else {
        window.location.href = "index.html#categories";
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
        showToast("Item added to Wishlist");
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
    showToast("Doctor Consultation & Prescription: Call/WhatsApp +91 9259760176 / +91 9354419950 | Email: contact@paarthviayurveda.com");
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

    // Pick top 4 products for homepage
    const homeFeatured = [products[0], products[5], products[10], products[15]];

    grid.innerHTML = homeFeatured.map(p => `
        <div class="featured-product-card">
            <span class="product-featured-tag">${p.badge || p.tag}</span>
            
            <div class="featured-product-img-wrap">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>

            <div style="flex: 1;">
                <div class="featured-product-rating">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i> <span style="color: var(--text-muted); font-size: 0.75rem;">(${p.reviewsCount})</span>
                </div>
                <h3 class="featured-product-title">${p.name}</h3>
                
                <div class="featured-product-price-row">
                    <span class="featured-price-current">₹${p.price.toLocaleString("en-IN")}</span>
                    <span class="featured-price-original">₹${p.originalPrice.toLocaleString("en-IN")}</span>
                </div>
            </div>

            <div class="featured-product-btn-group">
                <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')" class="btn-add-bag" aria-label="Add to Bag">
                    <i class="fa-solid fa-cart-plus"></i> Add
                </button>
                <button onclick="instantBuyProduct(${p.id})" class="btn-quick-buy" title="Instant Buy (3-Step Checkout)">
                    <i class="fa-solid fa-bolt"></i> Buy Now
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
                searchResults.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">No remedies matching "${query}". Try searching 'Health Care', 'Shilajit', 'Kumkumadi', 'Hawan', or 'Ashwagandha'.</div>`;
            } else {
                searchResults.innerHTML = matched.map(p => `
                    <div onclick="instantBuyProduct(${p.id})" style="display:flex; align-items:center; gap:14px; padding:12px; border-bottom:1px solid var(--border-subtle); cursor:pointer; background:#FFFFFF; border-radius:8px; margin-bottom:8px;">
                        <img src="${p.image}" alt="${p.name}" style="width:50px; height:50px; object-fit:contain;">
                        <div style="flex:1;">
                            <strong style="color:var(--forest-deep); font-size:0.95rem;">${p.name}</strong>
                            <div style="color:var(--text-muted); font-size:0.75rem;">${p.category}</div>
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
    showToast(`Added ${name} to your Bag!`);
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
                    <div style="font-size: 2.2rem; color: var(--forest-emerald); margin-bottom: 12px;"><i class="fa-solid fa-bag-shopping"></i></div>
                    <strong style="color: var(--forest-deep); font-size: 1.05rem;">Your Bag is Empty</strong>
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