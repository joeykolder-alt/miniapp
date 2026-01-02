<script>
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";

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
                    content: "لا يوجد توكن مصادقة، الرجاء إعادة تشغيل التطبيق",
                });
            } else {
                alert("No auth token found, please restart the app.");
            }
            return;
        }

        console.log("Starting payment with token:", token);
        processing = true;

        // Prepare payment data
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

        console.log("Payment data:", paymentData);

        fetch("https://its.mouamle.space/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(paymentData),
        })
            .then((res) => {
                console.log("Payment API response status:", res.status);
                return res.json();
            })
            .then((data) => {
                console.log("Payment API response data:", data);

                if (!data.url) {
                    throw new Error("No payment URL received from server");
                }

                if (typeof my !== "undefined") {
                    console.log("Calling my.tradePay with URL:", data.url);
                    my.tradePay({
                        paymentUrl: data.url,
                        success: (res) => {
                            console.log("Payment successful:", res);
                            my.alert({
                                content: "تم الدفع بنجاح",
                            });
                            processing = false;
                            dispatch("navigate", { page: "success" });
                        },
                        fail: (err) => {
                            console.error("Payment failed:", err);
                            my.alert({
                                content:
                                    "فشل الدفع: " +
                                    (err.errorMessage || JSON.stringify(err)),
                            });
                            processing = false;
                        },
                    });
                } else {
                    // Fallback for Web/Dev
                    console.log("Mocking my.tradePay with url:", data.url);
                    alert("Payment successful (Mock)");
                    processing = false;
                    dispatch("navigate", { page: "success" });
                }
            })
            .catch((err) => {
                console.error("Payment error:", err);
                if (typeof my !== "undefined") {
                    my.alert({
                        content: "فشل بدء عملية الدفع: " + err.message,
                    });
                } else {
                    alert("Payment init failed: " + err.message);
                }
                processing = false;
            });
    }
</script>

<div class="page" in:fly={{ x: 50, duration: 300 }}>
    <header class="header">
        <button class="btn-icon" on:click={goBack}>
            <i class="fa-solid fa-arrow-right"></i>
        </button>
        <h2>الدفع</h2>
        <div style="width: 40px;"></div>
    </header>

    <div class="amount-card">
        <span>المبلغ الإجمالي</span>
        <h1>{service.price}$</h1>
    </div>

    <div class="section-title">طريقة الدفع</div>

    <div class="payment-methods">
        <div class="method active">
            <div class="method-icon">
                <i class="fa-brands fa-apple"></i>
            </div>
            <span>Apple Pay</span>
            <i class="fa-solid fa-check-circle check"></i>
        </div>

        <div class="method">
            <div class="method-icon">
                <i class="fa-solid fa-credit-card"></i>
            </div>
            <span>بطاقة ائتمان</span>
        </div>

        <div class="method">
            <div class="method-icon">
                <i class="fa-solid fa-money-bill-wave"></i>
            </div>
            <span>دفع نقدي</span>
        </div>
    </div>

    <div class="summary">
        <h3>ملخص الطلب</h3>
        <div class="item">
            <span>الخدمة</span>
            <span>{service.title}</span>
        </div>
        <div class="item">
            <span>التاريخ</span>
            <span>{booking.date}</span>
        </div>
        <div class="item">
            <span>الوقت</span>
            <span>{booking.time}</span>
        </div>
        <div class="item">
            <span>العنوان</span>
            <span class="addr">{booking.address}</span>
        </div>
    </div>

    <div class="spacer"></div>

    <button class="btn-primary" on:click={pay} disabled={processing}>
        {#if processing}
            <i class="fa-solid fa-spinner fa-spin"></i>
            <span>جاري المعالجة...</span>
        {:else}
            <span>دفع {service.price}$</span>
            <i class="fa-solid fa-lock"></i>
        {/if}
    </button>
</div>

<style>
    .page {
        padding: 20px;
        min-height: 100vh;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .btn-icon {
        width: 40px;
        height: 40px;
        background: var(--card-bg);
        border-radius: 12px;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        border: 1px solid var(--glass-border);
    }

    .amount-card {
        background: linear-gradient(
            135deg,
            var(--primary) 0%,
            var(--primary-dark) 100%
        );
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        color: white;
        margin-bottom: 30px;
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.4);
    }

    .amount-card span {
        font-size: 14px;
        opacity: 0.8;
    }

    .amount-card h1 {
        font-size: 36px;
        margin-top: 8px;
    }

    .section-title {
        font-size: 16px;
        margin-bottom: 16px;
        color: var(--text-muted);
    }

    .payment-methods {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 30px;
    }

    .method {
        display: flex;
        align-items: center;
        padding: 16px;
        background: var(--card-bg);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        cursor: pointer;
        transition: 0.2s;
    }

    .method.active {
        border-color: var(--primary);
        background: rgba(79, 70, 229, 0.1);
    }

    .method-icon {
        width: 40px;
        height: 40px;
        background: var(--dark-bg);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 16px;
        font-size: 20px;
    }

    .check {
        margin-right: auto;
        color: var(--primary);
    }

    .summary {
        background: var(--card-bg);
        padding: 20px;
        border-radius: 16px;
        border: 1px solid var(--glass-border);
    }

    .summary h3 {
        font-size: 16px;
        margin-bottom: 16px;
        border-bottom: 1px solid var(--glass-border);
        padding-bottom: 12px;
    }

    .item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 14px;
    }

    .item span:first-child {
        color: var(--text-muted);
    }

    .addr {
        max-width: 150px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .spacer {
        height: 40px;
    }
</style>
