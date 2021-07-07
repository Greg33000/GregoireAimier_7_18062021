<template>
    <div class="backgroundNewPost">
        <div class ="fixed-top bg-white" >
            <HeaderComponent class="text-center"/>
            <b-container class="headerPage text-center">
                <b-jumbotron>
                    <b-row>
                        <b-col cols="12" class="input-group mb-3 justify-content-center">
                            <h1> Créer votre article </h1>
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
                                <label for="title">Titre de l'article</label>
                                <b-input for="title" type="text" v-model="post.title" class="form-control" placeholder="" required/>
                            </b-form-group>
                            <b-form-group  class="my-3">
                                <label for="description">Sa description</label>
                                <b-input for="description" type="text" v-model="post.description" class="form-control" placeholder="" required/>
                            </b-form-group>
                            <b-form-group  class="my-4">
                                <button class="btn btn-danger " @click="onPickFile">partager un fichier (format image)</button>
                                <input
                                    type="file"
                                    style="display:none"
                                    ref="fileInput"
                                    accept="image/*"
                                    @change="onFilePicked"/>
                                    <div class="my-2 preview">
                                        <img v-if="url" :src="url" />
                                    </div>
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
            msgError: '' ,
            image: null,
            previewImage: null,
            url: null,
        };
    },

    computed: {
    },

    methods: {
        createNewPost() {
            if (this.post.title != "" && this.post.description != "" ) {
                var formData = new FormData();
                formData.append("post", JSON.stringify(this.post));
                formData.append("image", this.image);

                
                fetch("http://localhost:3000/api/texts/new", {
                    method: "POST",
                    headers: {
                        // 'Accept': 'application/json', 
                        // 'Content-Type': 'application/json',
                        // 'Content-Type': 'multipart/form-data',
                        'x-access-token': this.$store.state.token
                    },
                    // body: JSON.stringify({post:this.post, formData}),
                    body: formData,
                })
                .then(function(res) {
                    return res.json();
                    
                })
                .then(value => {
                    if (!value.error) {
                        this.$router.push("/texts");
                    } else {
                        this.msgError = "Une erreur s'est produite. Veuillez recommencer"
                        return this.msgError
                    }
                });
            } else {
                this.msgError = "Tous les champs doivent être remplis";
                return this.msgError;
            }
        },
        onPickFile () {
            this.$refs.fileInput.click()
        },
        onFilePicked (event) {
            const file = event.target.files
            this.image = file[0]
            this.url = URL.createObjectURL(file[0]); // Apercu de l'image avant envoi

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
  .preview img {
    max-width: 100%;
    max-height: 200px;
}
</style>
