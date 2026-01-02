<script>
    import { createEventDispatcher } from "svelte";
    import { services } from "./services";
    import { fly } from "svelte/transition";

    const dispatch = createEventDispatcher();

    function selectService(service) {
        dispatch("navigate", { page: "detail", data: service });
    }
</script>

<div class="page" in:fly={{ y: 20, duration: 400 }}>
    <header class="header">
        <div class="user-welcome">
            <span class="greeting">مرحباً بك 👋</span>
            <h1 class="brand">SmartFix</h1>
        </div>
        <div class="search-bar">
            <i class="fa-solid fa-search"></i>
            <input type="text" placeholder="ما هي الخدمة التي تبحث عنها؟" />
        </div>
    </header>

    <section class="banner">
        <div class="banner-content">
            <h2>خدمات منزلك<br />بين يديك</h2>
            <button class="btn-banner">اطلب الآن</button>
        </div>
        <div class="banner-overlay"></div>
    </section>

    <section class="categories">
        <div class="section-header">
            <h3>الخدمات المتاحة</h3>
            <span class="see-all">الكل</span>
        </div>

        <div class="grid">
            {#each services as service}
                <div class="card" on:click={() => selectService(service)}>
                    <div class="card-image">
                        <img
                            src={service.image}
                            alt={service.title}
                            on:error={(e) => (e.target.style.display = "none")}
                        />
                        <div class="image-fallback">
                            <i class={`fa-solid ${service.icon}`}></i>
                        </div>
                        <div class="price-tag">{service.price}$</div>
                    </div>
                    <div class="card-content">
                        <div class="icon-box">
                            <i class={`fa-solid ${service.icon}`}></i>
                        </div>
                        <h4>{service.title}</h4>
                        <!-- <p>{service.description}</p> -->
                    </div>
                </div>
            {/each}
        </div>
    </section>
</div>

<style>
    .page {
        padding: 20px;
    }

    .header {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;
    }

    .user-welcome .greeting {
        font-size: 14px;
        color: var(--text-muted);
    }

    .brand {
        font-size: 28px;
        background: linear-gradient(
            to right,
            var(--primary-light),
            var(--primary)
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .search-bar {
        position: relative;
        background: var(--card-bg);
        border-radius: 12px;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        border: 1px solid var(--glass-border);
    }

    .search-bar i {
        color: var(--text-muted);
    }

    .search-bar input {
        background: transparent;
        border: none;
        color: white;
        width: 100%;
        font-family: inherit;
        outline: none;
    }

    .banner {
        position: relative;
        height: 160px;
        border-radius: 20px;
        background: url("https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=1000&auto=format&fit=crop")
            center/cover;
        overflow: hidden;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        padding: 20px;
    }

    .banner-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.8), transparent);
        z-index: 1;
    }

    .banner-content {
        position: relative;
        z-index: 2;
    }

    .banner-content h2 {
        font-size: 22px;
        line-height: 1.3;
        margin-bottom: 12px;
        color: white;
    }

    .btn-banner {
        background: var(--primary);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .section-header h3 {
        font-size: 18px;
    }

    .see-all {
        color: var(--primary-light);
        font-size: 14px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }

    .card {
        background: var(--card-bg);
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid var(--glass-border);
        cursor: pointer;
        transition: transform 0.2s;
    }

    .card:active {
        transform: scale(0.96);
    }

    .card-image {
        height: 160px;
        width: 100%;
        position: relative;
    }

    .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        z-index: 1;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .image-fallback {
        position: absolute;
        inset: 0;
        background: var(--dark-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: var(--primary-light);
        opacity: 0.5;
    }

    .card:hover .card-image img {
        transform: scale(1.1);
    }

    /* Gradient overlay to make images look more premium and integrated */
    .card-image::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50%;
        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            transparent 100%
        );
        z-index: 1;
    }

    .price-tag {
        position: absolute;
        bottom: 12px;
        right: 12px;
        background: var(--primary);
        color: white;
        padding: 4px 12px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 800;
        z-index: 3;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }

    .card-content {
        padding: 12px;
    }

    .icon-box {
        width: 32px;
        height: 32px;
        background: var(--dark-bg);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
        color: var(--primary-light);
    }

    .card h4 {
        font-size: 14px;
        margin-bottom: 4px;
    }
</style>
