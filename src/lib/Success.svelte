<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { scale } from "svelte/transition";

    const dispatch = createEventDispatcher();

    function home() {
        dispatch("navigate", { page: "home" });
    }

    onMount(() => {
        // Optional: confetti or sound
    });
</script>

<div class="page centered">
    <div class="icon-circle" in:scale={{ duration: 500, start: 0.5 }}>
        <i class="fa-solid fa-check"></i>
    </div>

    <h1>تم الحجز بنجاح!</h1>
    <p>شكراً لك، سيتم التواصل معك قريباً لتأكيد الموعد.</p>

    <div class="ticket">
        <div class="line"></div>
        <div class="details">
            <span>رقم الحجز</span>
            <h3>#SF-9021</h3>
        </div>
    </div>

    <button class="btn-primary" on:click={home}> العودة للرئيسية </button>
</div>

<style>
    .page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        text-align: center;
    }

    .icon-circle {
        width: 100px;
        height: 100px;
        background: var(--secondary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        color: white;
        margin-bottom: 30px;
        box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
    }

    h1 {
        font-size: 28px;
        margin-bottom: 12px;
    }

    p {
        color: var(--text-muted);
        margin-bottom: 40px;
    }

    .ticket {
        background: var(--card-bg);
        padding: 20px 40px;
        border-radius: 16px;
        border: 1px solid var(--glass-border);
        margin-bottom: 40px;
        width: 100%;
    }

    .details span {
        display: block;
        color: var(--text-muted);
        font-size: 14px;
        margin-bottom: 4px;
    }

    .details h3 {
        font-size: 24px;
        letter-spacing: 2px;
        color: var(--primary-light);
    }
</style>
