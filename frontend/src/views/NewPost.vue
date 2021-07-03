<template>
    <div class="backgroundNewPost">
        <div class ="fixed-top bg-white" >
            <HeaderComponent class="text-center"/>
            <b-container class="headerPage text-center">
                <b-jumbotron>
                    <b-row>
                        <b-col cols="12" class="input-group mb-3 justify-content-center">
                            <h1> Créer votre Post </h1>
                        </b-col>
                    </b-row>
                </b-jumbotron>
            </b-container>
        </div>
        <b-container class="bodyPage py-2 h-100">
            <div class="row align-items-center h-100">
                <div class="col-8 mx-auto">
                    <b-jumbotron>
                        <b-card bg-variant="light">   
                            <b-form-group class="my-3">
                                <label for="title">Titre du Post</label>
                                <b-input for="title" type="text" v-model="post.title" class="form-control" placeholder="" required/>
                            </b-form-group>
                            <b-form-group  class="my-3">
                                <label for="description">Description du Post</label>
                                <b-input for="description" type="text" v-model="post.description" class="form-control" placeholder="" required/>
                            </b-form-group>
                            <b-form-group  class="my-3">
                            <b-col class="text-center">
                                <b-button class="mx-2 my-1" variant="primary"  @click="createNewPost">Création</b-button>
                            </b-col>             
                            </b-form-group> 
                            <p class="text-center text-danger minHeight">{{msgError}}</p>
                        </b-card>
                    </b-jumbotron>
                     
                </div>
            </div>
        </b-container>
    </div>
</template>


<script>
// @ is an alias to /src
import HeaderComponent from '../components/HeaderComponent.vue'

export default {
    name: 'HeaderCompo',
    components: {
        HeaderComponent
    },

    data() {
        return {
            post: {
                title:"",
                description:"",
                username: this.$store.state.user,
            },
            msgError: '' 
        };
    },

    computed: {
    },

    methods: {
        createNewPost() {
            if (this.post.title != "" && this.post.description != "" ) {
                console.log(this.post.username);
                fetch("http://localhost:3000/api/reddit/new", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json',
                        'x-access-token': this.$store.state.token
                    },
                    body: JSON.stringify(this.post)
                })

                .then(function(res) {
                    return res.json();
                    
                })
                .then(value => {
                    if (!value.error) {
                        this.$router.push("/reddit");
                    } else {
                        this.msgError = "Une erreur s'est produite. Veuillez recommencer"
                        return this.msgError
                    }
                });
            } else {
                this.msgError = "Tous les champs doivent être remplis";
                return this.msgError;
            }
        }
    }, 
    
};
</script>

<style lang="scss">

  
  .bodyPage {
    margin-top: 150px;
  }
  .backgroundNewPost {
    background-color :#DAE0E6;
    background-size: cover;
    height: 600px; 
  }
  .minHeight{
      height:20px;
  }
</style>
