<script>
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";

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
            alert("الرجاء تعبئة جميع الحقول");
        }
    }

    function getLocation() {
        if (typeof my !== "undefined") {
            my.showLoading({ content: "جاري تحديد الموقع..." });
            my.getLocation({
                success(res) {
                    my.hideLoading();
                    console.log(res);
                    // Simple formatting commonly used or just coordinates if address not provided in res
                    // res usually has latitude, longitude. Some envs might return address if configured.
                    // For now, let's just put lat, long or look for address prop if available in standard mini-app schema
                    // The user snippet used 'formatLocation'. I will implement a basic one.
                    address = `Location: ${res.latitude}, ${res.longitude}`;
                    if (res.address) address = res.address; // Use address if available
                },
                fail() {
                    my.hideLoading();
                    my.alert({ title: "فشل تحديد الموقع" });
                },
            });
        } else {
            // Web Mock
            address = "Riyadh, Digital City (Mock)";
        }
    }

    function scanQR() {
        if (typeof my !== "undefined") {
            my.scan({
                type: "qr",
                success: (res) => {
                    // Use scanned QR code data as address or parse it
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
            // Web Mock
            address = "QR: Sample Address (Mock)";
        }
    }
</script>

<div class="page" in:fly={{ x: 50, duration: 300 }}>
    <header class="header">
        <button class="btn-icon" on:click={goBack}>
            <i class="fa-solid fa-arrow-right"></i>
        </button>
        <h2>حجز الموعد</h2>
        <div style="width: 40px;"></div>
    </header>

    <div class="summary-card">
        <div class="row">
            <span>الخدمة:</span>
            <span class="val">{service.title}</span>
        </div>
        <div class="row">
            <span>السعر:</span>
            <span class="val price">{service.price}$</span>
        </div>
    </div>

    <form class="form" on:submit|preventDefault={goToPayment}>
        <div class="form-group">
            <label>تاريخ الزيارة</label>
            <div class="input-wrap">
                <i class="fa-solid fa-calendar"></i>
                <input
                    type="date"
                    bind:value={date}
                    required
                    placeholder="dd/mm/yyyy"
                />
            </div>
        </div>

        <div class="form-group">
            <label>الوقت المفضل</label>
            <div class="grid-time">
                {#each ["09:00", "11:00", "13:00", "15:00", "17:00"] as t}
                    <button
                        type="button"
                        class="time-slot {time === t ? 'active' : ''}"
                        on:click={() => (time = t)}
                    >
                        {t}
                    </button>
                {/each}
            </div>
        </div>

        <div class="form-group">
            <label>العنوان</label>
            <div class="input-wrap">
                <i class="fa-solid fa-map-marker-alt"></i>
                <input
                    type="text"
                    bind:value={address}
                    placeholder="اسم الشارع، رقم المنزل..."
                    required
                />
            </div>
            <button type="button" class="btn-location" on:click={getLocation}>
                <i class="fa-solid fa-location-crosshairs"></i>
                <span>استخدام موقعي الحالي</span>
            </button>
            <button type="button" class="btn-location" on:click={scanQR}>
                <i class="fa-solid fa-qrcode"></i>
                <span>مسح رمز QR</span>
            </button>
        </div>

        <div class="spacer"></div>

        <button type="submit" class="btn-primary">
            <span>متابعة للدفع</span>
            <i class="fa-solid fa-credit-card"></i>
        </button>
    </form>
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

    .summary-card {
        background: var(--card-bg);
        padding: 20px;
        border-radius: 16px;
        border: 1px solid var(--glass-border);
        margin-bottom: 30px;
    }

    .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        color: var(--text-muted);
        font-size: 14px;
    }

    .row:last-child {
        margin-bottom: 0;
        padding-top: 8px;
        border-top: 1px solid var(--glass-border);
    }

    .val {
        color: white;
        font-weight: 500;
    }

    .val.price {
        color: var(--primary-light);
        font-weight: 700;
    }

    .form-group {
        margin-bottom: 24px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        color: var(--text-muted);
        font-size: 14px;
    }

    .input-wrap {
        position: relative;
    }

    .input-wrap i {
        position: absolute;
        right: 16px; /* RTL */
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
    }

    input {
        width: 100%;
        background: var(--card-bg);
        border: 1px solid var(--glass-border);
        padding: 14px 44px 14px 16px; /* padding-right 44px for icon */
        border-radius: 12px;
        color: white;
        font-size: 16px;
        outline: none;
        transition: 0.2s;
        font-family: inherit;
    }

    input:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
    }

    .grid-time {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    .time-slot {
        background: var(--card-bg);
        border: 1px solid var(--glass-border);
        padding: 10px;
        border-radius: 8px;
        color: var(--text-muted);
        transition: 0.2s;
    }

    .time-slot.active {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
    }

    .btn-location {
        margin-top: 12px;
        width: 100%;
        background: transparent;
        border: 1px dashed var(--glass-border);
        padding: 12px;
        border-radius: 8px;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: 0.2s;
        font-size: 14px;
    }

    .btn-location:hover {
        border-color: var(--primary);
        color: var(--primary);
    }

    .btn-location:active {
        transform: scale(0.98);
    }

    .spacer {
        height: 40px;
    }
</style>
