<script>
  import { onMount } from "svelte";
  import Home from "./lib/Home.svelte";
  import ServiceDetail from "./lib/ServiceDetail.svelte";
  import Booking from "./lib/Booking.svelte";
  import Payment from "./lib/Payment.svelte";
  import Success from "./lib/Success.svelte";

  let page = "home";
  let data = null;
  let bookingData = null;
  let authToken = "";

  onMount(async () => {
    // 1. Check URL Token (Deep link / Dev)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      authenticate(token);
    }

    // 2. Check MiniApp Environment
    if (typeof my !== "undefined") {
      my.getAuthCode({
        scopes: ["auth_base", "USER_ID"],
        success: (res) => {
          // Send res.authCode to backend as token
          if (res.authCode) {
            // Using my.request for native handling if available
            my.request({
              url: "https://its.mouamle.space/api/auth-with-superQi",
              method: "POST",
              headers: { "Content-Type": "application/json" },
              data: {
                token: res.authCode,
              },
              success: (response) => {
                console.log("MiniApp Auth Success:", response);
                if (response.data && response.data.token) {
                  authToken = response.data.token;
                }
              },
              fail: (err) => {
                console.error("MiniApp Auth API Failed:", err);
              },
            });
          }
        },
        fail: (err) => {
          console.log("Authorization failed:", err);
        },
      });
    }
  });

  async function authenticate(token) {
    try {
      const res = await fetch(
        "https://its.mouamle.space/api/auth-with-superQi",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        },
      );
      const result = await res.json();
      console.log("Web Auth Successful:", result);
      if (result.token) {
        authToken = result.token;
      } else {
        // Fallback if the API returns just success or the input token is the session token
        authToken = token;
      }
    } catch (e) {
      console.error("Web Auth Failed:", e);
    }
  }

  function handleNavigate(event) {
    const { page: nextPage, data: nextData } = event.detail;
    page = nextPage;
    if (nextData) {
      // If payment page, we have nested data {service, booking}
      if (page === "payment") {
        data = nextData.service;
        bookingData = nextData.booking;
      } else {
        data = nextData;
      }
    }
    window.scrollTo(0, 0);
  }
</script>

<main class="container">
  {#if page === "home"}
    <Home on:navigate={handleNavigate} />
  {:else if page === "detail"}
    <ServiceDetail service={data} on:navigate={handleNavigate} />
  {:else if page === "booking"}
    <Booking service={data} on:navigate={handleNavigate} />
  {:else if page === "payment"}
    <Payment
      service={data}
      booking={bookingData}
      token={authToken}
      on:navigate={handleNavigate}
    />
  {:else if page === "success"}
    <Success on:navigate={handleNavigate} />
  {/if}
</main>

<style>
  /* Global styles are in app.css */
</style>
