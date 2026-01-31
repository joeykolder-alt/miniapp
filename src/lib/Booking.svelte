<script>
    import { createEventDispatcher } from "svelte";
    import { fly, fade } from "svelte/transition";

    export let service;
    const dispatch = createEventDispatcher();

    let date = "";
    let time = "";
    let address = "";

    function goBack() {
        dispatch("navigate", { page: "detail", data: service });
    }

    function goToPayment() {
        if (date && time && address) {
            dispatch("navigate", {
                page: "payment",
                data: { service, booking: { date, time, address } },
            });
        } else {
            if (typeof my !== "undefined") {
                my.alert({ content: "الرجاء كمال جميع البيانات" });
            } else {
                alert("الرجاء تعبئة جميع الحقول");
            }
        }
    }

    function getLocation() {
        if (typeof my !== "undefined") {
            my.showLoading({ content: "جاري تحديد الموقع..." });
            my.getLocation({
                success(res) {
                    my.hideLoading();
                    console.log(res);
                    address =
                        res.address ||
                        `الموقع: ${res.latitude}, ${res.longitude}`;
                    my.alert({ content: "تم تحديد الموقع بنجاح" });
                },
                fail() {
                    my.hideLoading();
                    my.alert({ title: "فشل تحديد الموقع" });
                },
            });
        } else {
            address = "الرياض، حي الملقا (تجريبي)";
        }
    }

    function scanQR() {
        if (typeof my !== "undefined") {
            my.scan({
                type: "qr",
                success: (res) => {
                    if (res.code) {
                        address = res.code;
                        my.alert({ title: "تم المسح بنجاح" });
                    }
                },
                fail: (err) => {
                    my.alert({ title: "فشل مسح الرمز" });
                },
            });
        } else {
            address = "QR_12345_ADDRESS_MOCK";
        }
    }

    const availableTimes = [
        "09:00",
        "10:30",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
    ];
</script>

<div class="page" in:fade={{ duration: 300 }}>
    <header class="header">
        <button class="back-btn glass-card" on:click={goBack}>
            <i class="fa-solid fa-chevron-right"></i>
        </button>
        <h2 class="section-title">حجز الموعد</h2>
        <div style="width: 44px"></div>
    </header>

    <div class="booking-container">
        <!-- Service Brief -->
        <div class="service-brief glass-card">
            <img src={service.image} alt={service.title} class="mini-img" />
            <div class="brief-info">
                <h4>{service.title}</h4>
                <span class="price">{service.price}$</span>
            </div>
            <div class="status-dot"></div>
        </div>

        <!-- Date Selection -->
        <div class="form-section">
            <label class="label">اختر تاريخ الزيارة</label>
            <div class="input-wrapper glass-card">
                <i class="fa-solid fa-calendar-day"></i>
                <input type="date" bind:value={date} required />
            </div>
        </div>

        <!-- Time Selection -->
        <div class="form-section">
            <label class="label">اختر الوقت المفضل</label>
            <div class="time-grid">
                {#each availableTimes as t}
                    <button
                        class="time-chip glass-card {time === t
                            ? 'active'
                            : ''}"
                        on:click={() => (time = t)}
                    >
                        {t}
                    </button>
                {/each}
            </div>
        </div>

        <!-- Address Selection -->
        <div class="form-section">
            <label class="label">عنوان الخدمة</label>
            <div class="input-wrapper glass-card address-box">
                <i class="fa-solid fa-map-location-dot"></i>
                <textarea
                    bind:value={address}
                    placeholder="أدخل العنوان أو استخدم تحديد الموقع..."
                    rows="3"
                ></textarea>
            </div>

            <div class="location-tools">
                <button class="tool-btn glass-card" on:click={getLocation}>
                    <i class="fa-solid fa-location-crosshairs"></i>
                    <span>موقعي الحالي</span>
                </button>
                <button class="tool-btn glass-card" on:click={scanQR}>
                    <i class="fa-solid fa-qrcode"></i>
                    <span>مسح QR</span>
                </button>
            </div>
        </div>
    </div>

    <div class="footer-action">
        <button
            class="btn-primary"
            on:click={goToPayment}
            disabled={!date || !time || !address}
        >
            <span>متابعة الدفع</span>
            <i class="fa-solid fa-credit-card"></i>
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

    .booking-container {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .service-brief {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 12px;
        position: relative;
    }

    .mini-img {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        object-fit: cover;
    }

    .brief-info h4 {
        font-size: 16px;
        margin-bottom: 4px;
    }

    .brief-info .price {
        color: var(--primary-light);
        font-weight: 700;
        font-family: "Outfit", sans-serif;
    }

    .status-dot {
        position: absolute;
        top: 12px;
        left: 12px;
        width: 10px;
        height: 10px;
        background: var(--secondary);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--secondary);
    }

    .form-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .label {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-muted);
        padding-right: 4px;
    }

    .input-wrapper {
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 12px;
    }

    .input-wrapper i {
        color: var(--primary);
        font-size: 18px;
    }

    .input-wrapper input,
    .input-wrapper textarea {
        background: transparent;
        border: none;
        color: white;
        width: 100%;
        font-family: inherit;
        font-size: 15px;
        outline: none;
    }

    .time-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }

    .time-chip {
        padding: 14px;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        font-family: "Outfit", sans-serif;
    }

    .time-chip.active {
        background: var(--primary);
        border-color: var(--primary-light);
        color: white;
    }

    .location-tools {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-top: 8px;
    }

    .tool-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px;
        font-size: 13px;
        font-weight: 600;
    }

    .tool-btn i {
        color: var(--primary-light);
    }

    .footer-action {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 24px;
        background: linear-gradient(to top, var(--bg-deep) 80%, transparent);
        z-index: 10;
    }
</style>
