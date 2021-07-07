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
              <b-nav-item class="align-self-end" v-bind:active="true" tag="router-link" to="/signin">Se connecter</b-nav-item>
              <b-nav-item class="align-self-end" v-bind:active="false" tag="router-link" to="/signup" >Créer un compte</b-nav-item>
            </b-nav>
            <b-card bg-variant="light">   
              <b-form-group class="my-3">
        <b-input for="email" type="email" v-model="email" class="form-control" placeholder="Adresse email de groupomania" required/>
    </b-form-group>
    <b-form-group  class="my-3">
        <b-input type="password" v-model="password" class="form-control" placeholder="Mot de passe" required/>
    </b-form-group>
    <b-form-group  class="my-3">
        <b-col class="text-center">
            <b-button class="mx-2 my-1" variant="primary"  @click="loginUser">Connexion</b-button>
        </b-col>             
    </b-form-group> 
    <p class="text-center text-danger">{{msgError}}</p>
            </b-card>
          </b-col>
        </b-row>
      </b-jumbotron>
      <b-jumbotron v-if="maxWidth === true" >
        <b-row class="h-100 align-items-center">
          <img id="img" alt="Icone entreprise" src="../assets/icon-above-font.svg">
          <b-nav tabs>
            <b-nav-item class="align-self-end" v-bind:active="true" tag="router-link" to="/signin">Se connecter</b-nav-item>
            <b-nav-item class="align-self-end" v-bind:active="false" tag="router-link" to="/signup" >Créer un compte</b-nav-item>
          </b-nav>
          <b-card bg-variant="light">   
            <b-form-group class="my-3">
        <b-input for="email" type="email" v-model="email" class="form-control" placeholder="Adresse email de groupomania" required/>
    </b-form-group>
    <b-form-group  class="my-3">
        <b-input type="password" v-model="password" class="form-control" placeholder="Mot de passe" required/>
    </b-form-group>
    <b-form-group  class="my-3">
        <b-col class="text-center">
            <b-button class="mx-2 my-1" variant="primary"  @click="loginUser">Connexion</b-button>
        </b-col>             
    </b-form-group> 
    <p class="text-center text-danger">{{msgError}}</p>
          </b-card>
        </b-row>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>

  import { mapMutations } from "vuex";

  export default {
    name: "Signin",
  
    // données statiques
    data() {
      return {
        email: '',
        password: '',
        username: '',
        msgError: ''
      }
    },

    // attributs calculés
    computed: {
      emailValid() {
        if (this.email.indexOf("@") >= 1 & this.email.indexOf(".",this.email.indexOf("@")) != -1 & this.email.indexOf(" ") == -1) {
          return 1
        } else {return 0}
      },
      passwordValid() {
        if (this.password.indexOf(" ") == -1 & this.password != '') {
          return 1
        } else {return 0}
      },
      formValid() {
        if ((this.emailValid * this.passwordValid) == 1 ) {
          return true
        }
        else {return false}
      },
      maxWidth() {
        if (window.matchMedia("(max-width: 770px)").matches) {
          return true
        } else { return false } 
      },
    },

    methods: {
    ...mapMutations(["setUser", "setToken","setRoles"]),

      errorForm() {
        if (this.passwordValid == 0 & this.emailValid == 1) {
          this.msgError = "Votre mot de passe n'est pas valide"
          return this.msgError
        }
        if (this.passwordValid == 1 & this.emailValid == 0) {
          this.msgError = "Votre email n'est pas valide"
          return this.msgError
        }
        if (this.passwordValid == 0 & this.emailValid == 0) {
          this.msgError = "Votre email et votre mot de passe ne sont pas valides"
          return this.msgError
        }
        if (this.passwordValid == 1 & this.emailValid == 1) {
          this.msgError = ""
          return this.msgError
        }
        
      },
      
      loginUser() {
        this.errorForm()
        if (this.formValid == true) {
          let jsonBody = { 
            "email": this.email,
            "password": this.password,
          }
          fetch("http://localhost:3000/api/auth/signin", {
            method: "POST",
            headers: {
              'Accept': 'application/json', 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
          })

          .then(function(res) {
              return res.json();
          })

          .then(value => {
            if (!value.error) {
              this.setUser(value.username);
              this.setToken(value.token);
              this.setRoles(value.roles);
              console.log(value.roles)
              // console.log(this.$store.state.user);
              this.$router.push("/home");
            } else {
              this.msgError = "Email inconnu. Merci de vous inscrire"
              return this.msgError
            }
        });
        }
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
      text-decoration: none;

      &.router-link-exact-active {
        color: red;
      }
    }
</style>