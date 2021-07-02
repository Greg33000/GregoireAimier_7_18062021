<template>
  <div class="home h-100">
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
  </div>
</template>

<script>

import { mapMutations } from "vuex";
export default {
    // nom
    name: "FormLogin",
    // attributs statiques du composant
    data() {
      return {
        // nbre d'enfants
        email: '',
        password: '',
        username: '',
        msgError: ''
      }
    },

    // attributs calculés
    computed: {
      // attribut [formInvalide]
      emailValid() {
        if (this.email.indexOf("@") >= 1 & this.email.indexOf(".",this.email.indexOf("@")) != -1 & this.email.indexOf(" ") == -1) {
          return 1
        }
        else {return 0}
      },
      passwordValid() {
        if (this.password.indexOf(" ") == -1 & this.password != '') {
          return 1
        }
        else {return 0}
      },
      
      formValid() {
        if ((this.emailValid * this.passwordValid ) == 1 ) {
          return true
        }
        else {return false}
      },
    },

    // méthodes
    methods: {
      
      ...mapMutations(["setUser", "setToken"]),

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
          fetch("http://localhost:3000/api/auth/login", {
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
              this.setUser(value.email);
              this.setToken(value.token);
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
