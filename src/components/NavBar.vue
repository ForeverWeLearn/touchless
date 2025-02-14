<script setup lang="ts">
import { RouterLink } from "vue-router";

document.addEventListener("mousemove", function (event) {
  const navbar: any = document.getElementsByClassName("navbar")[0];
  if (event.clientY < 50) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-60px";
  }
});
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <RouterLink class="navbar-brand" to="/">
      <img
        src="/src/assets/hand.svg"
        width="30"
        height="30"
        class="d-inline-block align-top mx-3"
        alt=""
      />
      <strong>TOUCHLESS</strong>
    </RouterLink>
    <div class="collapse navbar-collapse mx-2" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <RouterLink class="nav-link" to="/">HOME</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/customize">CUSTOMIZE</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/about">ABOUT</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/experimental"
            >EXPERIMENTAL</RouterLink
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: -0px;
  left: 0;
  right: 0;
  transition: top 0.3s ease-in-out;
}
</style>
