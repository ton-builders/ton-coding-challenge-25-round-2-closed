<template>
  <div class="p-4 text-center text-lg">
    Hello from Mini App! <br />
    Developer username: <strong>@Tuptuppp</strong>
  </div>
  <h1>For Round 2 for Ton Contest</h1>
  <script>
    export default {
      mounted() {
        if (window.Telegram.WebApp) {
          window.Telegram.WebApp.ready();
          window.Telegram.WebApp.toggleFullscreen();
        }
      },
    };
  </script>
</template>
