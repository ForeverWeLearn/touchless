<template>
  <div id="debug-container">
    <div class="video-container">
      <video id="webcam" autoplay playsinline></video>
      <canvas id="webcam-overlay"></canvas>
    </div>
  </div>
</template>

<style scoped>
#debug-container {
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
  width: 100%;
  height: 100%;
}
</style>
