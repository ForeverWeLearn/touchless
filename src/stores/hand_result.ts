import { ref, computed } from "vue";
import { defineStore } from "pinia";

function create_store<Id extends string>(id: Id) {
  return defineStore(id, () => {
    const handedness = id[0] == "l" ? "left" : "right";

    const gesture = ref("NONE");
    const hold_time = ref(0);
    const confidence = ref(0);
    const stability = ref(0);

    const hold_time_second = computed(() => (hold_time.value / 1000).toFixed(1));
    const confidence_percent = computed(() => (confidence.value * 100).toFixed(0));
    const icon_path = computed(() => `imgs/hand/${handedness}/${gesture.value}.svg`);

    return {
      gesture,
      hold_time,
      confidence,
      stability,
      hold_time_second,
      confidence_percent,
      icon_path,
    };
  });
}

export const left_hand_result_store = create_store("left_hand_result");
export const right_hand_result_store = create_store("right_hand_result");
