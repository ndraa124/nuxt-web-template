<template>
  <div>
    <div id="app">
      <div class="main-wrapper">
        <Navbar />
        <Sidebar />

        <div class="main-content">
          <section class="section">
            <NuxtPage />
          </section>
        </div>

        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  path: "/",
  middleware: ["auth"],
});

useHead({
  bodyAttrs: {
    class: "sidebar-mini",
  },
});
</script>
