<!-- This is the images page Nothing on this page for now. -->

<template>
  <div class="background">
    <div class ="fixed-top bg-white" >
      <!-- header of the page with the header component. -->
      <HeaderComponent class="text-center"/>

      <!-- body of the page. -->
      <b-container class="headerPage">
        <h1 class="text-center">Page en cours de création</h1>
      </b-container>
    </div>
  </div>
</template>


<script>

  import HeaderComponent from '../components/HeaderComponent.vue'

  export default {
    name: 'Image',
    components: {
      HeaderComponent
    }
  }
</script>
