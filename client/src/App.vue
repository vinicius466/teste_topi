<template>
  <div id="app">
    <div>
      <OrgHeader />
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import OrgHeader from './components/OrgHeader.vue'

export default {
  name: 'app',
  components: { 
    OrgHeader,
  },
}
</script>

<style lang="scss">
</style>
