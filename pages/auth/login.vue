<template>
  <div id="app">
    <section class="section">
      <div class="container mt-5">
        <div class="row">
          <div
            class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4"
          >
            <div class="login-brand">
              <img
                src="https://placehold.co/600x320"
                alt="logo"
                width="240"
                class="shadow-light"
              />
              <h4 class="text-center mt-3">Nuxt Web Template</h4>
            </div>

            <NuxtPage />

            <div class="simple-footer">&copy;{{ cpYear }} - PT. Serba Bisa - ID-124</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: "Nuxt Web Template | Login",
});

const cpYear = new Date().getFullYear();
</script>
