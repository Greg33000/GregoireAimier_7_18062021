<template>
  <div>
    <div>
      <HeaderComponent class="text-center"/>
    </div>
    <div>
      <h1>This is the 9gag page</h1>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import HeaderComponent from '../components/HeaderComponent.vue'

export default {
  name: 'HeaderCompo',
  components: {
    HeaderComponent
  }
}
</script>
