<script setup lang="ts">
import { engine_state_store } from "./stores/engine_state";
import { debug_view_store } from "./stores/debug_view";
import { RouterView } from "vue-router";
import { Engine } from "./scripts/engine";
import { watch } from "vue";
import DebugView from "./views/DebugView.vue";
import NavBar from "./components/NavBar.vue";

const engine_state = engine_state_store();
const debug_view = debug_view_store();
const engine = new Engine();

watch(engine_state, () => {
  engine.set_state(engine_state.state);
});

debug_view.set_visible(false);
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <DebugView />
    <RouterView />
  </main>
</template>

<style scoped></style>
