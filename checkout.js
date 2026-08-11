/**
 * PARTHVI AYURVEDIC - 3-STEP CHECKOUT CONTROLLER
 * Step 1: Google Sign-In / Authentication
 * Step 2: Customer & Delivery Details
 * Step 3: Payment Selection & Order Confirmation
 */

const UNIT_PRICE = 2200;
const ORIGINAL_UNIT_PRICE = 2800;
const UPI_VPA = "parthvi.ayurvedic@upi";

let currentStep = 1;
let currentQuantity = 1;
let selectedPayment = "COD";
let currentUser = null;

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    loadSavedUser();
    checkUrlParams();
    updatePricingDisplays();
    setupEventListeners();
});

/* =========================================================
   1. AUTHENTICATION & USER MANAGEMENT
========================================================= */
function loadSavedUser() {
    try {
        const saved = localStorage.getItem("parthvi_user") || sessionStorage.getItem("parthvi_user");
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
    if (userEmail) userEmail.textContent = user.email || "user@gmail.com";

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

/**
 * Handle Google Login (Simulation / OAuth Flow)
 */
function handleGoogleLogin(customEmail = null, customName = null) {
    // Simulated Google Authentication response
    const name = customName || "Satya Prakash";
    const email = customEmail || "satya.ayurveda@gmail.com";

    const userObj = {
        name: name,
        email: email,
        avatar: name.charAt(0).toUpperCase(),
        authProvider: "google",
        loginTime: new Date().toISOString()
    };

    currentUser = userObj;
    localStorage.setItem("parthvi_user", JSON.stringify(userObj));
    sessionStorage.setItem("parthvi_user", JSON.stringify(userObj));

    renderAuthenticatedUser(userObj);

    // Show instant visual feedback and advance to Step 2
    showToast(`Signed in as ${userObj.name} (${userObj.email}) ✓`);
    setTimeout(() => {
        goToStep(2);
    }, 450);
}

function logoutGoogle() {
    localStorage.removeItem("parthvi_user");
    sessionStorage.removeItem("parthvi_user");
    currentUser = null;
    renderUnauthenticatedState();

    const cName = document.getElementById("cName");
    const cEmail = document.getElementById("cEmail");
    if (cName) cName.value = "";
    if (cEmail) cEmail.value = "";

    showToast("Signed out of Google account");
}

/* =========================================================
   2. STEP CONTROLLER & NAVIGATION
========================================================= */
function goToStep(step) {
    if (step < 1 || step > 3) return;

    // Step Validation before advancing
    if (step === 2 && !currentUser) {
        // Automatically prompt Google login or continue as guest
        handleGoogleLogin("customer.guest@gmail.com", "Ayurvedic Customer");
    }

    if (step === 3) {
        if (!validateDeliveryForm()) {
            return;
        }
    }

    currentStep = step;

    // Update Progress Stepper UI
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
                if (bubble) bubble.textContent = "✓";
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

    // Refresh dynamic components in step 3
    if (step === 3) {
        updatePaymentDetails();
    }

    // Smooth scroll to top of checkout card
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
        }
    }
}

/* =========================================================
   3. DELIVERY FORM VALIDATION (STEP 2)
========================================================= */
function validateDeliveryForm() {
    const nameInput = document.getElementById("cName");
    const phoneInput = document.getElementById("cPhone");
    const addressInput = document.getElementById("cAddress");
    const cityInput = document.getElementById("cCity");
    const stateInput = document.getElementById("cState");
    const pincodeInput = document.getElementById("cPincode");

    let isValid = true;

    // Reset error styling
    [nameInput, phoneInput, addressInput, cityInput, stateInput, pincodeInput].forEach(el => {
        if (el) {
            el.closest(".form-group")?.classList.remove("error");
        }
    });

    if (!nameInput || !nameInput.value.trim()) {
        highlightError(nameInput, "Please enter your full name.");
        isValid = false;
    }

    if (!phoneInput || !/^[0-9]{10}$/.test(phoneInput.value.trim())) {
        highlightError(phoneInput, "Please enter a valid 10-digit mobile number.");
        isValid = false;
    }

    if (!addressInput || addressInput.value.trim().length < 5) {
        highlightError(addressInput, "Please enter your complete street/flat address.");
        isValid = false;
    }

    if (!cityInput || !cityInput.value.trim()) {
        highlightError(cityInput, "Please enter your city / district.");
        isValid = false;
    }

    if (!stateInput || !stateInput.value.trim()) {
        highlightError(stateInput, "Please enter your state.");
        isValid = false;
    }

    if (!pincodeInput || !/^[0-9]{6}$/.test(pincodeInput.value.trim())) {
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
    showToast(message, "error");
}

/* =========================================================
   4. PAYMENT SELECTION & DYNAMIC UPI QR (STEP 3)
========================================================= */
function selectPayment(method) {
    selectedPayment = method;

    // Update active tab styles
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
    const totalAmount = UNIT_PRICE * currentQuantity;
    const qrImg = document.getElementById("upiQrCodeImg");
    const payBtnText = document.getElementById("payBtnText");

    if (qrImg) {
        // Generate dynamic UPI payment URL
        const upiString = `upi://pay?pa=${encodeURIComponent(UPI_VPA)}&pn=Parthvi%20Ayurvedic&am=${totalAmount}&cu=INR&tn=Parthvi%20Rasayana%20Order`;
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}&color=082116&bgcolor=FFFFFF`;
    }

    if (payBtnText) {
        if (selectedPayment === "COD") {
            payBtnText.textContent = `📦 Confirm Cash on Delivery Order (₹${totalAmount.toLocaleString("en-IN")}) →`;
        } else if (selectedPayment === "UPI") {
            payBtnText.textContent = `📱 Verify & Place UPI Order (₹${totalAmount.toLocaleString("en-IN")}) →`;
        } else {
            payBtnText.textContent = `🔒 Pay & Place Order (₹${totalAmount.toLocaleString("en-IN")}) →`;
        }
    }
}

function copyUPIId() {
    navigator.clipboard.writeText(UPI_VPA).then(() => {
        showToast(`Copied UPI ID: ${UPI_VPA}`);
    }).catch(() => {
        showToast(`UPI ID: ${UPI_VPA}`);
    });
}

/* =========================================================
   5. ORDER SUBMISSION & CONFIRMATION
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
    const totalPayable = UNIT_PRICE * currentQuantity;

    let paymentLabel = "Cash on Delivery (COD)";
    if (selectedPayment === "UPI") paymentLabel = "UPI / QR Code Scan & Pay";
    else if (selectedPayment === "Card") paymentLabel = "Debit/Credit Card";
    else if (selectedPayment === "Netbanking") paymentLabel = "Net Banking";

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
        quantity: currentQuantity,
        productName: "Parthvi Slim & Immunity Rasayana",
        totalPayable,
        paymentMethod: paymentLabel,
        status: "Pending Dispatch",
        authenticatedVia: currentUser ? "Google OAuth" : "Direct Customer"
    };

    // Save to localStorage for admin panel
    try {
        const existingOrders = JSON.parse(localStorage.getItem("parthvi_orders") || "[]");
        existingOrders.unshift(orderData);
        localStorage.setItem("parthvi_orders", JSON.stringify(existingOrders));
    } catch(err) {
        console.error("Order storage error:", err);
    }

    // Populate Receipt
    renderSuccessReceipt(orderData);

    // Switch view
    document.getElementById("checkoutFormSection").style.display = "none";
    document.getElementById("checkoutStepperWrap").style.display = "none";
    document.getElementById("orderSuccessSection").style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderSuccessReceipt(order) {
    const receiptBox = document.getElementById("receiptContent");
    if (!receiptBox) return;

    receiptBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid var(--border-subtle); padding-bottom: 14px; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
            <div>
                <strong style="color: var(--forest-deep); font-size: 1.15rem;">Official Order Reference: #${order.orderId}</strong>
                <div style="font-size: 0.85rem; color: var(--text-muted);">Placed on ${order.orderDate} at ${order.orderTime}</div>
            </div>
            <span class="badge-free" style="font-size: 0.85rem; align-self: center;">BOOKED & CONFIRMED</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; font-size: 0.9rem;">
            <div>
                <div style="color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase; font-weight: 700; margin-bottom: 2px;">Customer Details</div>
                <strong style="color: var(--forest-deep); font-size: 0.98rem;">${order.name}</strong>
                <div>📞 +91 ${order.phone}</div>
                ${order.email !== "Not Provided" ? `<div>✉️ ${order.email}</div>` : ""}
            </div>
            <div>
                <div style="color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase; font-weight: 700; margin-bottom: 2px;">Delivery Destination</div>
                <div style="color: var(--forest-deep); font-weight: 600;">${order.address}</div>
                <div>${order.city}, ${order.state} - <strong>${order.pincode}</strong></div>
            </div>
        </div>

        <div style="border-top: 1.5px dashed var(--sage-tint); padding-top: 14px; font-size: 0.92rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Item: <strong>${order.productName}</strong> (Qty: ${order.quantity})</span>
                <strong>₹${order.totalPayable.toLocaleString("en-IN")}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Shipping Method:</span>
                <span style="color: var(--emerald-vibrant); font-weight: 700;">FREE Himalayan Air Express (3-5 Days)</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Payment Mode:</span>
                <strong style="color: var(--forest-deep);">${order.paymentMethod}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 800; color: var(--forest-deep); border-top: 1.5px solid var(--border-subtle); padding-top: 10px; margin-top: 10px;">
                <span>Total Amount:</span>
                <span style="color: var(--forest-main);">₹${order.totalPayable.toLocaleString("en-IN")}</span>
            </div>
        </div>
    `;
}

/* =========================================================
   6. QUANTITY & PRICING
========================================================= */
function updateQty(change) {
    currentQuantity += change;
    if (currentQuantity < 1) currentQuantity = 1;
    if (currentQuantity > 10) currentQuantity = 10;
    
    updatePricingDisplays();
    updatePaymentDetails();
}

function updatePricingDisplays() {
    const qtyDisplay = document.getElementById("orderQty");
    const itemPriceDisplay = document.getElementById("itemPriceDisplay");
    const originalPriceDisplay = document.getElementById("originalPriceDisplay");
    const discountDisplay = document.getElementById("discountDisplay");
    const totalAmountDisplay = document.getElementById("totalAmountDisplay");

    const total = UNIT_PRICE * currentQuantity;
    const originalTotal = ORIGINAL_UNIT_PRICE * currentQuantity;
    const discount = (ORIGINAL_UNIT_PRICE - UNIT_PRICE) * currentQuantity;

    if (qtyDisplay) qtyDisplay.textContent = currentQuantity;
    if (itemPriceDisplay) itemPriceDisplay.textContent = `₹${total.toLocaleString("en-IN")}`;
    if (originalPriceDisplay) originalPriceDisplay.textContent = `₹${originalTotal.toLocaleString("en-IN")}`;
    if (discountDisplay) discountDisplay.textContent = `-₹${discount.toLocaleString("en-IN")}`;
    if (totalAmountDisplay) totalAmountDisplay.textContent = `₹${total.toLocaleString("en-IN")}`;
}

/* =========================================================
   7. UTILITIES & EVENT LISTENERS
========================================================= */
function setupEventListeners() {
    // Custom phone number formatting
    const phoneInput = document.getElementById("cPhone");
    if (phoneInput) {
        phoneInput.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
        });
    }

    // Pincode formatting
    const pincodeInput = document.getElementById("cPincode");
    if (pincodeInput) {
        pincodeInput.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
        });
    }
}

function showToast(msg, type = "success") {
    let toast = document.getElementById("checkoutToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "checkoutToast";
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #0F3524;
            color: #FFFFFF;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
            z-index: 10000;
            transition: all 0.3s ease;
            border-left: 4px solid #2FA368;
            opacity: 0;
            transform: translateY(10px);
        `;
        document.body.appendChild(toast);
    }

    if (type === "error") {
        toast.style.borderLeftColor = "#e53e3e";
    } else {
        toast.style.borderLeftColor = "#2FA368";
    }

    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
    }, 3200);
}
