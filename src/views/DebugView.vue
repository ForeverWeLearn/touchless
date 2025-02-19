<script setup lang="ts">
import { debug_view_store } from '../stores/debug_view';
import HandResult from '../components/HandResult.vue';

const debug_view = debug_view_store();
</script>

<template>
  <div class="debug-container" :style="debug_view.style">
    <HandResult :left="true">LEFT</HandResult>
    <div class="video-container">
      <video width="640" height="480" id="webcam" autoplay playsinline></video>
      <canvas width="640" height="480" id="webcam-overlay"></canvas>
    </div>
    <HandResult :left="false">RIGHT</HandResult>
  </div>
</template>

<style scoped>
.debug-container {
  margin-top: -100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  height: 100vh;
  background-color: #191919;
}

.video-container {
  position: relative;
  margin-top: 60px;
  width: 640px;
  height: 480px;
}

video {
  transform: rotateY(180deg);
}

video,
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
