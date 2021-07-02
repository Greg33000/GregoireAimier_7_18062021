<template>
  <div class="home h-100">
    <b-container>
      <b-jumbotron v-if="maxWidth === false" >
        <b-row class="h-100 align-items-center">
          <b-col cols="6">
            <img alt="Icone entreprise" src="../assets/icon-above-font.svg">
          </b-col>
          <b-col cols="6">
            <b-nav tabs>
              <b-nav-item class="align-self-end" v-bind:active="false" tag="router-link" to="/connexion">Se connecter</b-nav-item>
              <b-nav-item class="align-self-end" v-bind:active="true" tag="router-link" to="/identification" >S'identifier</b-nav-item>
            </b-nav>
            <b-card bg-variant="light">   
              <SignupComponent class="text-center"/> 
            </b-card>
          </b-col>
        </b-row>
      </b-jumbotron>
      <b-jumbotron v-if="maxWidth === true" >
        <b-row class="h-100 align-items-center">
          <img id="img" alt="Icone entreprise" src="../assets/icon-above-font.svg">
          <b-nav tabs>
            <b-nav-item class="align-self-end" v-bind:active="false" tag="router-link" to="/connexion">Se connecter</b-nav-item>
            <b-nav-item class="align-self-end" v-bind:active="true" tag="router-link" to="/identification" >S'identifier</b-nav-item>
          </b-nav>
          <b-card bg-variant="light">   
            <SignupComponent class="text-center"/> 
          </b-card>
        </b-row>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>

import SignupComponent from '../components/SignupComponent.vue';

export default {
  name: "Connexion",
  components: {
    SignupComponent,
  },
  
  // attributs calculés
  computed: {
    
    maxWidth() {
      if (window.matchMedia("(max-width: 770px)").matches) {
        return true
      } else { return false } 
    },
  },
  methods: {
    test() {
      window.location.href == 'http://localhost:8080/#/indentification';
    },
  }
}


</script>

<style lang="scss">

  #img {
    margin: -20% 0%;
  };
  a {
      font-weight: bold;
      color: #2c3e50;
      text-decoration: none;

      &.router-link-exact-active {
        color: red;
      }
    }
</style>