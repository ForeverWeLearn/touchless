<script setup lang="ts">
import { left_hand_result_store, right_hand_result_store } from "../stores/hand_result";

const props = defineProps({
  left: Boolean,
});

let hand_result: any;

if (props.left) {
  hand_result = left_hand_result_store();
} else {
  hand_result = right_hand_result_store();
}
</script>

<template>
  <div class="container text-center m-4 text-light">
    <h1>
      <slot>HANDEDNESS</slot>
    </h1>
    <h4 class="mb-4" style="word-break: break-all">{{ hand_result.gesture }}</h4>

    <div class="d-flex align-items-center justify-content-center">
      <img :src="hand_result.icon_path" alt="Gesture" class="img-fluid" />
    </div>

    <table class="table table-dark mt-4">
      <tbody>
        <tr>
          <th>Hold Time</th>
          <td>{{ hand_result.hold_time_second }}s</td>
        </tr>
        <!-- <tr>
          <th>Confidence</th>
          <td>{{ hand_result.confidence_percent }}%</td>
        </tr>
        <tr>
          <th>Stability</th>
          <td>{{ hand_result.stability }}</td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 200px;
}
</style>
