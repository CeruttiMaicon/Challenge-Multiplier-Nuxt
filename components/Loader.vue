<template lang="html">
  <div class="loading-page text-center" v-if="loading">
    <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
  </div>
</template>
<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 350px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
