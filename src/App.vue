<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import { Engine } from "./scripts/engine";
import NavBar from "./components/NavBar.vue";
import DebugView from "./views/DebugView.vue";

const engine = new Engine();
const debugMarginTop = ref("margin-top: 0");

function setDebugVisible(state: boolean) {
  if (state) {
    debugMarginTop.value = "margin-top: 0";
  } else {
    debugMarginTop.value = "margin-top: -100vh";
  }
}

setDebugVisible(false);
</script>

<template>
  <header>
    <NavBar
      @changeEngineState="(state: boolean) => engine.setState(state)"
      @changeDebugState="(state: boolean) => setDebugVisible(state)"
    />
  </header>
  <main>
    <DebugView :style="debugMarginTop" />
    <RouterView />
  </main>
</template>

<style scoped></style>
