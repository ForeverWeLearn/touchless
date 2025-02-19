<template>
  <div class="homepage" data-tauri-drag-region>
    <div class="overlay">
      <h1 class="app-name">Touchless</h1>
      <p class="tagline">Touch Nothing, Control Everything!</p>
      <button class="btn btn-warning btn-lg mt-3">Get Started</button>
    </div>
  </div>
</template>

<style scoped>
/* Full-Screen Background & Fix Overlapping Navbar */
.homepage {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #ff6b6b, #ffb830, #30cfd0, #330867);
  background-size: 300% 300%;
  animation: gradientBG 10s ease infinite;
  padding-top: 80px;
}

/* Animated Background */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.overlay {
  text-align: center;
  color: white;
}

/* Larger Title */
.app-name {
  font-size: 4.5rem;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
}

/* Tagline with Glow Effect */
.tagline {
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 10px;
  color: #f8f9fa;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Stylish Call-to-Action Button */
.btn-warning {
  font-size: 1.3rem;
  padding: 12px 30px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(255, 167, 38, 0.4);
  transition: all 0.3s ease;
}

.btn-warning:hover {
  background-color: #ff9f1c;
  box-shadow: 0px 8px 20px rgba(255, 167, 38, 0.6);
}
</style>
