<template>
  <div>
    <HeaderComponent class="text-center"/>
    <b-container class="bodyHome">
      <b-jumbotron>
        <h1 class="text-center">Bienvenue {{ $store.state.user }}</h1>
        <h2 class="text-center">Voici vos dernières contributions :</h2>
      </b-jumbotron>
    </b-container>
  </div>

</template>

<script>
// @ is an alias to /src
import HeaderComponent from '@/components/HeaderComponent.vue'

export default {
  name: 'HeaderCompo',
  components: {
    HeaderComponent
  },
  

}
</script>


<style lang="scss">

  
  .bodyHome {
    margin-top: 100px;
  }
</style>
