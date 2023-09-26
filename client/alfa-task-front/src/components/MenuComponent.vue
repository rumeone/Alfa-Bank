<template>
  <div class="text-center mt-3">
    <button class="btn btn-primary mx-2" @click="navigateToHome('/#home')">Начало</button>
    <button class="btn btn-primary mx-2" @click="navigateToTop5('/#top')">Топ 5</button>
    <button class="btn btn-primary mx-2" @click="navigateToFullList('/#full')">Весь список</button>
  </div>

</template>

<script>
export default {
  methods: {
    navigateToHome(route) {
      this.$router.push(route).catch(() => {});
      this.$emit('menu-clicked', route);
    },
    navigateToTop5(route) {
      this.$router.push(route).catch(() => {});
      this.$emit('menu-clicked', route);
    },
    navigateToFullList(route) {
      this.$router.push(route).catch(() => {});
      this.$emit('menu-clicked', route);
    }
  }
};
</script>
