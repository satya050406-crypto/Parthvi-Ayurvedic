/* =========================================================
   PAARTHVI AYURVEDA — E-COMMERCE & CLIENT CONTROLLER
========================================================= */

// Support Helpline Numbers
const STORE_HELPLINE_PRIMARY = "+919259760176"; 
const STORE_HELPLINE_SECONDARY = "+919354419950";
const STORE_HELPLINE_NUMBER = "+91 9259760176 / +91 9354419950"; 
const STORE_EMAIL = "contact@paarthviayurveda.com";

// Complete Ayurvedic Multi-Category Catalog
const products = [
    // Health Care & Herbal Medicine
    {
        id: 1,
        name: "Paarthvi Veda Slim Shift (100g Powder + 60 Capsules Combo)",
        category: "Medicine",
        price: 1500,
        originalPrice: 2200,
        image: "assets/products/slim-shift.jpg",
        rating: 4.9,
        reviewsCount: 428,
        isFlagship: true,
        tag: "Main Flagship",
        badge: "Powder + Capsules Combo",
        description: "Authentic Paarthvi Veda dual-action weight management system combining 100g Slim Shift botanical metabolic powder and 60 herbal 500mg capsules for natural fat breakdown, gentle gut detox, and balanced all-day metabolic vitality."
    },
    {
        id: 101,
        name: "Paarthvi Ayurveda Chyawanprash Avaleha (500g)",
        category: "Health Care",
        price: 650,
        originalPrice: 850,
        image: "assets/products/chyawanprash.jpg",
        rating: 4.9,
        reviewsCount: 248,
        isFlagship: false,
        tag: "100% Natural",
        badge: "Strength & Immunity",
        description: "Authentic classical Paarthvi Ayurveda Chyawanprash Avaleha formulated with wild fresh Amla, raw honey, and 48 revitalizing Shastriya botanicals. Free from artificial preservatives for all-season family strength, stamina, and immunity."
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
        image: "assets/cat_healthcare.png",
        rating: 4.9,
        reviewsCount: 178,
        isFlagship: false,
        tag: "Digestion",
        badge: "Tri-Dosha",
        description: "Balanced Haritaki, Bibhitaki, and Amalaki trio. Regulates bowel movements, relieves chronic acidity, and purifies the colon naturally."
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
        badge: "Ayush Certified",
        description: "Concentrated extract of Neem-Giloy stem and Rama Tulsi. Enhances cellular defense against seasonal infections and supports vitality."
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
        description: "Cooked in pure goat milk and sesame oil with 16 potent hair herbs. Calms the scalp, controls hair fall, and nourishes roots."
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
        description: "Gentle soap-free Ayurvedic herbal cleanser that removes deep impurities, controls excess sebum, and clears active blemishes."
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
        description: "Cold-extracted organic Aloe Vera enriched with Vitamin E. Soothes sunburns, calms inflammation, and locks in dewy moisture."
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
        description: "Natural saponin formula with Reetha, Shikakai, and Methi seed. Cleanses gently without stripping the scalp's natural moisture barrier."
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
        description: "Organic KSM-66 Ashwagandha root powder to balance cortisol, relieve everyday stress, build physical stamina, and promote restful sleep."
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
        description: "Purified Commiphora mukul processed in Triphala decoction. Supports healthy metabolism, clears micro-channels, and aids balance."
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
        description: "Classical Shastriya formulation of 27 herbs. Calms aggravated Vata dosha, eases morning stiffness, and nourishes cartilage joints."
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
        description: "Traditional bitter tonic that eliminates systemic Ama, purifies bodily channels, and supports natural temperature balance."
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
        description: "Concentrated Bacopa monnieri and Shankhpushpi tablet to boost cognitive memory recall, mental focus, and calm nervous tension."
    },

    // Nutraceuticals
    {
        id: 2,
        name: "Paarthvi Veda Pure Himalayan Shilajit Resin",
        category: "Medicine",
        price: 1499,
        originalPrice: 1999,
        image: "assets/products/shilajit-resin.jpg",
        rating: 4.9,
        reviewsCount: 312,
        isFlagship: true,
        tag: "Vitality Blend",
        badge: "75% Fulvic Acid",
        description: "Pure Himalayan Shilajit resin fortified with Ashwagandha & Gokshura. Contains 75% fulvic acid power blend and 80+ ionic trace minerals for peak physical performance, virility, and cellular endurance."
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
        description: "Rich green miracle leaf capsules containing dense natural micronutrients, Vitamin C, and plant-based calcium for daily stamina."
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
        description: "Raw fermented Himalayan apple vinegar with live beneficial cultures, Garcinia, and ginger for healthy digestion and gut microbiome."
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
        description: "Standardized organic Lakadong turmeric extract with BioPerine black pepper for maximized bio-absorption and cellular vitality."
    },
    {
        id: 405,
        name: "Paarthvi Organic Yellow Moong Daal (1kg)",
        category: "Nutraceuticals",
        price: 220,
        originalPrice: 280,
        image: "assets/cat_nutraceuticals.png",
        rating: 4.9,
        reviewsCount: 142,
        isFlagship: false,
        tag: "Organic Food",
        badge: "Unpolished & Pure",
        description: "100% certified organic unpolished yellow moong daal. Naturally high in bioavailable plant protein, easy to digest, and free from pesticides."
    },
    {
        id: 406,
        name: "Paarthvi Sharbati Whole Wheat Atta (5kg)",
        category: "Nutraceuticals",
        price: 380,
        originalPrice: 460,
        image: "assets/cat_nutraceuticals.png",
        rating: 4.8,
        reviewsCount: 198,
        isFlagship: false,
        tag: "Organic Food",
        badge: "Stone Ground",
        description: "Premium Sehore Sharbati whole wheat grains stone-ground slowly to preserve natural bran fiber, nutrients, and sweet golden aroma."
    },
    {
        id: 407,
        name: "Paarthvi Pure Vedic A2 Bilona Cow Ghee (500ml)",
        category: "Nutraceuticals",
        price: 950,
        originalPrice: 1250,
        image: "assets/cat_nutraceuticals.png",
        rating: 4.9,
        reviewsCount: 265,
        isFlagship: false,
        tag: "Vedic Ghee",
        badge: "A2 Bilona Vidhi",
        description: "Handcrafted from curd of grass-fed indigenous Gir cows using the traditional Vedic bilona method. Rich in fat-soluble vitamins and aroma."
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
        description: "Ready-to-light natural sambrani cups filled with organic Guggal and fragrant Frankincense to cleanse space and create serene aroma."
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
        badge: "Zero Residue",
        description: "Original crystalline Bhimseni Kapoor that leaves zero residue upon burning. Produces a sweet therapeutic medicinal aroma."
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
        badge: "Vedic Ghee Dipped",
        description: "Sacred Mango wood and Palash samidha dipped in pure Vedic ghee for clean, fragrant, divine Agnihotra rituals."
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
        description: "Natural fragrant red and white sandalwood billets for elevating devotional atmosphere and sacred rituals."
    },

    // Paridhan (Traditional Ayurvedic Attire & Wellness Wear)
    {
        id: 701,
        name: "Paarthvi Organic Khadi Cotton Kurta Pajama Set",
        category: "Paridhan",
        price: 1899,
        originalPrice: 2499,
        image: "assets/cat_paridhan.png",
        rating: 4.9,
        reviewsCount: 64,
        isFlagship: false,
        tag: "Handloom",
        badge: "100% Khadi",
        description: "Hand-spun organic khadi cotton kurta pajama set dyed with herbal botanical extracts for breathable, meditative comfort."
    },
    {
        id: 702,
        name: "Paarthvi Ahimsa Silk Vedic Meditation Shawl",
        category: "Paridhan",
        price: 1499,
        originalPrice: 1999,
        image: "assets/cat_paridhan.png",
        rating: 4.9,
        reviewsCount: 88,
        isFlagship: false,
        tag: "Ahimsa Silk",
        badge: "Sacred Weave",
        description: "Cruelty-free handwoven Ahimsa silk shawl infused with calming sandalwood essence for morning pujas and meditation."
    },
    {
        id: 703,
        name: "Paarthvi Pure Herbal Linen Yoga Robe",
        category: "Paridhan",
        price: 2199,
        originalPrice: 2899,
        image: "assets/cat_paridhan.png",
        rating: 4.8,
        reviewsCount: 52,
        isFlagship: false,
        tag: "Ayurvedic Wear",
        badge: "Ayurvastra",
        description: "Ayurvastra organic linen robe treated with turmeric and neem herbs to soothe the skin and promote pranic vitality."
    }
];

// Shopping Cart & Wishlist State (Persisted in localStorage)
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
    initQuickView();
    initScrollAnimations();
    initAccordions();
    renderFeaturedProducts();
    initCategoryPageIfPresent();
    updateCartUI();
    updateWishlistUI();
});

/* =========================================================
   1. NAVBAR & SCROLL EFFECTS
========================================================= */
function initNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

function initMobileMenu() {
    const menuBtns = document.querySelectorAll("#menuBtn, #sideNavToggleBtn, .side-nav-toggle-btn, .mobile-menu-toggle, .open-side-nav");
    const mobileDrawer = document.getElementById("mobileNavDrawer") || document.getElementById("sideNavDrawer");
    const mobileOverlay = document.getElementById("mobileNavOverlay") || document.getElementById("sideNavOverlay");
    const closeMobileBtns = document.querySelectorAll("#closeMobileMenu, #closeSideNav, .side-nav-close-btn");

    const openMenu = (e) => {
        if (e) e.preventDefault();
        const drawer = document.getElementById("mobileNavDrawer") || document.getElementById("sideNavDrawer");
        const overlay = document.getElementById("mobileNavOverlay") || document.getElementById("sideNavOverlay");
        if (drawer) drawer.classList.add("active");
        if (overlay) overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeMenu = (e) => {
        if (e) e.preventDefault();
        const drawer = document.getElementById("mobileNavDrawer") || document.getElementById("sideNavDrawer");
        const overlay = document.getElementById("mobileNavOverlay") || document.getElementById("sideNavOverlay");
        if (drawer) drawer.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "";
    };

    menuBtns.forEach(btn => btn.addEventListener("click", openMenu));
    closeMobileBtns.forEach(btn => btn.addEventListener("click", closeMenu));
    if (mobileOverlay) mobileOverlay.addEventListener("click", closeMenu);

    document.querySelectorAll(".mobile-drawer-link, .side-nav-cat-item, .side-nav-contact-link, .side-nav-footer-wrap a").forEach(link => {
        link.addEventListener("click", () => {
            // Slight timeout so smooth navigation / hash scroll occurs
            setTimeout(closeMenu, 150);
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
        }
    });

    window.openSideNav = openMenu;
    window.closeSideNav = closeMenu;
}

window.openCartFromSideNav = function() {
    if (window.closeSideNav) window.closeSideNav();
    const cartOverlay = document.getElementById("cartOverlay");
    if (cartOverlay) {
        setTimeout(() => {
            cartOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }, 200);
    }
};

/* =========================================================
   2. CATEGORY DRAWER & FILTERING
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
        <div class="product-card fade-up-element">
            <span class="product-badge">${p.badge || p.tag}</span>
            <button onclick="toggleWishlist(${p.id})" class="product-wishlist-btn" title="Save to Wishlist" aria-label="Wishlist">
                <i class="${wishlist.includes(p.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}" style="${wishlist.includes(p.id) ? 'color:#C2410C;' : ''}"></i>
            </button>
            
            <div class="product-img-wrap" onclick="openProductQuickView(${p.id})" style="cursor: pointer;">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                <button class="product-quick-view-btn" onclick="event.stopPropagation(); openProductQuickView(${p.id});">
                    <i class="fa-regular fa-eye"></i> Quick View
                </button>
            </div>

            <div>
                <span class="product-category">${p.category}</span>
                <h3 class="product-title">${p.name}</h3>
                <p class="product-desc">${p.description}</p>
                
                <div class="product-rating">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    <span class="product-rating-count">(${p.reviewsCount})</span>
                </div>
                
                <div class="product-price-row">
                    <span class="price-current">₹${p.price.toLocaleString("en-IN")}</span>
                    <span class="price-original">₹${p.originalPrice.toLocaleString("en-IN")}</span>
                    <span class="price-discount-tag">${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF</span>
                </div>
            </div>

            <div class="product-btn-group">
                <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')" class="btn-card-add" aria-label="Add to Bag">
                    <i class="fa-solid fa-bag-shopping"></i> Add to Bag
                </button>
                <button onclick="instantBuyProduct(${p.id})" class="btn-card-buy" title="Instant Buy">
                    Buy Now →
                </button>
            </div>
        </div>
    `).join("");

    initScrollAnimations();
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
   3. FEATURED PRODUCTS RENDERING (HOMEPAGE)
========================================================= */
function renderFeaturedProducts() {
    const grid = document.getElementById("featuredProductsGrid");
    if (!grid) return;

    // Pick top 4 products for homepage
    const homeFeatured = [products[0], products[5], products[10], products[15]];

    grid.innerHTML = homeFeatured.map(p => `
        <div class="product-card fade-up-element">
            <span class="product-badge">${p.badge || p.tag}</span>
            <button onclick="toggleWishlist(${p.id})" class="product-wishlist-btn" title="Save to Wishlist" aria-label="Wishlist">
                <i class="${wishlist.includes(p.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}" style="${wishlist.includes(p.id) ? 'color:#C2410C;' : ''}"></i>
            </button>
            
            <div class="product-img-wrap" onclick="openProductQuickView(${p.id})" style="cursor: pointer;">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                <button class="product-quick-view-btn" onclick="event.stopPropagation(); openProductQuickView(${p.id});">
                    <i class="fa-regular fa-eye"></i> Quick View
                </button>
            </div>

            <div>
                <span class="product-category">${p.category}</span>
                <h3 class="product-title">${p.name}</h3>
                
                <div class="product-rating">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    <span class="product-rating-count">(${p.reviewsCount})</span>
                </div>
                
                <div class="product-price-row">
                    <span class="price-current">₹${p.price.toLocaleString("en-IN")}</span>
                    <span class="price-original">₹${p.originalPrice.toLocaleString("en-IN")}</span>
                    <span class="price-discount-tag">${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF</span>
                </div>
            </div>

            <div class="product-btn-group">
                <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')" class="btn-card-add" aria-label="Add to Bag">
                    <i class="fa-solid fa-bag-shopping"></i> Add
                </button>
                <button onclick="instantBuyProduct(${p.id})" class="btn-card-buy" title="Instant Buy">
                    Buy Now →
                </button>
            </div>
        </div>
    `).join("");

    initScrollAnimations();
}

/* =========================================================
   4. QUICK VIEW MODAL
========================================================= */
function initQuickView() {
    let modal = document.getElementById("quickViewModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "quickViewModal";
        modal.className = "modal-overlay";
        modal.innerHTML = `
            <div class="quick-view-box">
                <button id="closeQuickView" class="close-btn" style="position: absolute; top: 20px; right: 20px;" aria-label="Close Quick View">&times;</button>
                <div id="quickViewContent"></div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector("#closeQuickView").addEventListener("click", () => {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }
}

function openProductQuickView(productId) {
    const p = products.find(prod => prod.id === productId) || products[0];
    const modal = document.getElementById("quickViewModal");
    const content = document.getElementById("quickViewContent");

    if (!modal || !content) return;

    content.innerHTML = `
        <div class="quick-view-grid" style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 36px; align-items: center;">
            <div style="background:#FFFFFF; border-radius:12px; padding:24px; display:flex; align-items:center; justify-content:center; border:1px solid var(--border-subtle);">
                <img src="${p.image}" alt="${p.name}" style="max-height: 280px; object-fit: contain;">
            </div>
            <div>
                <span class="eyebrow">${p.category}</span>
                <h2 style="font-size:1.8rem; margin-bottom:10px; color:var(--forest-deep);">${p.name}</h2>
                <div class="product-rating" style="margin-bottom:14px;">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    <span class="product-rating-count">(${p.reviewsCount} Authentic Reviews)</span>
                </div>
                <div class="product-price-row" style="margin-bottom:16px;">
                    <span class="price-current" style="font-size:1.5rem;">₹${p.price.toLocaleString("en-IN")}</span>
                    <span class="price-original" style="font-size:1.05rem;">₹${p.originalPrice.toLocaleString("en-IN")}</span>
                    <span class="price-discount-tag">${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF</span>
                </div>
                <p style="font-size:0.92rem; color:var(--text-secondary); line-height:1.65; margin-bottom:24px;">${p.description}</p>
                <div style="display:flex; gap:12px;">
                    <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}'); document.getElementById('quickViewModal').classList.remove('active'); document.body.style.overflow='';" class="btn-primary" style="flex:1;">
                        <i class="fa-solid fa-bag-shopping"></i> Add to Bag
                    </button>
                    <button onclick="instantBuyProduct(${p.id})" class="btn-secondary" style="flex:1;">
                        Buy Now →
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

/* =========================================================
   5. WISHLIST & STORE ACTIONS
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
    renderFeaturedProducts();
    initCategoryPageIfPresent();
}

function updateWishlistUI() {
    const countEl = document.getElementById("wishlistCount");
    if (countEl) {
        countEl.textContent = wishlist.length;
    }
}

function showPrescriptionUpload() {
    showToast(`Doctor Consultation & Helpline: ${STORE_HELPLINE_NUMBER} | Email: ${STORE_EMAIL}`);
}


function instantBuyProduct(productId) {
    const p = products.find(prod => prod.id === productId) || products[0];
    if (p) {
        cart = [{ 
            name: p.name, 
            price: p.price, 
            originalPrice: p.originalPrice || Math.round(p.price * 1.3),
            image: p.image, 
            quantity: 1 
        }];
        saveCart();
        
        const savedUser = localStorage.getItem("paarthvi_user") || localStorage.getItem("parthvi_user") || sessionStorage.getItem("paarthvi_user");
        if (savedUser) {
            window.location.href = "checkout.html?step=2";
        } else {
            window.location.href = "checkout.html?step=1";
        }
    }
}

function openCheckout() {
    if (cart.length === 0 && products.length > 0) {
        addToCart(products[0].name, products[0].price, products[0].image);
    }
    const savedUser = localStorage.getItem("paarthvi_user") || localStorage.getItem("parthvi_user") || sessionStorage.getItem("paarthvi_user");
    if (savedUser) {
        window.location.href = "checkout.html?step=2";
    } else {
        window.location.href = "checkout.html?step=1";
    }
}

/* =========================================================
   6. LIVE SEARCH OVERLAY
========================================================= */
function initSearch() {
    const searchBtn = document.getElementById("searchBtn");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    if (!searchOverlay) return;

    const openSearchFn = () => {
        searchOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        setTimeout(() => searchInput && searchInput.focus(), 200);
    };

    const closeSearchFn = () => {
        searchOverlay.classList.remove("active");
        document.body.style.overflow = "";
    };

    if (searchBtn) searchBtn.addEventListener("click", openSearchFn);
    if (closeSearch) closeSearch.addEventListener("click", closeSearchFn);

    searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) closeSearchFn();
    });

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
                searchResults.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">No remedies matching "${query}". Try searching 'Health Care', 'Shilajit', 'Kumkumadi', or 'Ashwagandha'.</div>`;
            } else {
                searchResults.innerHTML = matched.map(p => `
                    <div onclick="instantBuyProduct(${p.id})" style="display:flex; align-items:center; gap:14px; padding:14px; border-bottom:1px solid var(--border-subtle); cursor:pointer; background:#FFFFFF; border-radius:8px; margin-bottom:8px; transition: transform 0.2s ease;">
                        <img src="${p.image}" alt="${p.name}" style="width:52px; height:52px; object-fit:contain; border-radius:4px; border:1px solid var(--border-subtle);">
                        <div style="flex:1;">
                            <strong style="color:var(--forest-deep); font-size:0.95rem;">${p.name}</strong>
                            <div style="color:var(--sage); font-size:0.75rem; text-transform:uppercase; font-weight:600;">${p.category}</div>
                            <div style="color:var(--forest-deep); font-weight:700; font-size:0.92rem;">₹${p.price.toLocaleString("en-IN")}</div>
                        </div>
                        <span class="btn-secondary" style="padding:6px 14px; font-size:0.75rem;">View & Buy →</span>
                    </div>
                `).join("");
            }
        });
    }
}

/* =========================================================
   7. SHOPPING CART DRAWER ("YOUR RITUAL BAG")
========================================================= */
function initCart() {
    const cartBtn = document.getElementById("cartBtn");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");

    const openCart = () => {
        if (cartOverlay) cartOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeCartFn = () => {
        if (cartOverlay) cartOverlay.classList.remove("active");
        document.body.style.overflow = "";
    };

    if (cartBtn && cartOverlay) {
        cartBtn.addEventListener("click", openCart);
    }

    if (closeCart && cartOverlay) {
        closeCart.addEventListener("click", closeCartFn);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener("click", (e) => {
            if (e.target === cartOverlay) closeCartFn();
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
    showToast(`Added ${name} to your Ritual Bag!`);

    // Auto-open cart drawer
    const cartOverlay = document.getElementById("cartOverlay");
    if (cartOverlay) {
        cartOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
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
    const countEls = document.querySelectorAll("#cartCount, #cartBadge, #sideNavBadgeCount");
    const wishlistEls = document.querySelectorAll("#wishlistCount, #wishlistBadge");
    const itemsContainer = document.getElementById("cartItems");
    const subtotalEl = document.getElementById("cartSubtotal");
    const totalEl = document.getElementById("cartTotal");
    const sideNavCountEl = document.getElementById("sideNavCartCount");
    const sideNavTotalEl = document.getElementById("sideNavCartTotal");

    const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    countEls.forEach(el => el.textContent = totalCount);
    wishlistEls.forEach(el => el.textContent = wishlist.length);

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
    if (totalEl) totalEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;

    if (sideNavCountEl) {
        sideNavCountEl.textContent = `${totalCount} ${totalCount === 1 ? 'Item' : 'Items'}`;
    }
    if (sideNavTotalEl) {
        sideNavTotalEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
    }

    if (itemsContainer) {
        if (cart.length === 0) {
            itemsContainer.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <div style="font-size: 2.5rem; color: var(--sage); margin-bottom: 14px;"><i class="fa-solid fa-bag-shopping"></i></div>
                    <h3 style="color: var(--forest-deep); font-size: 1.25rem; margin-bottom: 6px;">Your Ritual Bag is Empty</h3>
                    <p style="font-size: 0.88rem; line-height: 1.6;">Add authentic Ayurvedic formulations to begin your wellness journey.</p>
                </div>
            `;
        } else {
            itemsContainer.innerHTML = cart.map((item, idx) => `
                <div class="cart-item-card">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString("en-IN")}</div>
                        <div class="cart-item-stepper">
                            <button onclick="updateCartQty(${idx}, -1)" class="cart-qty-btn" aria-label="Decrease quantity">-</button>
                            <span class="cart-qty-val">${item.quantity}</span>
                            <button onclick="updateCartQty(${idx}, 1)" class="cart-qty-btn" aria-label="Increase quantity">+</button>
                        </div>
                    </div>
                    <button onclick="updateCartQty(${idx}, -${item.quantity})" style="color:var(--text-muted); font-size:0.9rem; padding:6px;" title="Remove Item" aria-label="Remove Item">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            `).join("");
        }
    }
}

/* =========================================================
   8. ACCORDIONS (PRODUCT DETAIL PAGE)
========================================================= */
function initAccordions() {
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const wasActive = item.classList.contains("active");

            document.querySelectorAll(".accordion-item").forEach(other => {
                other.classList.remove("active");
            });

            if (!wasActive) {
                item.classList.add("active");
            }
        });
    });
}

/* =========================================================
   9. SCROLL FADE-UP ANIMATIONS (INTERSECTION OBSERVER)
========================================================= */
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll(".fade-up-element").forEach(el => el.classList.add("in-view"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".fade-up-element").forEach(el => observer.observe(el));
}

/* =========================================================
   10. MODAL POPUPS (LOCATION, ORDERS, WISHLIST, ACCOUNT)
========================================================= */
function openLocationModal() {
    const modal = document.getElementById("locationModalOverlay");
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeLocationModal() {
    const modal = document.getElementById("locationModalOverlay");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function checkPincodeAvailability() {
    const pin = document.getElementById("pincodeCheckInput")?.value.trim();
    const status = document.getElementById("pincodeStatus");
    if (!status) return;

    if (!pin || !/^[0-9]{6}$/.test(pin)) {
        status.style.color = "#C2410C";
        status.textContent = "Please enter a valid 6-digit Pincode.";
        return;
    }

    status.style.color = "#136B3E";
    status.innerHTML = `✓ Free Express Delivery available for Pincode ${pin}! Estimated dispatch: 24 Hours.`;
}

function openOrdersModal() {
    const modal = document.getElementById("ordersModalOverlay");
    const list = document.getElementById("ordersModalList");
    if (!modal) return;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    try {
        const orders = JSON.parse(localStorage.getItem("paarthvi_orders") || localStorage.getItem("parthvi_orders") || "[]");
        if (list) {
            if (orders.length === 0) {
                list.innerHTML = `
                    <div style="text-align: center; padding: 36px 16px; color: var(--text-muted);">
                        <i class="fa-solid fa-box-open" style="font-size: 2rem; color: var(--sage); margin-bottom: 8px;"></i>
                        <p>No recent orders found on this device.</p>
                        <a href="product.html" class="btn-primary" style="margin-top: 12px; display: inline-flex;">Shop Now →</a>
                    </div>
                `;
            } else {
                list.innerHTML = orders.map(ord => `
                    <div style="background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px 16px; margin-bottom: 10px; font-size: 0.88rem;">
                        <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--forest-deep); margin-bottom: 4px;">
                            <span>#${ord.orderId}</span>
                            <span style="color: #136B3E;">₹${ord.totalPayable.toLocaleString("en-IN")}</span>
                        </div>
                        <div style="color: var(--text-muted); font-size: 0.78rem;">${ord.productName} • ${ord.orderDate}</div>
                        <div style="margin-top: 6px; display: flex; justify-content: space-between; align-items: center;">
                            <span style="background: #EBF6EE; color: #136B3E; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">${ord.status}</span>
                            <span style="color: var(--text-muted); font-size: 0.76rem;">${ord.paymentMethod}</span>
                        </div>
                    </div>
                `).join("");
            }
        }
    } catch(e) {}
}

function closeOrdersModal() {
    const modal = document.getElementById("ordersModalOverlay");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function openWishlistModal() {
    const modal = document.getElementById("wishlistModalOverlay");
    const list = document.getElementById("wishlistModalList");
    if (!modal) return;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (list) {
        const wishProducts = products.filter(p => wishlist.includes(p.id));
        if (wishProducts.length === 0) {
            list.innerHTML = `
                <div style="text-align: center; padding: 36px 16px; color: var(--text-muted);">
                    <i class="fa-regular fa-heart" style="font-size: 2rem; color: #E65100; margin-bottom: 8px;"></i>
                    <p>Your saved wishlist is empty.</p>
                    <span style="font-size: 0.82rem;">Click the heart icon on any formulation to save it.</span>
                </div>
            `;
        } else {
            list.innerHTML = wishProducts.map(p => `
                <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 10px 14px; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="${p.image}" alt="${p.name}" style="width: 44px; height: 44px; object-fit: contain;">
                        <div>
                            <strong style="color: var(--forest-deep); font-size: 0.88rem; display: block;">${p.name}</strong>
                            <span style="color: #136B3E; font-weight: 700; font-size: 0.84rem;">₹${p.price.toLocaleString("en-IN")}</span>
                        </div>
                    </div>
                    <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}'); closeWishlistModal();" class="btn-card-add" style="padding: 6px 12px; font-size: 0.78rem;">
                        Add to Bag
                    </button>
                </div>
            `).join("");
        }
    }
}

function closeWishlistModal() {
    const modal = document.getElementById("wishlistModalOverlay");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function openAccountModal() {
    const modal = document.getElementById("accountModalOverlay");
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeAccountModal() {
    const modal = document.getElementById("accountModalOverlay");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function handleGoogleSignInDemo() {
    const user = {
        name: "Satya Prakash",
        email: "satya.ayurveda@gmail.com",
        avatar: "S"
    };
    localStorage.setItem("paarthvi_user", JSON.stringify(user));
    closeAccountModal();
    showToast(`Welcome back, ${user.name}!`);
}

/* =========================================================
   11. TOAST NOTIFICATION
========================================================= */
function showToast(msg) {
    let toast = document.getElementById("homeToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "homeToast";
        document.body.appendChild(toast);
    }

    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(14px)";
    }, 3200);
}