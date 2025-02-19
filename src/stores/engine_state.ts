import { defineStore } from "pinia";
import { ref } from "vue";

export const engine_state_store = defineStore("engine_state", () => {
  const state = ref(false);

  function change_state(bool: boolean) {
    state.value = bool;
  }

  return { state, change_state };
});
