<template>
  <div>
    <HeaderComponent class="text-center"/>
    <b-container class="headerPage">
      <b-row>
        <h1 class="text-center">Le nouveau "Social Media" de Groupomania est arrivé</h1>
        <p class="my-4 fs-5 text-justify">
          Nous avons le plaisir, {{ $store.state.user }}, de vous présenter le nouveau réseau social de Groupomania. 
          Celui-ci est composé de 2 rubriques vous permettant de partager et de commenter : 
        </p>
        <b-row class="text-center align-items-center w-100 mx-auto py-2">
          <router-link to="texts" class="col-md-5 border border-secondary rounded text-center mx-auto my-4 text-decoration-none text-danger ">
            <h2 class="my-2 fs-2"> Des articles </h2>
            <img class="homeImage my-2" alt="Image permettant d'accéder au forum de partage de textes" src="../assets/forum-text.jpg">
          </router-link>
          <router-link to="images" class="col-md-5 border border-secondary rounded text-center mx-auto my-4 text-decoration-none text-danger">
            <h2 class="my-2 fs-2"> Des images </h2>
            <img class="homeImage my-2" alt="Image permettant d'accéder au forum de partage de textes" src="../assets/forum-image.jpg">
          </router-link>
        </b-row>
      </b-row>  
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

  
  .headerPage {
    margin-top: 100px;
  }
  .homeImage{
    
    max-width: 100%;
    // height: auto;
    object-fit:contain;
  }
</style>
