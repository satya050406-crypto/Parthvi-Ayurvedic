/* =========================================================
   PARTHVI AYURVEDIC
   COMPLETE ECOMMERCE LOGIC, DOSHA QUIZ & WHATSAPP CHECKOUT
========================================================= */

// Store Owner's WhatsApp Number
const STORE_WHATSAPP_NUMBER = "919319468110"; 

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
    if (savedCart) cart = JSON.parse(savedCart);
} catch (e) {
    cart = [];
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
    initCheckoutForm();
    initCategoryFilters();
    initDoshaQuiz();
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
   PRODUCT RENDERING
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
                        <button onclick="instantBuyProduct(${p.id})" class="icon-btn" title="Express Order" style="background: var(--bg-sage-mist); color: var(--forest-main);">
                            ⚡
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `).join("");
}

function initCategoryFilters() {
    // Graceful no-op when category filters are not in DOM
}

function instantBuyProduct(productId) {
    const p = products.find(prod => prod.id === productId) || products[0];
    if (p) {
        addToCart(p.name, p.price, p.image);
        openCheckout();
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
                    <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}'); searchOverlay.classList.remove('active');" class="primary-btn" style="padding: 8px 16px; font-size: 0.8rem;">
                        + Add
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
                <p style="font-size: 0.9rem; margin-bottom: 24px;">Discover pure Ayurvedic remedies to balance your Dosha and boost vitality.</p>
                <button onclick="document.getElementById('closeCart').click()" class="secondary-btn" style="padding: 10px 20px; font-size: 0.88rem;">
                    Explore Remedies →
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

/* =========================================================
   CHECKOUT MODAL & WHATSAPP ORDER PROCESSING
========================================================= */
function openCheckout() {
    if (cart.length === 0) {
        // Automatically add flagship product if cart is empty
        addToCart(products[0].name, products[0].price, products[0].image);
    }

    const cartOverlay = document.getElementById("cartOverlay");
    if (cartOverlay) cartOverlay.classList.remove("active");

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
    checkoutTotal.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;

    checkoutItems.innerHTML = cart.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.88rem; padding: 6px 0; color: var(--forest-deep);">
            <span>${item.name} × ${item.quantity}</span>
            <strong>₹${(item.price * item.quantity).toLocaleString("en-IN")}</strong>
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

            const name = document.getElementById("customerName")?.value.trim() || "";
            const phone = document.getElementById("customerPhone")?.value.trim() || "";
            const address = document.getElementById("customerAddress")?.value.trim() || "";
            const city = document.getElementById("customerCity")?.value.trim() || "";
            const state = document.getElementById("customerState")?.value.trim() || "";
            const pincode = document.getElementById("customerPincode")?.value.trim() || "";

            if (!name || !phone || !address || !city || !state || !pincode) {
                alert("Please complete all delivery details.");
                return;
            }

            const itemsSummary = cart.map(i => `• ${i.name} (Qty: ${i.quantity}) - ₹${i.price * i.quantity}`).join("%0A");
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Create formatted WhatsApp Message
            const message = 
`🌿 *NEW ORDER - PARTHVI AYURVEDIC*%0A` +
`==================================%0A` +
`*ORDER ITEMS:*%0A` +
`${itemsSummary}%0A%0A` +
`*TOTAL AMOUNT:* ₹${total.toLocaleString("en-IN")} (Free Express Shipping)%0A%0A` +
`*CUSTOMER INFORMATION:*%0A` +
`• Name: ${encodeURIComponent(name)}%0A` +
`• WhatsApp: ${encodeURIComponent(phone)}%0A%0A` +
`*DELIVERY ADDRESS:*%0A` +
`• Street: ${encodeURIComponent(address)}%0A` +
`• City: ${encodeURIComponent(city)}%0A` +
`• State: ${encodeURIComponent(state)}%0A` +
`• Pincode: ${encodeURIComponent(pincode)}%0A` +
`==================================%0A` +
`Please confirm my order & provide tracking details! 📦`;

            const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${message}`;

            closeCheckout();
            window.open(whatsappUrl, "_blank");
        });
    }
}

/* =========================================================
   INTERACTIVE AYURVEDIC DOSHA QUIZ
========================================================= */
const doshaQuestions = [
    {
        title: "1. What is your primary wellness or body goal?",
        options: [
            { text: "Burn obstinate fat, accelerate metabolism & reduce bloating", dosha: "kapha", product: 1 },
            { text: "Enhance skin radiance, eliminate pigmentation & purify toxins", dosha: "pitta", product: 2 },
            { text: "Stop hair thinning, nourish scalp & relieve stress/fatigue", dosha: "vata", product: 3 }
        ]
    },
    {
        title: "2. How would you describe your daily digestion & energy levels?",
        options: [
            { text: "Sluggish metabolism, heavy feeling after meals, low morning energy", dosha: "kapha" },
            { text: "Intense appetite, occasional acid reflux, high stress/heat", dosha: "pitta" },
            { text: "Irregular digestion, gas/bloating, fluctuating stamina & dry skin", dosha: "vata" }
        ]
    },
    {
        title: "3. What is your dominant skin / physical tendency?",
        options: [
            { text: "Heavy build, prone to water retention & stubborn weight", dosha: "kapha" },
            { text: "Warm/sensitive skin, prone to blemishes, breakouts & redness", dosha: "pitta" },
            { text: "Dry hair/skin, sensitive to cold winds, anxious sleep patterns", dosha: "vata" }
        ]
    }
];

let quizCurrentStep = 0;
let quizScores = { vata: 0, pitta: 0, kapha: 0 };

function initDoshaQuiz() {
    const quizTriggerBtns = document.querySelectorAll(".open-quiz-btn");
    const quizOverlay = document.getElementById("quizOverlay");
    const closeQuiz = document.getElementById("closeQuiz");

    quizTriggerBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            quizCurrentStep = 0;
            quizScores = { vata: 0, pitta: 0, kapha: 0 };
            if (quizOverlay) {
                quizOverlay.classList.add("active");
                renderQuizStep();
            }
        });
    });

    if (closeQuiz && quizOverlay) {
        closeQuiz.addEventListener("click", () => {
            quizOverlay.classList.remove("active");
        });
    }
}

function renderQuizStep() {
    const quizContainer = document.getElementById("quizContent");
    if (!quizContainer) return;

    if (quizCurrentStep >= doshaQuestions.length) {
        // Calculate Winner Dosha
        let dominantDosha = "kapha";
        if (quizScores.pitta > quizScores.kapha && quizScores.pitta >= quizScores.vata) dominantDosha = "pitta";
        if (quizScores.vata > quizScores.kapha && quizScores.vata > quizScores.pitta) dominantDosha = "vata";

        const recommendedProduct = products[0];
        let doshaTitle = "Kapha Prakriti (Earth & Water)";
        let doshaDesc = "Your body constitution tends towards slower lipid metabolism, sluggish digestion, and moisture retention. The wild Garcinia and Guggulu in Parthvi Slim Rasayana will stimulate digestive Agni, burn stubborn visceral fat, and restore daytime energy.";

        if (dominantDosha === "pitta") {
            doshaTitle = "Pitta Prakriti (Fire & Water)";
            doshaDesc = "Your constitution exhibits natural metabolic heat. The pure Giloy and Triphala in Parthvi Slim Rasayana cool internal systemic inflammation, detoxify Ama from the liver, and maintain balanced digestive harmony.";
        } else if (dominantDosha === "vata") {
            doshaTitle = "Vata Prakriti (Air & Space)";
            doshaDesc = "Your constitution requires grounding nourishment and consistent digestion. Parthvi Slim Rasayana stabilizes erratic appetite, curbs stress-induced binging, and strengthens daily immune resilience.";
        }

        quizContainer.innerHTML = `
            <div style="text-align: center; padding: 10px 0;">
                <span class="eyebrow gold">YOUR PERSONALIZED PRAKRITI DIAGNOSIS</span>
                <h3 style="font-size: 1.6rem; color: var(--forest-deep); margin: 10px 0;">Dominant Dosha: ${doshaTitle}</h3>
                <p style="color: var(--text-secondary); margin-bottom: 22px; font-size: 0.95rem; line-height: 1.6;">${doshaDesc}</p>
                
                <div style="background: var(--bg-sage-mist); padding: 20px; border-radius: 16px; border: 1.5px solid var(--sage-tint); margin-bottom: 24px; text-align: left; display: flex; gap: 18px; align-items: center;">
                    <img src="${recommendedProduct.image}" alt="${recommendedProduct.name}" style="width: 74px; height: 74px; border-radius: 12px; object-fit: cover;">
                    <div>
                        <span style="font-size: 0.72rem; font-weight: 700; color: var(--emerald-vibrant); text-transform: uppercase;">RECOMMENDED AYURVEDIC MEDICINE</span>
                        <h4 style="font-size: 1.1rem; color: var(--forest-deep); margin: 3px 0;">${recommendedProduct.name}</h4>
                        <div style="font-size: 1.05rem; font-weight: 700; color: var(--forest-deep);">₹${recommendedProduct.price} <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 400; text-decoration: line-through;">₹${recommendedProduct.originalPrice}</span></div>
                    </div>
                </div>

                <div style="display: flex; gap: 12px;">
                    <button onclick="addToCart('${recommendedProduct.name}', ${recommendedProduct.price}, '${recommendedProduct.image}'); document.getElementById('quizOverlay').classList.remove('active');" class="primary-btn" style="flex: 1; justify-content: center;">
                        Add to Bag & Order →
                    </button>
                </div>
            </div>
        `;
        return;
    }

    const q = doshaQuestions[quizCurrentStep];
    quizContainer.innerHTML = `
        <div style="padding: 10px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                <span class="eyebrow">QUESTION ${quizCurrentStep + 1} OF ${doshaQuestions.length}</span>
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${Math.round(((quizCurrentStep + 1) / doshaQuestions.length) * 100)}% Complete</span>
            </div>
            <h3 style="font-size: 1.35rem; color: var(--forest-deep); margin-bottom: 20px;">${q.title}</h3>
            <div>
                ${q.options.map((opt, idx) => `
                    <div class="quiz-option-card" onclick="selectQuizAnswer('${opt.dosha}')">
                        <div class="quiz-option-radio"></div>
                        <span style="font-size: 0.95rem; font-weight: 600; color: var(--forest-dark);">${opt.text}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
}

function selectQuizAnswer(dosha) {
    if (quizScores[dosha] !== undefined) {
        quizScores[dosha] += 1;
    }
    quizCurrentStep += 1;
    renderQuizStep();
}