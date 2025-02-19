import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const debug_view_store = defineStore("debug_view", () => {
  const visible = ref(false);

  const style = computed(() => `margin-top: ${visible.value ? 0 : -100}vh`);

  function set_visible(state: boolean) {
    visible.value = state;

    if (state) {
      set_document_overflow("hidden");
      document.documentElement.scrollTop = 0;
    } else {
      set_document_overflow("visible");
    }
  }

  function set_document_overflow(value: string) {
    document.body.style.overflow = value;
    document.documentElement.style.overflow = value;
  }

  return { visible, style, set_visible };
});
