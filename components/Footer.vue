<template>
  <div>
    <footer class="main-footer">
      <div class="footer-left">
        &copy;{{ cpYear }}
        <div class="bullet"></div>
        <a href="#" target="_blank"> PT. Serba Bisa </a>
        - ID-124
      </div>
      <div class="footer-right">v1.0.0</div>
    </footer>
  </div>
</template>

<script setup>
const cpYear = new Date().getFullYear();
</script>
