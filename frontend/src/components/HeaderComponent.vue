<template>
  <div class ="fixed-top bg-white" >
    <div id="nav" v-if="maxWidth === false">
      <b-row class="align-items-center"></b-row>
      <b-row class="h-100">
        <b-nav tabs>
          <b-nav-item class="align-self-end" v-bind:active="elt1" tag="router-link" to="/home">Home</b-nav-item>
          <b-nav-item class="align-self-end" v-bind:active="elt2" tag="router-link" to="/reddit">Reddit</b-nav-item>
          <b-nav-item class="align-self-end" v-bind:active="elt3" tag="router-link" to="/9gag">9gag</b-nav-item>
          
          <b-nav-item-dropdown
            id="my-nav-dropdown"
            class="ms-auto align-self-end"
            text="Compte"
            toggle-class="nav-link-custom"
            right
          >
            <b-dropdown-item>Votre profil</b-dropdown-item>
            <b-dropdown-item>Vos posts</b-dropdown-item>
            <b-dropdown-item>Vos commentaires</b-dropdown-item>
            <b-dropdown-item>Posts aimés</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item tag="router-link" to="/">Se déconnecter</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav> 
      </b-row>
    </div>   
    <div id="nav" v-if="maxWidth === true">
      <b-row class="align-items-center"></b-row>
      <b-row class="h-100">
        <b-nav tabs>
          <b-nav-item-dropdown
            id="my-nav-dropdown"
            class="align-self-end"
            v-bind:text="elt"
            toggle-class="nav-link-custom"
            right
          >
            <b-dropdown-item tag="router-link" to="/home">Home</b-dropdown-item>
            <b-dropdown-item tag="router-link" to="/reddit">Reddit</b-dropdown-item>
            <b-dropdown-item tag="router-link" to="/9gag">9gag</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown
            id="my-nav-dropdown"
            class="ms-auto align-self-end"
            text="Compte"
            toggle-class="nav-link-custom"
            right
          >
            <b-dropdown-item>Votre profil</b-dropdown-item>
            <b-dropdown-item>Vos posts</b-dropdown-item>
            <b-dropdown-item>Vos commentaires</b-dropdown-item>
            <b-dropdown-item>Posts aimés</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item tag="router-link" to="/">Se déconnecter</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav> 
      </b-row>
    </div>   
  </div>
</template>

<script>

  export default {
    // nom
    name: "ActiveElement",

    // attributs calculés
    computed: {
      elt1() {
        if (window.location.href == 'http://localhost:8080/#/home' ) {
          return true
        }
        else {return false}
      },
      elt2() {
        if (window.location.href == 'http://localhost:8080/#/reddit' ) {
          return true
        }
        else {return false}
      },
      elt3() {
        if (window.location.href == 'http://localhost:8080/#/9gag' ) {
          return true
        }
        else {return false}
      },
      elt(){
        if (this.elt1 == true) {
          return "Home"
        } else if (this.elt2 == true) {
          return "Reddit"
        } else if (this.elt3 == true) {
          return "9gag"
        } else {
          return "Home"
        }
      },
      maxWidth() {
        if (window.matchMedia("(max-width: 540px)").matches) {
          return true
        }
        else { return false }
      }
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

      &.router-link-exact-active {
        color: red;
      }
    }
  }
</style>