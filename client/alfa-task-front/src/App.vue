<template>
  <div>
    <router-view><MenuComponent/></router-view>
    <DataBlockComponent/>
  </div>
</template>

<script>
import DataBlockComponent from './components/DataBlockComponent.vue';
import MenuComponent from './components/MenuComponent.vue';


export default {
  name: 'App',
  components: {
    DataBlockComponent,
    MenuComponent
  }
}
</script>

<style>
</style>
