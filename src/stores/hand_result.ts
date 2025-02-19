import { ref, computed } from "vue";
import { defineStore } from "pinia";

function create_store<Id extends string>(id: Id) {
  return defineStore(id, () => {
    const engine_state = ref(false);
    const scanning = ref(false);
    const icon_folder_path = `imgs/hand/${id[0] == "l" ? "left" : "right"}`;

    const gesture = ref("NONE");
    const hold_time = ref(0);
    const confidence = ref(0);
    const stability = ref(0);

    const gesture_text = computed(() => engine_state.value ? (scanning.value ? "SCANNING" : gesture.value) : "NONE");
    const hold_time_second = computed(() => (hold_time.value / 1000).toFixed(1));
    const confidence_percent = computed(() => (confidence.value * 100).toFixed(0));
    const icon_path = computed(() => {
      if (!engine_state.value) {
        return `${icon_folder_path}/NONE.svg`;
      }
      if (scanning.value) {
        return `${icon_folder_path}/SCANNING.svg`;
      }
      return `${icon_folder_path}/${gesture.value}.svg`;
    });

    return {
      engine_state,
      scanning,
      gesture,
      hold_time,
      confidence,
      stability,
      gesture_text,
      hold_time_second,
      confidence_percent,
      icon_path,
    };
  });
}

export const left_hand_result_store = create_store("left_hand_result");
export const right_hand_result_store = create_store("right_hand_result");
