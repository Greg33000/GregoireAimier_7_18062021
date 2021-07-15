<!-- This is the signin page. -->

<template>
  <div class="home h-100">
    <b-container>

      <!-- If max-width of the screen is > 540 px this part is active. The logo and inputs are in line . -->
      <b-jumbotron v-if="maxWidth === false" >
        <b-row class="h-100 align-items-center">
          <b-col cols="6">
            <img alt="Icone entreprise" src="../assets/icon-above-font.svg">
          </b-col>
          <b-col cols="6">
            <!-- nav item to go to signup and signin . -->
            <b-nav tabs>
              <b-nav-item class="align-self-end" v-bind:active="true" tag="router-link" to="/signin">Se connecter</b-nav-item>
              <b-nav-item class="align-self-end" v-bind:active="false" tag="router-link" to="/signup" >Créer un compte</b-nav-item>
            </b-nav>
            <!-- input to complete to login . -->
            <b-card bg-variant="light">   
              <b-form-group class="my-3">
                <b-input type="email" v-model="email" class="form-control" placeholder="Adresse email" aria-label="Adresse email" required/>
              </b-form-group>
              <b-form-group  class="my-3">
                <b-input type="password" v-model="password" class="form-control" placeholder="Mot de passe" aria-label="Mot de passe" required/>
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

      <!-- If max-width of the screen is > 540 px this part is active. The logo and inputs are in column . -->
      <b-jumbotron v-if="maxWidth === true" >
        <b-row class="h-100 align-items-center">
          <img id="img" alt="Icone entreprise" src="../assets/icon-above-font.svg">
          <!-- nav item to go to signup and signin . -->
          <b-nav tabs>
            <b-nav-item class="align-self-end" v-bind:active="true" tag="router-link" to="/signin">Se connecter</b-nav-item>
            <b-nav-item class="align-self-end" v-bind:active="false" tag="router-link" to="/signup" >Créer un compte</b-nav-item>
          </b-nav>
          <!-- input to complete to login . -->
          <b-card bg-variant="light">   
            <b-form-group class="my-3">
              <b-input type="email" v-model="email" class="form-control" placeholder="Adresse email" aria-label="Adresse email" required/>
            </b-form-group>
            <b-form-group  class="my-3">
              <b-input type="password" v-model="password" class="form-control" placeholder="Mot de passe" aria-label="Mot de passe" required/>
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
  
    data() {
      return {
        email: '',
        password: '',
        username: '',
        msgError: ''
      }
    },

    computed: {

      // to verify if email is valid (not empty, @, 1 point and no blank)
      emailValid() {
        if (this.email.indexOf("@") >= 1 & this.email.indexOf(".",this.email.indexOf("@")) != -1 & this.email.indexOf(" ") == -1) {
          return 1
        } else {return 0}
      },

      // to verify if password is valid (not empty and no blank)
      passwordValid() {
        if (this.password.indexOf(" ") == -1 & this.password != '') {
          return 1
        } else {return 0}
      },

      // to verify if the form is valid (password valid and email valid)
      formValid() {
        if ((this.emailValid * this.passwordValid) == 1 ) {
          return true
        }
        else {return false}
      },

      // calculate the maxWidth of the screen
      maxWidth() {
        if (window.matchMedia("(max-width: 770px)").matches) {
          return true
        } else { return false } 
      },
    },

    methods: {

    ...mapMutations(["setUser", "setToken","setRoles","setEmail"]), // to be possible to modify store in vuex

      // complete a error message to know what is the problem (for user)
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
      
      // to send to the back the POST route to signin
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
            if (!value.error) { // if no error, put in vuex store some informations and go to home page
              this.setUser(value.username);
              this.setToken(value.token);
              this.setRoles(value.roles);
              this.setEmail(this.email);
              this.$router.push("/home");
            } else {
              this.msgError = value.error.toString()
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