<template>
  <div class="home h-100">
    <b-container>
      <b-jumbotron v-if="maxWidth === false" >
        <b-row class="h-100 align-items-center">
          <b-col cols="6">
            <img alt="Icone entreprise" src="../assets/icon-above-font.svg">
          </b-col>
          <b-col cols="6">
            <b-card bg-variant="light">   
              <b-form-group class="my-3">
                  <b-input for="email" type="email" v-model="email" class="form-control" placeholder="Adresse email de groupomania" required/>
              </b-form-group>
              <b-form-group  class="my-3">
                  <b-input type="password" v-model="password" class="form-control" placeholder="Mot de passe" required/>
              </b-form-group>
              <b-form-group  class="my-3">
                <b-col class="text-center">
                  <b-button class="mx-2 my-1" variant="primary"  @click="doSomething">Connexion</b-button>
                  <b-button class="mx-2 my-1" variant="success"  @click="SdoSomething">Créer un compte</b-button>
                </b-col>             
              </b-form-group> 
            </b-card>
          </b-col>
          <p class="text-center text-danger">{{msgError}}</p>
        </b-row>
      </b-jumbotron>
      <b-jumbotron v-if="maxWidth === true" >
        <b-row class="h-100 align-items-center">
          <img id="img" alt="Icone entreprise" src="../assets/icon-above-font.svg">
          <b-card bg-variant="light">   
            <b-form-group class="my-3">
                <b-input for="email" type="email" v-model="email" class="form-control" placeholder="Adresse email de groupomania" required/>
            </b-form-group>
            <b-form-group  class="my-3">
                <b-input type="password" v-model="password" class="form-control" placeholder="Mot de passe" required/>
            </b-form-group>
            <b-form-group  class="my-3">
              <b-col class="text-center">
                <b-button class="mx-2 my-1" variant="primary"  @click="doSomething">Connexion</b-button>
                <b-button class="mx-2 my-1" variant="success"  @click="SdoSomething">Créer un compte</b-button>
              </b-col>             
            </b-form-group> 
          </b-card>
          <p class="text-center text-danger">{{msgError}}</p>
        </b-row>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>

export default {
    // nom
    name: "Form",
    // attributs statiques du composant
    data() {
      return {
        // nbre d'enfants
        email: '',
        password: '',
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
        if ((this.emailValid * this.passwordValid) == 1 ) {
          return true
        }
        else {return false}
      },
      maxWidth() {
        if (window.matchMedia("(max-width: 770px)").matches) {
          return true
        }
        else { return false }
      }
    },

    // méthodes
    methods: {
      errorForm() {
        if (this.passwordValid == 0 & this.emailValid == 1 ) {
          this.msgError = "Votre mot de passe n'est pas valide"
          return this.msgError
        }
        if (this.passwordValid == 1 & this.emailValid == 0 ) {
          this.msgError = "Votre email n'est pas valide"
          return this.msgError
        }
        if (this.passwordValid == 0 & this.emailValid == 0 ) {
          this.msgError = "Votre email et votre mot de passe ne sont pas valides"
          return this.msgError
        }
        if (this.passwordValid == 1 & this.emailValid == 1 ) {
          this.msgError = ""
          return this.msgError
        }
      },
      
      apiPOST(urlDone){
        let jsonBody = { 
          "email": this.email,
          "password": this.password,
        }
        fetch(urlDone, {
          method: "POST",
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonBody)
        })
        .then(function(res) {
          if (res.ok) {
            return res.json()
          }
        })
      },


      doSomething() {
        this.errorForm()
        if (this.formValid == true) {
          this.apiPOST("http://localhost:3000/api/auth/login")
          // window.location = "http://localhost:8080/#/home";
        }
      }, 
      
      SdoSomething() {
        this.errorForm()
        if (this.formValid == true) {
          this.apiPOST("http://localhost:3000/api/auth/signup ")
        }
      }, 
      
    }
  }


</script>

<style lang="scss">

  #img {
    margin: -20% 0%;
  }
</style>