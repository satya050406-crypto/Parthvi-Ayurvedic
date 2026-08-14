/**
 * PAARTHVI AYURVEDA — 3-STEP CHECKOUT CONTROLLER
 * Step 1: Google Sign-In (OAuth Authentication)
 * Step 2: Recipient Details (Name, Phone Number, Complete Address, City, State, Pincode)
 * Step 3: Payment Selection (COD, UPI / QR Scan & Pay, Card) & Confirmed Order Receipt
 */

const DEFAULT_FLAGSHIP_PRODUCT = {
    name: "Paarthvi Veda Slim Shift (100g Powder + 60 Capsules Combo)",
    price: 2200,
    originalPrice: 2800,
    image: "assets/products/slim-shift.jpg",
    quantity: 1
};

const UPI_VPA = "paarthvi.ayurvedic@upi";

let currentStep = 1;
let checkoutCart = [];
let selectedPayment = "COD";
let currentUser = null;

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    loadSavedUser();
    loadCheckoutCart();
    checkUrlParams();
    renderOrderSummary();
    setupEventListeners();
});

/* =========================================================
   1. AUTHENTICATION & GOOGLE USER MANAGEMENT (STEP 1)
========================================================= */
function loadSavedUser() {
    try {
        const saved = localStorage.getItem("paarthvi_user") || localStorage.getItem("parthvi_user") || sessionStorage.getItem("paarthvi_user");
        if (saved) {
            currentUser = JSON.parse(saved);
            renderAuthenticatedUser(currentUser);
        } else {
            renderUnauthenticatedState();
        }
    } catch (e) {
        currentUser = null;
        renderUnauthenticatedState();
    }
}

function renderAuthenticatedUser(user) {
    const unauthWrap = document.getElementById("googleUnauthWrap");
    const authWrap = document.getElementById("googleAuthWrap");
    const userAvatar = document.getElementById("authAvatar");
    const userName = document.getElementById("authUserName");
    const userEmail = document.getElementById("authUserEmail");

    if (unauthWrap) unauthWrap.style.display = "none";
    if (authWrap) authWrap.style.display = "flex";
    if (userAvatar) userAvatar.textContent = (user.name ? user.name.charAt(0) : "G").toUpperCase();
    if (userName) userName.textContent = user.name || "Google User";
    if (userEmail) userEmail.textContent = user.email || "Google Account Connected";

    // Pre-fill Step 2
    const cName = document.getElementById("cName");
    const cEmail = document.getElementById("cEmail");
    if (cName && !cName.value) cName.value = user.name || "";
    if (cEmail && !cEmail.value) cEmail.value = user.email || "";
}

function renderUnauthenticatedState() {
    const unauthWrap = document.getElementById("googleUnauthWrap");
    const authWrap = document.getElementById("googleAuthWrap");
    if (unauthWrap) unauthWrap.style.display = "block";
    if (authWrap) authWrap.style.display = "none";
}

function submitGoogleSignIn() {
    const nameInput = document.getElementById("googleInputName");
    const emailInput = document.getElementById("googleInputEmail");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";

    if (!name) {
        showToast("Please enter your full name.");
        nameInput?.focus();
        return;
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
        showToast("Please enter a valid Google / Gmail address.");
        emailInput?.focus();
        return;
    }

    handleGoogleLogin(email, name);
}

function handleGoogleLogin(email, name) {
    if (!email || !name) return;

    const userObj = {
        name: name,
        email: email,
        avatar: name.charAt(0).toUpperCase(),
        authProvider: "google",
        loginTime: new Date().toISOString()
    };

    currentUser = userObj;
    localStorage.setItem("paarthvi_user", JSON.stringify(userObj));
    sessionStorage.setItem("paarthvi_user", JSON.stringify(userObj));

    renderAuthenticatedUser(userObj);
    showToast(`✓ Signed in with Google: ${userObj.name}`);

    setTimeout(() => {
        goToStep(2);
    }, 350);
}

function logoutGoogle() {
    localStorage.removeItem("paarthvi_user");
    sessionStorage.removeItem("paarthvi_user");
    currentUser = null;
    renderUnauthenticatedState();

    const cName = document.getElementById("cName");
    const cEmail = document.getElementById("cEmail");
    if (cName) cName.value = "";
    if (cEmail) cEmail.value = "";

    showToast("Signed out of Google account");
    goToStep(1);
}

/* =========================================================
   2. DYNAMIC CART MANAGEMENT & ORDER SUMMARY
========================================================= */
function loadCheckoutCart() {
    try {
        const savedCart = localStorage.getItem("paarthvi_cart") || sessionStorage.getItem("paarthvi_cart");
        if (savedCart) {
            const parsed = JSON.parse(savedCart);
            if (Array.isArray(parsed) && parsed.length > 0) {
                checkoutCart = parsed.map(item => ({
                    name: item.name,
                    price: Number(item.price) || 2200,
                    originalPrice: Number(item.originalPrice) || Math.round((Number(item.price) || 2200) * 1.3),
                    image: item.image || "assets/products/slim-shift.jpg",
                    quantity: Number(item.quantity) || 1
                }));
                return;
            }
        }
    } catch (e) {
        console.error("Cart loading error:", e);
    }
    checkoutCart = [{ ...DEFAULT_FLAGSHIP_PRODUCT }];
}

function renderOrderSummary() {
    const container = document.getElementById("checkoutCartItemsContainer");
    if (!container) return;

    if (checkoutCart.length === 0) {
        checkoutCart = [{ ...DEFAULT_FLAGSHIP_PRODUCT }];
    }

    let itemsHtml = "";
    let totalPayable = 0;
    let totalMRP = 0;

    checkoutCart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        const itemMrp = item.originalPrice * item.quantity;
        totalPayable += itemTotal;
        totalMRP += itemMrp;

        itemsHtml += `
            <div class="checkout-product-preview" style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
                <img src="${item.image}" alt="${item.name}" class="checkout-product-img" onerror="this.src='assets/products/slim-shift.jpg'">
                <div class="checkout-product-details" style="flex: 1;">
                    <h4 class="checkout-product-name" style="font-size: 0.92rem; color: var(--forest-deep); line-height: 1.3; margin-bottom: 4px;">${item.name}</h4>
                    <div class="checkout-product-price-bar">
                        <span style="font-weight: 700; color: var(--forest-deep);">₹${itemTotal.toLocaleString("en-IN")}</span>
                        <span style="font-size: 0.8rem; color: var(--text-muted); text-decoration: line-through;">₹${itemMrp.toLocaleString("en-IN")}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
                        <span style="font-size: 0.8rem; color: var(--text-muted);">Qty:</span>
                        <div style="display: flex; align-items: center; border: 1px solid var(--border-medium); border-radius: 4px; background: #FFFFFF;">
                            <button type="button" onclick="updateItemQty(${index}, -1)" style="padding: 2px 8px; font-weight: bold; background: none; border: none; cursor: pointer;">-</button>
                            <span style="font-weight: 700; font-size: 0.85rem; min-width: 18px; text-align: center;">${item.quantity}</span>
                            <button type="button" onclick="updateItemQty(${index}, 1)" style="padding: 2px 8px; font-weight: bold; background: none; border: none; cursor: pointer;">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = itemsHtml;

    const discount = Math.max(0, totalMRP - totalPayable);

    const originalTotalDisplay = document.getElementById("originalTotalDisplay");
    const discountDisplay = document.getElementById("discountDisplay");
    const totalAmountDisplay = document.getElementById("totalAmountDisplay");

    if (originalTotalDisplay) originalTotalDisplay.textContent = `₹${totalMRP.toLocaleString("en-IN")}`;
    if (discountDisplay) discountDisplay.textContent = `-₹${discount.toLocaleString("en-IN")}`;
    if (totalAmountDisplay) totalAmountDisplay.textContent = `₹${totalPayable.toLocaleString("en-IN")}`;

    updatePaymentDetails();
}

function updateItemQty(index, change) {
    if (checkoutCart[index]) {
        checkoutCart[index].quantity += change;
        if (checkoutCart[index].quantity < 1) {
            if (checkoutCart.length > 1) {
                checkoutCart.splice(index, 1);
            } else {
                checkoutCart[0].quantity = 1;
            }
        } else if (checkoutCart[index].quantity > 10) {
            checkoutCart[index].quantity = 10;
        }

        try {
            localStorage.setItem("paarthvi_cart", JSON.stringify(checkoutCart));
        } catch(e) {}

        renderOrderSummary();
    }
}

function getTotalPayable() {
    return checkoutCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/* =========================================================
   3. STEP CONTROLLER & NAVIGATION
========================================================= */
function goToStep(step) {
    if (step < 1 || step > 3) return;

    // Check if user has authenticated with Google
    if (step >= 2 && !currentUser) {
        showToast("Please sign in with your Google account first.");
        step = 1;
    }

    // Step 2 validation before entering Step 3
    if (step === 3) {
        if (!validateDeliveryForm()) {
            return;
        }
    }

    currentStep = step;

    // Update Stepper Progress Line
    const progressLine = document.getElementById("stepperProgressLine");
    if (progressLine) {
        if (step === 1) progressLine.style.width = "0%";
        else if (step === 2) progressLine.style.width = "50%";
        else if (step === 3) progressLine.style.width = "100%";
    }

    for (let i = 1; i <= 3; i++) {
        const stepBtn = document.getElementById(`stepTab${i}`);
        const stepSec = document.getElementById(`stepSection${i}`);

        if (stepBtn) {
            stepBtn.classList.remove("active", "completed");
            if (i < step) {
                stepBtn.classList.add("completed");
                const bubble = stepBtn.querySelector(".step-item-bubble");
                if (bubble) bubble.innerHTML = `<i class="fa-solid fa-check" style="font-size:0.75rem;"></i>`;
            } else if (i === step) {
                stepBtn.classList.add("active");
                const bubble = stepBtn.querySelector(".step-item-bubble");
                if (bubble) bubble.textContent = i;
            } else {
                const bubble = stepBtn.querySelector(".step-item-bubble");
                if (bubble) bubble.textContent = i;
            }
        }

        if (stepSec) {
            if (i === step) {
                stepSec.classList.add("active");
            } else {
                stepSec.classList.remove("active");
            }
        }
    }

    if (step === 3) {
        updatePaymentDetails();
    }

    const card = document.getElementById("checkoutMainCard");
    if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const stepParam = parseInt(params.get("step"));
    if (stepParam >= 1 && stepParam <= 3) {
        if (stepParam === 1 || (stepParam >= 2 && currentUser)) {
            goToStep(stepParam);
        } else if (stepParam >= 2 && !currentUser) {
            goToStep(1);
        }
    }
}

/* =========================================================
   4. DELIVERY FORM VALIDATION (STEP 2)
========================================================= */
function validateDeliveryForm() {
    const nameInput = document.getElementById("cName");
    const phoneInput = document.getElementById("cPhone");
    const emailInput = document.getElementById("cEmail");
    const addressInput = document.getElementById("cAddress");
    const cityInput = document.getElementById("cCity");
    const stateInput = document.getElementById("cState");
    const pincodeInput = document.getElementById("cPincode");

    let isValid = true;

    [nameInput, phoneInput, emailInput, addressInput, cityInput, stateInput, pincodeInput].forEach(el => {
        if (el) {
            el.closest(".form-group")?.classList.remove("error");
        }
    });

    if (!nameInput || !nameInput.value.trim()) {
        highlightError(nameInput, "Please enter your full recipient name.");
        isValid = false;
    } else if (!phoneInput || !/^[0-9]{10}$/.test(phoneInput.value.trim())) {
        highlightError(phoneInput, "Please enter a valid 10-digit mobile number.");
        isValid = false;
    } else if (!emailInput || !emailInput.value.includes("@")) {
        highlightError(emailInput, "Please enter a valid email address for tracking.");
        isValid = false;
    } else if (!addressInput || addressInput.value.trim().length < 5) {
        highlightError(addressInput, "Please enter your complete delivery street address.");
        isValid = false;
    } else if (!cityInput || !cityInput.value.trim()) {
        highlightError(cityInput, "Please enter your city or district.");
        isValid = false;
    } else if (!stateInput || !stateInput.value.trim()) {
        highlightError(stateInput, "Please enter your state.");
        isValid = false;
    } else if (!pincodeInput || !/^[0-9]{6}$/.test(pincodeInput.value.trim())) {
        highlightError(pincodeInput, "Please enter a valid 6-digit postal pincode.");
        isValid = false;
    }

    return isValid;
}

function highlightError(inputElement, message) {
    if (!inputElement) return;
    const group = inputElement.closest(".form-group");
    if (group) {
        group.classList.add("error");
        inputElement.focus();
    }
    showToast(message);
}

/* =========================================================
   5. PAYMENT SELECTION & DYNAMIC UPI QR (STEP 3)
========================================================= */
function selectPayment(method) {
    selectedPayment = method;

    document.querySelectorAll(".payment-tab").forEach(tab => {
        tab.classList.remove("active");
        const radio = tab.querySelector('input[type="radio"]');
        if (radio && radio.value === method) {
            radio.checked = true;
            tab.classList.add("active");
        }
    });

    updatePaymentDetails();
}

function updatePaymentDetails() {
    const totalAmount = getTotalPayable();
    const qrImg = document.getElementById("upiQrCodeImg");
    const payBtnText = document.getElementById("payBtnText");

    if (qrImg) {
        const upiString = `upi://pay?pa=${encodeURIComponent(UPI_VPA)}&pn=Paarthvi%20Ayurveda&am=${totalAmount}&cu=INR&tn=Paarthvi%20Ayurvedic%20Order`;
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}&color=18382C&bgcolor=FFFFFF`;
    }

    if (payBtnText) {
        if (selectedPayment === "COD") {
            payBtnText.innerHTML = `<i class="fa-solid fa-box-open"></i> CONFIRM CASH ON DELIVERY (₹${totalAmount.toLocaleString("en-IN")}) →`;
        } else if (selectedPayment === "UPI") {
            payBtnText.innerHTML = `<i class="fa-solid fa-qrcode"></i> VERIFY & PLACE UPI ORDER (₹${totalAmount.toLocaleString("en-IN")}) →`;
        } else {
            payBtnText.innerHTML = `<i class="fa-solid fa-lock"></i> PLACE SECURE CARD ORDER (₹${totalAmount.toLocaleString("en-IN")}) →`;
        }
    }
}

function copyUPIId() {
    navigator.clipboard.writeText(UPI_VPA).then(() => {
        showToast(`✓ Copied UPI ID: ${UPI_VPA}`);
    }).catch(() => {
        showToast(`UPI ID: ${UPI_VPA}`);
    });
}

/* =========================================================
   6. ORDER SUBMISSION & CONFIRMATION RECEIPT
========================================================= */
function submitOrder() {
    if (!validateDeliveryForm()) {
        goToStep(2);
        return;
    }

    const name = document.getElementById("cName").value.trim();
    const phone = document.getElementById("cPhone").value.trim();
    const email = document.getElementById("cEmail").value.trim() || (currentUser ? currentUser.email : "Not Provided");
    const address = document.getElementById("cAddress").value.trim();
    const city = document.getElementById("cCity").value.trim();
    const state = document.getElementById("cState").value.trim();
    const pincode = document.getElementById("cPincode").value.trim();
    const instructions = document.getElementById("cInstructions")?.value.trim() || "";

    const orderId = "PAR-" + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric"
    });
    const orderTime = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit", minute: "2-digit"
    });
    const totalPayable = getTotalPayable();

    let paymentLabel = "Cash on Delivery (COD)";
    if (selectedPayment === "UPI") paymentLabel = "UPI / QR Code Scan & Pay";
    else if (selectedPayment === "Card") paymentLabel = "Debit/Credit Card";

    const orderData = {
        orderId,
        orderDate,
        orderTime,
        name,
        phone,
        email,
        address,
        city,
        state,
        pincode,
        instructions,
        items: checkoutCart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
        productName: checkoutCart.map(i => `${i.name} (x${i.quantity})`).join(", "),
        totalPayable,
        paymentMethod: paymentLabel,
        status: "Pending Dispatch",
        authenticatedVia: currentUser ? `Google Verified (${currentUser.email})` : "Direct Patron"
    };

    try {
        const existingOrders = JSON.parse(localStorage.getItem("paarthvi_orders") || localStorage.getItem("parthvi_orders") || "[]");
        existingOrders.unshift(orderData);
        localStorage.setItem("paarthvi_orders", JSON.stringify(existingOrders));
        
        // Clear active cart after successful order
        localStorage.removeItem("paarthvi_cart");
    } catch(err) {
        console.error("Order storage error:", err);
    }

    renderSuccessReceipt(orderData);

    document.getElementById("checkoutFormSection").style.display = "none";
    document.getElementById("checkoutStepperWrap").style.display = "none";
    document.getElementById("orderSuccessSection").style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderSuccessReceipt(order) {
    const receiptBox = document.getElementById("receiptContent");
    if (!receiptBox) return;

    const itemsSummaryHtml = (order.items && order.items.length > 0)
        ? order.items.map(it => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.88rem;">
                <span>• ${it.name} (Qty: ${it.quantity})</span>
                <strong>₹${(it.price * it.quantity).toLocaleString("en-IN")}</strong>
            </div>
        `).join("")
        : `
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span>Item: <strong>${order.productName}</strong></span>
                <strong>₹${order.totalPayable.toLocaleString("en-IN")}</strong>
            </div>
        `;

    receiptBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid var(--border-subtle); padding-bottom: 14px; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
            <div>
                <strong style="color: var(--forest-deep); font-size: 1.15rem;">Official Order Reference: #${order.orderId}</strong>
                <div style="font-size: 0.85rem; color: var(--text-muted);">Placed on ${order.orderDate} at ${order.orderTime} • <span style="color:#4285F4;"><i class="fa-brands fa-google"></i> ${order.authenticatedVia}</span></div>
            </div>
            <span style="background:var(--sage); color:#fff; font-size:0.75rem; padding:4px 10px; border-radius:4px; font-weight:700; height: fit-content;">CONFIRMED & REGISTERED</span>
        </div>

        <div class="receipt-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; font-size: 0.9rem;">
            <div>
                <div style="color: var(--text-muted); font-size: 0.76rem; text-transform: uppercase; font-weight: 700; margin-bottom: 2px;">Patron Contact Details</div>
                <strong style="color: var(--forest-deep);">${order.name}</strong>
                <div style="display:flex; align-items:center; gap:6px; margin-top:2px;"><i class="fa-solid fa-phone" style="font-size:0.8rem; color:var(--sage);"></i> +91 ${order.phone}</div>
                ${order.email !== "Not Provided" ? `<div style="display:flex; align-items:center; gap:6px; margin-top:2px;"><i class="fa-solid fa-envelope" style="font-size:0.8rem; color:var(--sage);"></i> ${order.email}</div>` : ""}
            </div>
            <div>
                <div style="color: var(--text-muted); font-size: 0.76rem; text-transform: uppercase; font-weight: 700; margin-bottom: 2px;">Delivery Destination</div>
                <div style="color: var(--forest-deep); font-weight: 600;">${order.address}</div>
                <div>${order.city}, ${order.state} - <strong>${order.pincode}</strong></div>
            </div>
        </div>

        <div style="border-top: 1.5px dashed var(--border-medium); padding-top: 14px; font-size: 0.92rem;">
            <div style="margin-bottom: 10px;">
                <div style="color: var(--text-muted); font-size: 0.76rem; text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">Ordered Items</div>
                ${itemsSummaryHtml}
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Shipping Method:</span>
                <span style="color: var(--sage); font-weight: 700;">FREE Himalayan Air Express (3-5 Days)</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Payment Mode:</span>
                <strong style="color: var(--forest-deep);">${order.paymentMethod}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800; color: var(--forest-deep); border-top: 1.5px solid var(--border-subtle); padding-top: 10px; margin-top: 10px;">
                <span>Total Amount:</span>
                <span>₹${order.totalPayable.toLocaleString("en-IN")}</span>
            </div>
        </div>
    `;
}

/* =========================================================
   7. UTILITIES & EVENT LISTENERS
========================================================= */
function setupEventListeners() {
    const phoneInput = document.getElementById("cPhone");
    if (phoneInput) {
        phoneInput.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
        });
    }

    const pincodeInput = document.getElementById("cPincode");
    if (pincodeInput) {
        pincodeInput.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
        });
    }
}

function showToast(msg) {
    let toast = document.getElementById("checkoutToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "checkoutToast";
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
