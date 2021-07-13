<!-- This is the header component for all pages except Signin and Signup vue. -->

<template>
  <div class ="fixed-top bg-white" >

  <!-- If max-width of the screen is > 540 px this part is active. The nav buttons are in line . -->
    <div id="nav" v-if="maxWidth === false">
      <b-row class="align-items-center"></b-row>
      <b-row class="h-100">
        <b-nav tabs>
          <!-- Nav buttons . -->
          <b-navbar class="py-0">
            <b-nav-item class="align-self-end" v-bind:active="elt1" tag="router-link" to="/home">Accueil</b-nav-item>
            <b-nav-item class="align-self-end" v-bind:active="elt2" tag="router-link" to="/texts">Articles</b-nav-item>
            <b-nav-item class="align-self-end" v-bind:active="elt3" tag="router-link" to="/images">Images</b-nav-item>
          </b-navbar>
          <!-- Account buttons . -->
          <b-nav-item-dropdown
            id="my-nav-dropdown"
            class="ms-auto align-self-end"
            text="Compte"
            toggle-class="nav-link-custom"
            right
          >
            <b-dropdown-item @click="seeAccount">Votre profil</b-dropdown-item>
            <b-dropdown-item>Vos posts (A venir)</b-dropdown-item>
            <b-dropdown-item>Vos commentaires (A venir)</b-dropdown-item>
            <b-dropdown-item>Posts aimés (A venir)</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="logoutUser">Se déconnecter</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav> 
      </b-row>
    </div>   

    <!-- If max-width of the screen is < 540 px this part is active. The nav buttons are not in line . -->
    <div id="nav" v-if="maxWidth === true">
      <b-row class="align-items-center"></b-row>
      <b-row class="h-100">
        <b-nav tabs>
        <!-- Nav buttons . -->
          <b-nav-item-dropdown
            id="my-nav-dropdown"
            class="align-self-end"
            v-bind:text="elt"
            toggle-class="nav-link-custom"
            right
          >
            <b-dropdown-item tag="router-link" to="/home">Accueil</b-dropdown-item>
            <b-dropdown-item tag="router-link" to="/texts">Articles</b-dropdown-item>
            <b-dropdown-item tag="router-link" to="/images">Images</b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- Account buttons . -->
          <b-nav-item-dropdown
            id="my-nav-dropdown"
            class="ms-auto align-self-end"
            text="Compte"
            toggle-class="nav-link-custom"
            right
          >
            <b-dropdown-item @click="seeAccount">Votre profil</b-dropdown-item>
            <b-dropdown-item>Vos posts (A venir)</b-dropdown-item>
            <b-dropdown-item>Vos commentaires (A venir)</b-dropdown-item>
            <b-dropdown-item>Posts aimés (A venir)</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="logoutUser">Se déconnecter</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav> 
      </b-row>
    </div>   
  </div>
</template>

<script>

  import { mapMutations } from "vuex";

  export default {

    name: "Header",

    computed: {
      // To activate home "button" if url is correct
      elt1() {
        if (window.location.href == 'http://localhost:8080/#/home' ) {
          return true
        }
        else {return false}
      },

      // To activate text "button" if url is correct
      elt2() {

        var urlCourante = document.location.href;
        urlCourante = urlCourante.split('texts')[0]
        urlCourante = urlCourante + "texts";
        if (urlCourante == 'http://localhost:8080/#/texts' ) {
          return true
        }
        else {return false}
      },

      // To activate images "button" if url is correct
      elt3() {
        if (window.location.href == 'http://localhost:8080/#/images' ) {
          return true
        }
        else {return false}
      },

      // in "max-width < 540 px" mode, show the name of the active url
      elt(){
        if (this.elt1 == true) {
          return "Accueil"
        } else if (this.elt2 == true) {
          return "Articles"
        } else if (this.elt3 == true) {
          return "Images"
        } else {
          return "Accueil"
        }
      },

      // Calculate the max-width of the screen
      maxWidth() {
        if (window.matchMedia("(max-width: 540px)").matches) {
          return true
        }
        else { return false }
      }
    },

    // méthodes
    methods: {
      
      ...mapMutations(["setUser", "setToken","setRoles","setEmail"]), // to be possible to modify store in vuex

      // To log out and initializing the store vuex
      logoutUser() {
        this.setUser(null);
        this.setToken(null);
        this.setRoles([]);
        this.setEmail(null);
        this.$router.push("/connexion");
      },

      // To go to the Account page
      seeAccount() {
        this.$router.push("/account");
      },
    }
  }

</script>


<style lang="scss">

  @import '../main.scss';
  
  #nav {
    padding: 0px 30px;
    background-image: url("../assets/icon-left-font.svg");
    background-repeat: no-repeat;
    background-size: 260px;
    background-position:center;
    height:70px;
    @include tablet{
      background-image: url("../assets/icon.svg");
      background-repeat: no-repeat;
      background-size: 50px;
      padding: 0px 10px;
    }

    a {
      font-weight: bold;
      color: #2c3e50;
      text-decoration: none;
    }
  }
  
</style>