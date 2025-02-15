<script setup lang="ts">
import { RouterLink } from "vue-router";

const emit = defineEmits(["changeEngineState", "changeDebugState"]);

function changeDebugState(state: boolean) {
  emit("changeDebugState", state);
  if (state) {
    setOverflow("hidden");
    document.documentElement.scrollTop = 0;
  } else {
    setOverflow("visible");
  }
}

function setOverflow(value: string) {
  document.body.style.overflow = value;
  document.documentElement.style.overflow = value;
}

function setEngineState(state: boolean) {
  emit("changeEngineState", state);
  if (state) {
    const btnEngineRun = document.getElementById(
      "btn-engine-run"
    ) as HTMLButtonElement;
    btnEngineRun.classList.remove("btn-success");
    btnEngineRun.classList.add("btn-outline-success");
    btnEngineRun.disabled = true;

    const btnEnginePause = document.getElementById(
      "btn-engine-pause"
    ) as HTMLButtonElement;
    btnEnginePause.classList.remove("btn-outline-warning");
    btnEnginePause.classList.add("btn-warning");
    btnEnginePause.disabled = false;
  } else {
    const btnEngineRun = document.getElementById(
      "btn-engine-run"
    ) as HTMLButtonElement;
    btnEngineRun.classList.remove("btn-outline-success");
    btnEngineRun.classList.add("btn-success");
    btnEngineRun.disabled = false;

    const btnEnginePause = document.getElementById(
      "btn-engine-pause"
    ) as HTMLButtonElement;
    btnEnginePause.classList.remove("btn-warning");
    btnEnginePause.classList.add("btn-outline-warning");
    btnEnginePause.disabled = true;
  }
}

document.addEventListener("mousemove", function (event) {
  const navbar: any = document.getElementsByClassName("navbar")[0];
  if (event.clientY < 50) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-60px";
  }
});
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <RouterLink class="navbar-brand" to="/">
      <img
        src="/src/assets/hand.svg"
        width="30"
        height="30"
        class="d-inline-block align-top ms-4 me-3"
        alt=""
      />
      <strong>TOUCHLESS</strong>
    </RouterLink>
    <div class="collapse navbar-collapse mx-2" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <RouterLink class="nav-link" to="/"
            ><span @click="changeDebugState(false)">HOME</span></RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/customize"
            ><span @click="changeDebugState(false)">CUSTOMIZE</span></RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/about"
            ><span @click="changeDebugState(false)">ABOUT</span></RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/experimental"
            ><span @click="changeDebugState(false)"
              >EXPERIMENTAL</span
            ></RouterLink
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            @click="changeDebugState(true)"
            style="cursor: pointer"
            >VISUALIZE</a
          >
        </li>
      </ul>

      <div class="ms-auto d-flex align-items-center me-3">
        <button
          @click="setEngineState(true)"
          class="btn btn-success me-2 px-5"
          id="btn-engine-run"
        >
          <strong>Run</strong>
        </button>
        <button
          @click="setEngineState(false)"
          class="btn btn-outline-warning me-2 px-4"
          id="btn-engine-pause"
          disabled
        >
          Stop
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: -60px;
  left: 0;
  right: 0;
  transition: top 0.3s ease-in-out;
}
</style>
