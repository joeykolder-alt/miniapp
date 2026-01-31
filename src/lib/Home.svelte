<script>
    import { createEventDispatcher } from "svelte";
    import { services } from "./services";
    import { fly, fade } from "svelte/transition";

    const dispatch = createEventDispatcher();

    function selectService(service) {
        dispatch("navigate", { page: "detail", data: service });
    }

    let searchQuery = "";
    $: filteredServices = services.filter(s => s.title.includes(searchQuery));
</script>

<div class="page" in:fade={{ duration: 400 }}>
    <header class="header">
        <div class="top-nav">
            <div class="user-info">
                <div class="avatar">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div class="welcome-text">
                    <span class="greeting">أهلاً بك 👋</span>
                    <h2 class="user-name">محمد أحمد</h2>
                </div>
            </div>
            <button class="notification-btn">
                <i class="fa-solid fa-bell"></i>
                <span class="dot"></span>
            </button>
        </div>

        <div class="search-container">
            <div class="search-box glass-card">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input 
                    type="text" 
                    placeholder="ما هي الخدمة التي تحتاجها اليوم؟" 
                    bind:value={searchQuery}
                />
            </div>
        </div>
    </header>

    <section class="hero-section" in:fly={{ y: 20, delay: 200, duration: 600 }}>
        <div class="hero-card glass-card">
            <div class="hero-content">
                <span class="badge">عرض محدود</span>
                <h3>خصم 30% على <br/> أول حجز لك!</h3>
                <p>استمتع بأفضل الخدمات المنزلية بأقل الأسعار</p>
                <button class="hero-btn">اكتشف العروض</button>
            </div>
            <div class="hero-image">
                <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop" alt="Repair" />
            </div>
        </div>
    </section>

    <section class="categories-section">
        <div class="section-header">
            <h3 class="section-title">التصنيفات</h3>
            <button class="see-all">الكل</button>
        </div>
        <div class="category-grid">
            {#each ["صيانة", "تنظيف", "كهرباء", "سباكة"] as cat, i}
                <div class="category-item glass-card" in:fly={{ x: 20, delay: 300 + (i * 100) }}>
                    <span>{cat}</span>
                </div>
            {/each}
        </div>
    </section>

    <section class="services-section">
        <div class="section-header">
            <h3 class="section-title">الخدمات الأكثر طلباً</h3>
        </div>

        <div class="services-grid">
            {#each filteredServices as service, i}
                <div 
                    class="service-card glass-card" 
                    on:click={() => selectService(service)}
                    in:fly={{ y: 20, delay: 400 + (i * 100) }}
                >
                    <div class="image-wrapper">
                        <img src={service.image} alt={service.title} />
                        <div class="price-badge">{service.price}$</div>
                    </div>
                    <div class="card-info">
                        <div class="title-row">
                            <h4>{service.title}</h4>
                            <div class="rating">
                                <i class="fa-solid fa-star"></i>
                                <span>4.8</span>
                            </div>
                        </div>
                        <div class="meta-row">
                            <span class="time"><i class="fa-regular fa-clock"></i> 45-60 دقيقة</span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>
</div>

<style>
    .page {
        padding: 24px;
        padding-top: env(safe-area-inset-top, 24px);
    }

    .header {
        margin-bottom: 24px;
    }

    .top-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .avatar {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
    }

    .greeting {
        font-size: 14px;
        color: var(--text-muted);
    }

    .user-name {
        font-size: 18px;
        font-weight: 700;
    }

    .notification-btn {
        width: 48px;
        height: 48px;
        background: var(--bg-card);
        border: 1px solid var(--glass-border);
        border-radius: 14px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .dot {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 8px;
        height: 8px;
        background: #ef4444;
        border-radius: 50%;
        border: 2px solid var(--bg-dark);
    }

    .search-box {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        border-radius: var(--radius-sm);
    }

    .search-box i {
        color: var(--text-muted);
    }

    .search-box input {
        background: transparent;
        border: none;
        color: white;
        width: 100%;
        font-family: inherit;
        font-size: 15px;
        outline: none;
    }

    .hero-section {
        margin-bottom: 32px;
    }

    .hero-card {
        height: 180px;
        overflow: hidden;
        display: flex;
        position: relative;
    }

    .hero-content {
        padding: 20px;
        flex: 1;
        z-index: 2;
        background: linear-gradient(90deg, var(--bg-dark) 40%, transparent);
    }

    .badge {
        background: var(--accent);
        color: white;
        font-size: 10px;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 20px;
        text-transform: uppercase;
        margin-bottom: 12px;
        display: inline-block;
    }

    .hero-content h3 {
        font-size: 20px;
        margin-bottom: 8px;
        line-height: 1.2;
    }

    .hero-content p {
        font-size: 12px;
        color: var(--text-muted);
        margin-bottom: 16px;
    }

    .hero-btn {
        background: var(--primary);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
    }

    .hero-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .hero-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.6;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .see-all {
        color: var(--primary);
        font-size: 14px;
        font-weight: 600;
        background: transparent;
    }

    .category-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-bottom: 32px;
    }

    .category-item {
        padding: 12px 4px;
        text-align: center;
        font-size: 13px;
        font-weight: 600;
    }

    .services-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .service-card {
        overflow: hidden;
    }

    .image-wrapper {
        height: 180px;
        position: relative;
    }

    .image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .price-badge {
        position: absolute;
        bottom: 16px;
        right: 16px;
        background: var(--primary);
        color: white;
        padding: 6px 16px;
        border-radius: 12px;
        font-weight: 800;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    }

    .card-info {
        padding: 16px;
    }

    .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }

    .title-row h4 {
        font-size: 17px;
    }

    .rating {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--accent);
        font-size: 14px;
    }

    .meta-row {
        color: var(--text-muted);
        font-size: 13px;
    }
</style>
