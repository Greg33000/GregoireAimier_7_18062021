<!-- This is the user account page. -->

<template>
  <div class="background">

    <!-- header of the page with the header component. -->
    <div class ="fixed-top bg-white" >
      <HeaderComponent class="text-center"/>
    </div>

    <!-- body of the page with user informations. -->
    <b-container class="headerPage">
      <b-row>
        <h1 class="text-center">Mes données personnelles</h1>
        <p class="my-4 fs-5 text-justify">
          nom d'utilisateur : {{user.username}}
        </p>
        <p class="my-4 fs-5 text-justify">
          email : {{ email }}
        </p>
        <p class="my-4 fs-5 text-justify">
          Compte créé le : {{ date }}
        </p>
        <b-row class="justify-content-center">
          <button class="btn btn-danger border-0 mx-2 my-1 col-6" type="button" @click="suppAccount">Suppression du compte</button>
        </b-row>
      </b-row>  
    </b-container>
  </div>
</template>

<script>

  import { mapMutations } from "vuex";
  import HeaderComponent from '@/components/HeaderComponent.vue'

  export default {
    name: 'Account',
    components: {
      HeaderComponent
    },

    data() {
      return {
        user: {},
        email: this.$store.state.email,
        date: "",
      }
    },

    methods: {  

      ...mapMutations(["setUser", "setToken","setRoles","setEmail"]), // to be possible to modify store in vuex

      // Transform date in visual french date
      transfoDate(date) {
        var dateInput = new Date(date);
        var dateLocale = dateInput.toLocaleString('fr-FR',{
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        });
        return dateLocale;
      },

      // To log out and initializing the store vuex
      logoutUser() {
        this.setUser(null);
        this.setToken(null);
        this.setRoles([]);
        this.setEmail(null);
        this.$router.push("/connexion");
      },

      // To recover the user datas
      seeUser() {
        fetch("http://localhost:3000/api/auth/" + this.$store.state.user, {
          method: "GET",
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'x-access-token': this.$store.state.token
          },
        })
        .then(function(res) {
          return res.json();
        })
        .then(data => {
          this.user = data
          this.date = this.transfoDate(data.createdAt);
        })           
      },

      // To delete user account
      suppAccount() {    
        if (confirm("Etes-vous sûr de vouloir supprimer votre compte ?")) { // confirmation of deleting account    
          fetch("http://localhost:3000/api/auth/" + this.$store.state.user, {
            method: "DELETE",
            headers: {
              'Accept': 'application/json', 
              'Content-Type': 'application/json',
              'x-access-token': this.$store.state.token
            },
          })
          .then(function(res) {
            return res.json();
          })
          .then(value => {
            if (!value.error) {
              this.logoutUser()
            }
          })
        }
      }, 
    },

    mounted() {
      this.seeUser()
      
    },  
  }

</script>


<style lang="scss">
  
  .headerPage {
    margin-top: 100px;
  }
  
</style>
