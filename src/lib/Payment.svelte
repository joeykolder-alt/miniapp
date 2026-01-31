<script>
    import { createEventDispatcher } from "svelte";
    import { fly, fade } from "svelte/transition";

    export let service;
    export let booking;
    export let token;
    const dispatch = createEventDispatcher();

    let processing = false;

    function goBack() {
        dispatch("navigate", { page: "booking", data: service });
    }

    function pay() {
        if (!token) {
            if (typeof my !== "undefined") {
                my.alert({
                    content: "لا يوجد توكن مصادقة، الرجاء لإعادة تشغيل التطبيق",
                });
            } else {
                alert("No auth token found, please restart the app.");
            }
            return;
        }

        console.log("Starting payment with token:", token);
        processing = true;

        const paymentData = {
            amount: service.price,
            service: service.title,
            serviceId: service.id,
            booking: {
                date: booking.date,
                time: booking.time,
                address: booking.address,
            },
        };

        fetch("https://its.mouamle.space/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(paymentData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.url) throw new Error("No payment URL");

                if (typeof my !== "undefined") {
                    my.tradePay({
                        paymentUrl: data.url,
                        success: (res) => {
                            processing = false;
                            dispatch("navigate", { page: "success" });
                        },
                        fail: (err) => {
                            console.error("Payment failed:", err);
                            my.alert({
                                content:
                                    "فشل الدفع: " +
                                    (err.errorMessage || "خطأ غير معروف"),
                            });
                            processing = false;
                        },
                    });
                } else {
                    setTimeout(() => {
                        processing = false;
                        dispatch("navigate", { page: "success" });
                    }, 1500);
                }
            })
            .catch((err) => {
                console.error("Payment error:", err);
                if (typeof my !== "undefined") {
                    my.alert({
                        content: "فشل بدء عملية الدفع: " + err.message,
                    });
                }
                processing = false;
            });
    }
</script>

<div class="page" in:fade={{ duration: 300 }}>
    <header class="header">
        <button class="back-btn glass-card" on:click={goBack}>
            <i class="fa-solid fa-chevron-right"></i>
        </button>
        <h2 class="section-title">الدفع الآمن</h2>
        <div style="width: 44px"></div>
    </header>

    <div class="payment-card glass-card animate-pulse">
        <div class="card-top">
            <i class="fa-solid fa-microchip chip"></i>
            <i class="fa-brands fa-visa network"></i>
        </div>
        <div class="card-middle">
            <span class="total-label">المبلغ الإجمالي</span>
            <h1 class="amount">{service.price} <span>USD</span></h1>
        </div>
        <div class="card-bottom">
            <div class="holder">
                <span>اسم المشترك</span>
                <p>MOHAMMED AHMED</p>
            </div>
            <div class="expiry">
                <span>الصلاحية</span>
                <p>12/28</p>
            </div>
        </div>
    </div>

    <div class="order-summary glass-card">
        <h3 class="summary-title">ملخص الطلب</h3>
        <div class="summary-item">
            <div class="item-label">الخدمة المختارة</div>
            <div class="item-value">{service.title}</div>
        </div>
        <div class="summary-item">
            <div class="item-label">موعد الزيارة</div>
            <div class="item-value">{booking.date} | {booking.time}</div>
        </div>
        <div class="summary-item">
            <div class="item-label">العنوان</div>
            <div class="item-value address">{booking.address}</div>
        </div>
        <div class="divider"></div>
        <div class="summary-item total">
            <div class="item-label">الإجمالي</div>
            <div class="item-value price">{service.price}$</div>
        </div>
    </div>

    <div class="secure-info">
        <i class="fa-solid fa-shield-halved"></i>
        <span>دفع آمن ومشفر 256-bit</span>
    </div>

    <div class="footer-action">
        <button class="btn-primary" on:click={pay} disabled={processing}>
            {#if processing}
                <i class="fa-solid fa-spinner fa-spin"></i>
                <span>جاري المعالجة...</span>
            {:else}
                <span>تأكيد الدفع</span>
                <i class="fa-solid fa-lock"></i>
            {/if}
        </button>
    </div>
</div>

<style>
    .page {
        padding: 24px;
        background: var(--bg-deep);
        min-height: 100vh;
        padding-bottom: 120px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
    }

    .back-btn {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        color: white;
    }

    .payment-card {
        height: 200px;
        background: linear-gradient(135deg, var(--primary-dark) 0%, #1e1b4b 100%);
        padding: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 32px;
        position: relative;
        overflow: hidden;
    }

    .payment-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
        pointer-events: none;
    }

    .card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chip {
        font-size: 32px;
        color: #fbbf24;
    }

    .network {
        font-size: 40px;
        color: white;
        opacity: 0.8;
    }

    .card-middle .total-label {
        font-size: 12px;
        color: var(--primary-light);
        opacity: 0.8;
    }

    .amount {
        font-family: 'Outfit', sans-serif;
        font-size: 36px;
        font-weight: 800;
        color: white;
        margin-top: 4px;
    }

    .amount span {
        font-size: 16px;
        font-weight: 400;
        opacity: 0.7;
    }

    .card-bottom {
        display: flex;
        gap: 32px;
    }

    .card-bottom div span {
        display: block;
        font-size: 10px;
        color: var(--primary): light;
        opacity: 0.6;
        margin-bottom: 4px;
    }

    .card-bottom div p {
        font-family: 'Outfit', sans-serif;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 1px;
    }

    .order-summary {
        padding: 24px;
    }

    .summary-title {
        font-size: 16px;
        margin-bottom: 20px;
        border-bottom: 1px solid var(--glass-border);
        padding-bottom: 12px;
    }

    .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        font-size: 14px;
    }

    .item-label {
        color: var(--text-muted);
    }

    .item-value {
        font-weight: 600;
        max-width: 60%;
        text-align: left;
    }

    .address {
        font-size: 12px;
        line-height: 1.4;
    }

    .divider {
        height: 1px;
        background: var(--glass-border);
        margin: 16px 0;
    }

    .total .item-label {
        color: white;
        font-weight: 700;
        font-size: 16px;
    }

    .total .price {
        color: var(--primary-light);
        font-size: 20px;
        font-weight: 800;
        font-family: 'Outfit', sans-serif;
    }

    .secure-info {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: 24px;
        color: var(--secondary);
        font-size: 13px;
        font-weight: 500;
    }

    .footer-action {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 24px;
        z-index: 10;
    }
</style>
