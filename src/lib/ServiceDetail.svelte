<script>
    import { createEventDispatcher } from "svelte";
    import { fade, fly } from "svelte/transition";

    export let service;
    const dispatch = createEventDispatcher();

    function goBack() {
        dispatch("navigate", { page: "home" });
    }

    function bookNow() {
        dispatch("navigate", { page: "booking", data: service });
    }
</script>

<div class="page full-height" in:fly={{ x: 50, duration: 300 }}>
    <div class="image-header">
        <button class="btn-back" on:click={goBack}>
            <i class="fa-solid fa-arrow-right"></i>
        </button>
        <img src={service.image} alt={service.title} />
        <div class="overlay"></div>
    </div>

    <div class="content">
        <div class="header-info">
            <div class="type-badge">خدمة منزلية</div>
            <h1>{service.title}</h1>
            <div class="rating">
                <i class="fa-solid fa-star text-yellow"></i>
                <span>4.8 (120 تقييم)</span>
            </div>
        </div>

        <div class="price-section">
            <span class="label">السعر الابتدائي</span>
            <span class="price">{service.price}$</span>
        </div>

        <div class="description">
            <h3>عن الخدمة</h3>
            <p>{service.description}</p>
            <ul>
                <li>
                    <i class="fa-solid fa-check-circle"></i> ضمان لمدة 30 يوم
                </li>
                <li><i class="fa-solid fa-check-circle"></i> فنيين معتمدين</li>
                <li><i class="fa-solid fa-check-circle"></i> أدوات احترافية</li>
            </ul>
        </div>

        <div class="spacer"></div>
    </div>

    <div class="bottom-action">
        <button class="btn-primary" on:click={bookNow}>
            <span>احجز موعد الآن</span>
            <i class="fa-solid fa-calendar-check"></i>
        </button>
    </div>
</div>

<style>
    .full-height {
        min-height: 100vh;
        background: var(--dark-bg);
        display: flex;
        flex-direction: column;
    }

    .image-header {
        height: 300px;
        position: relative;
        width: 100%;
    }

    .image-header img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(1.1); /* Subtle brightness boost for clarity */
    }

    .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3) 0%,
            transparent 40%,
            var(--dark-bg) 100%
        );
    }

    .btn-back {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(8px);
        border-radius: 50%;
        color: white;
        font-size: 18px;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
        padding: 24px;
        margin-top: -40px;
        position: relative;
        z-index: 2;
        flex: 1;
    }

    .header-info {
        margin-bottom: 24px;
    }

    .type-badge {
        background: rgba(79, 70, 229, 0.2);
        color: var(--primary-light);
        display: inline-block;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 12px;
        margin-bottom: 12px;
        font-weight: 600;
    }

    h1 {
        font-size: 28px;
        line-height: 1.2;
        margin-bottom: 12px;
    }

    .rating {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: var(--text-muted);
    }

    .text-yellow {
        color: var(--accent);
    }

    .price-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--card-bg);
        padding: 16px;
        border-radius: 12px;
        margin-bottom: 24px;
        border: 1px solid var(--glass-border);
    }

    .price-section .label {
        color: var(--text-muted);
    }

    .price-section .price {
        font-size: 20px;
        font-weight: 700;
        color: var(--primary-light);
    }

    .description h3 {
        margin-bottom: 12px;
    }

    .description p {
        color: var(--text-muted);
        margin-bottom: 16px;
        line-height: 1.6;
    }

    .description ul {
        list-style: none;
    }

    .description li {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
        color: var(--text-main);
    }

    .description li i {
        color: var(--secondary);
    }

    .spacer {
        height: 80px;
    }

    .bottom-action {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px; /* Adjusted generic padding */
        background: linear-gradient(to top, var(--dark-bg) 80%, transparent);
        z-index: 10;
        width: 100%;
        max-width: 480px; /* Match container max-width if applicable, but fixed implies viewport */
        margin: 0 auto;
    }

    /* Fix for fixed positioning centering if parent is centered */
    /* Assuming the app is rendered in a centered container on desktop */
</style>
