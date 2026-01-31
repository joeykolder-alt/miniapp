<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { fly, fade, scale } from "svelte/transition";
    import { elasticOut } from "svelte/easing";

    const dispatch = createEventDispatcher();

    function goHome() {
        dispatch("navigate", { page: "home" });
    }

    onMount(() => {
        // Trigger haptic feedback if available
        if (typeof my !== "undefined" && my.vibrateShort) {
            my.vibrateShort();
        }
    });
</script>

<div class="page" in:fade={{ duration: 400 }}>
    <div class="success-container">
        <!-- Success Icon -->
        <div
            class="icon-wrapper"
            in:scale={{ duration: 800, delay: 200, easing: elasticOut }}
        >
            <div class="circle-outer"></div>
            <div class="circle-inner glass-card">
                <i class="fa-solid fa-check"></i>
            </div>
        </div>

        <!-- Success Text -->
        <div class="text-content" in:fly={{ y: 20, delay: 600 }}>
            <h1>تم الحجز بنجاح!</h1>
            <p>
                لقد استلمنا طلبك بنجاح. سيقوم أحد فنيينا بالتواصل معك قريباً
                لتأكيد الموعد.
            </p>
        </div>

        <!-- Order ID Card -->
        <div class="order-card glass-card" in:fly={{ y: 20, delay: 800 }}>
            <div class="order-row">
                <span>رقم الطلب</span>
                <strong>#FIX-{Math.floor(Math.random() * 90000) + 10000}</strong
                >
            </div>
            <div class="order-row">
                <span>حالة الدفع</span>
                <span class="status-badge">مكتمل</span>
            </div>
        </div>

        <div class="action-buttons" in:fly={{ y: 20, delay: 1000 }}>
            <button class="btn-primary" on:click={goHome}>
                <span>العودة للرئيسية</span>
                <i class="fa-solid fa-house"></i>
            </button>
            <button class="btn-secondary glass-card">
                <span>عرض تفاصيل الطلب</span>
            </button>
        </div>
    </div>
</div>

<style>
    .page {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-deep);
        padding: 24px;
        text-align: center;
    }

    .success-container {
        width: 100%;
        max-width: 320px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .icon-wrapper {
        position: relative;
        width: 120px;
        height: 120px;
        margin-bottom: 32px;
    }

    .circle-outer {
        position: absolute;
        inset: -10px;
        border: 2px dashed var(--primary-light);
        border-radius: 50%;
        opacity: 0.3;
        animation: rotate 10s linear infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .circle-inner {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
        color: var(--secondary);
        background: rgba(16, 185, 129, 0.1);
        border: 2px solid var(--secondary);
        box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
    }

    h1 {
        font-size: 28px;
        margin-bottom: 12px;
        color: white;
    }

    p {
        color: var(--text-muted);
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 32px;
    }

    .order-card {
        width: 100%;
        padding: 20px;
        margin-bottom: 40px;
    }

    .order-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 14px;
    }

    .order-row:last-child {
        margin-bottom: 0;
        padding-top: 12px;
        border-top: 1px solid var(--glass-border);
    }

    .status-badge {
        color: var(--secondary);
        font-weight: 700;
    }

    .action-buttons {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .btn-secondary {
        background: transparent;
        color: white;
        padding: 14px;
        width: 100%;
        font-weight: 600;
        font-size: 14px;
    }
</style>
