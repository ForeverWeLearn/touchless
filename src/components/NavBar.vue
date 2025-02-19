<script setup lang="ts">
import { engine_state_store } from "../stores/engine_state";
import { debug_view_store } from "../stores/debug_view";
import { getCurrentWindow } from '@tauri-apps/api/window';
import { RouterLink } from "vue-router";

const engine_state = engine_state_store();
const debug_view = debug_view_store();
const appWindow = getCurrentWindow();

document
  .getElementById('titlebar-minimize')
  ?.addEventListener('click', () => appWindow.minimize());
document
  .getElementById('titlebar-maximize')
  ?.addEventListener('click', () => appWindow.toggleMaximize());
document
  .getElementById('titlebar-close')
  ?.addEventListener('click', () => appWindow.close());

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
  <nav class="navbar navbar-expand navbar-dark bg-transparent">
    <RouterLink class="navbar-brand" to="/">
      <img src="/src/assets/hand.svg" width="30" height="30" class="d-inline-block align-top ms-4 me-3" />
      <span @click="debug_view.set_visible(false)"><strong>TOUCHLESS</strong></span>
    </RouterLink>

    <div class="collapse navbar-collapse mx-2" data-tauri-drag-region>
      <ul class="navbar-nav">
        <li class="nav-item active">
          <RouterLink class="nav-link" to="/"><span @click="debug_view.set_visible(false)">HOME</span></RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/customize">
            <span @click="debug_view.set_visible(false)">CUSTOMIZE</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/about">
            <span @click="debug_view.set_visible(false)">ABOUT</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/experimental">
            <span @click="debug_view.set_visible(false)">EXPERIMENTAL</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="debug_view.set_visible(true)" style="cursor: pointer">VISUALIZE</a>
        </li>
      </ul>

      <div class="ms-auto d-flex align-items-center me-3">
        <button @click="engine_state.change_state(true)" class="btn btn-success me-2 px-5"
          :disabled="engine_state.state">
          <strong>Run</strong>
        </button>
        <button @click="engine_state.change_state(false)" class="btn btn-danger me-2 px-4"
          :disabled="!engine_state.state">
          <strong>Stop</strong>
        </button>
      </div>

      <div class="ms-auto d-flex align-items-center">
        <button id="titlebar-minimize" class="titlebar-button" @click="appWindow.minimize()">
          <img src="../assets/titlebar/circle/minimize.svg" alt="Minimize" />
        </button>
        <button id="titlebar-maximize" class="titlebar-button" @click="appWindow.toggleMaximize()">
          <img src="../assets/titlebar/circle/maximize.svg" alt="Maximize" />
        </button>
        <button id="titlebar-close" class="titlebar-button" @click="appWindow.close()">
          <img src="../assets/titlebar/circle/close.svg" alt="Close" />
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: rgba(26, 26, 30, 0.8) !important;
  position: fixed;
  top: -60px;
  left: 0;
  right: 0;
  transition: top 0.3s ease-in-out;
  backdrop-filter: blur(10px);
}

.navbar-brand {
  transition: 0.3s ease-in-out;
}

.navbar-brand:hover {
  transform: scale(1.125);
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.37));
}

.nav-link {
  color: rgb(210, 210, 210);
  font-weight: 400;
  text-underline-offset: 10px;
}

.nav-link:hover {
  color: white;
  text-decoration: underline;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background-color: transparent;
  opacity: 0.3;
}

.titlebar-button:hover {
  opacity: 1;
}

.titlebar-button>img {
  width: 30px;
  height: 30px;
}

#titlebar-minimize:hover {
  filter: drop-shadow(0 0 10px rgba(255, 196, 0, 0.6));
}

#titlebar-maximize:hover {
  filter: drop-shadow(0 0 10px rgba(0, 255, 195, 0.6));
}

#titlebar-close:hover {
  filter: drop-shadow(0 0 10px rgba(255, 37, 37, 0.6));
}
</style>
