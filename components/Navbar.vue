<template>
  <div>
    <div class="navbar-bg navbar-success"></div>
    <nav class="navbar navbar-expand-lg main-navbar">
      <form class="form-inline mr-auto">
        <ul class="navbar-nav mr-3">
          <li>
            <a href="#" data-toggle="sidebar" class="nav-link nav-link-lg"
              ><i class="fas fa-bars"></i
            ></a>
          </li>
        </ul>
      </form>
      <ul class="navbar-nav navbar-right" v-if="auth.isLoggedIn">
        <li class="dropdown">
          <a
            href="#"
            data-toggle="dropdown"
            class="nav-link dropdown-toggle nav-link-lg nav-link-user"
          >
            <img
              alt="image"
              src="/img/avatar/avatar-1.png"
              class="rounded-circle mr-1"
            />
            <div class="d-sm-none d-lg-inline-block">
              Hi, {{ auth.user.full_name }}
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a
              href="javascript:void(0)"
              class="dropdown-item has-icon text-danger"
              @click="logout"
            >
              <i class="fas fa-sign-out-alt"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/useAuthStore";

const auth = useAuthStore();
const logout = () => auth.logout();
</script>
