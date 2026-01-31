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

    const features = [
        { icon: "fa-shield-halved", text: "ضمان جودة الخدمة" },
        { icon: "fa-user-check", text: "فنيين معتمدين" },
        { icon: "fa-calendar-check", text: "مواعيد مرنة" },
        { icon: "fa-hand-holding-dollar", text: "أسعار تنافسية" },
    ];
</script>

<div class="page" in:fade={{ duration: 300 }}>
    <div class="hero-header">
        <button class="back-btn glass-card" on:click={goBack}>
            <i class="fa-solid fa-chevron-right"></i>
        </button>
        <img src={service.image} alt={service.title} />
        <div class="hero-overlay"></div>
        <div class="price-floating glass-card">
            <span class="price">{service.price}$</span>
            <span class="label">يبدأ من</span>
        </div>
    </div>

    <div class="content-container">
        <div class="main-info">
            <div class="badge-row">
                <span class="category-badge">صيانة منزلية</span>
                <div class="rating-badge">
                    <i class="fa-solid fa-star"></i>
                    <span>4.9</span>
                </div>
            </div>
            <h1>{service.title}</h1>
            <p class="description">{service.description}</p>
        </div>

        <div class="features-section">
            <h3 class="section-title">لماذا تختارنا؟</h3>
            <div class="features-grid">
                {#each features as feature}
                    <div class="feature-item glass-card">
                        <i class="fa-solid {feature.icon}"></i>
                        <span>{feature.text}</span>
                    </div>
                {/each}
            </div>
        </div>

        <div class="reviews-preview">
            <h3 class="section-title">آراء العملاء</h3>
            <div class="review-card glass-card">
                <div class="review-header">
                    <div class="reviewer">
                        <div class="mini-avatar">أ</div>
                        <div>
                            <div class="name">أحمد خالد</div>
                            <div class="stars">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <span class="date">منذ يومين</span>
                </div>
                <p>
                    "خدمة ممتازة وسريعة جداً، الفني كان محترفاً وخلوقاً. أنصح
                    بالتعامل معهم."
                </p>
            </div>
        </div>
    </div>

    <div class="footer-action">
        <div class="price-summary">
            <span class="total-label">السعر التقديري</span>
            <span class="total-value">{service.price}$</span>
        </div>
        <button class="btn-primary animate-pulse" on:click={bookNow}>
            <span>احجز الآن</span>
            <i class="fa-solid fa-arrow-left"></i>
        </button>
    </div>
</div>

<style>
    .page {
        min-height: 100vh;
        background: var(--bg-deep);
        padding-bottom: 120px;
    }

    .hero-header {
        height: 350px;
        position: relative;
        overflow: hidden;
    }

    .hero-header img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3) 0%,
            transparent 40%,
            var(--bg-deep) 100%
        );
    }

    .back-btn {
        position: absolute;
        top: 24px;
        right: 24px;
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        z-index: 10;
        font-size: 18px;
    }

    .price-floating {
        position: absolute;
        bottom: 40px;
        left: 24px;
        padding: 12px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;
        z-index: 5;
    }

    .price-floating .price {
        font-size: 24px;
        font-weight: 800;
        color: var(--primary-light);
        font-family: "Outfit", sans-serif;
    }

    .price-floating .label {
        font-size: 10px;
        color: var(--text-muted);
        text-transform: uppercase;
    }

    .content-container {
        padding: 0 24px;
        margin-top: -20px;
        position: relative;
        z-index: 6;
    }

    .main-info h1 {
        font-size: 28px;
        margin: 12px 0;
    }

    .description {
        color: var(--text-muted);
        line-height: 1.8;
        font-size: 15px;
    }

    .badge-row {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .category-badge {
        background: rgba(99, 102, 241, 0.2);
        color: var(--primary-light);
        padding: 4px 12px;
        border-radius: 100px;
        font-size: 12px;
        font-weight: 600;
    }

    .rating-badge {
        display: flex;
        align-items: center;
        gap: 4px;
        background: rgba(245, 158, 11, 0.2);
        color: var(--accent);
        padding: 4px 12px;
        border-radius: 100px;
        font-size: 12px;
        font-weight: 600;
    }

    .features-section {
        margin-top: 32px;
    }

    .features-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .feature-item {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .feature-item i {
        font-size: 20px;
        color: var(--primary);
    }

    .feature-item span {
        font-size: 13px;
        font-weight: 600;
    }

    .reviews-preview {
        margin-top: 32px;
    }

    .review-card {
        padding: 16px;
    }

    .review-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
    }

    .reviewer {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .mini-avatar {
        width: 36px;
        height: 36px;
        background: var(--bg-dark);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: var(--primary);
    }

    .name {
        font-size: 14px;
        font-weight: 700;
    }

    .stars {
        color: var(--accent);
        font-size: 10px;
    }

    .date {
        font-size: 11px;
        color: var(--text-muted);
    }

    .review-card p {
        font-size: 13px;
        color: var(--text-muted);
        font-style: italic;
    }

    .footer-action {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--glass);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        padding: 24px;
        display: flex;
        align-items: center;
        gap: 20px;
        border-top: 1px solid var(--glass-border);
        z-index: 100;
    }

    .price-summary {
        display: flex;
        flex-direction: column;
    }

    .total-label {
        font-size: 12px;
        color: var(--text-muted);
    }

    .total-value {
        font-size: 22px;
        font-weight: 800;
        color: white;
        font-family: "Outfit", sans-serif;
    }

    .footer-action .btn-primary {
        flex: 1;
    }
</style>
