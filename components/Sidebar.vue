<template>
  <div class="main-sidebar">
    <aside id="sidebar-wrapper">
      <div class="sidebar-brand">
        <a href="/">
          <img alt="image" src="/img/logo.png" class="rounded mr-1" width="120px" />
        </a>
      </div>

      <div class="sidebar-brand sidebar-brand-sm">
        <a href="/">
          <img alt="image" src="/img/logo.png" class="rounded mr-1" width="45px" />
        </a>
      </div>

      <ul class="sidebar-menu">
        <li class="menu-header">Main</li>
        <li class="nav-item" :class="{ active: route.path == '/' ? 'active' : '' }">
          <a class="nav-link" href="/">
            <i class="fas fa-home"></i>
            <span>Dashboard</span>
          </a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup>
const route = useRoute();
</script>
