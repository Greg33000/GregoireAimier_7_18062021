<template>
    <div class="backgroundNewPost">
        <div class ="fixed-top bg-white" >
            <HeaderComponent class="text-center"/>
            <b-container class="headerPage text-center">
                <b-jumbotron>
                    <b-row>
                        <b-col cols="12" class="input-group mb-3 justify-content-center">
                            <h1> {{ modifVue ? "Modifier l'article" : "Créer votre article" }} </h1>
                        </b-col>
                    </b-row>
                </b-jumbotron>
            </b-container>
        </div>
        <b-container class="bodyPage ">
            <div class="row ">
                <div class="col-8 mx-auto">
                    <b-jumbotron>
                        <b-card bg-variant="light my-5">   
                            <b-form-group class="my-3">
                                <label for="title">Titre de l'article</label>
                                <b-input for="title" type="text" v-model="post.title" class="form-control" placeholder="" required/>
                            </b-form-group>
                            <b-form-group  class="my-3">
                                <label for="description">Sa description</label>
                                <textarea class="form-control" for="description" id="textAreaExample" rows="4" v-model="post.description" required></textarea>
                            </b-form-group>
                            <b-form-group  class="my-4">
                                <button class="btn btn-primary " @click="onPickFile">partager un fichier (format image)</button>
                                <input
                                    type="file"
                                    style="display:none"
                                    ref="fileInput"
                                    accept="image/*"
                                    @change="onFilePicked"/>
                                <div class="my-2 preview">
                                    <img v-if="url" :src="url" />
                                    <button v-if="url" class="btn btn-danger border-0 my-2 align-top" type="button" @click="suppImg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                                        </svg>
                                </button>
                                </div>
                                
                            </b-form-group>
                            <b-form-group  class="my-3">
                            <b-col class="text-center">
                                <b-button class="mx-2 my-1" variant="success"  v-if="modifVue" @click="modifyPost"> Mise à jour </b-button>
                                <b-button class="mx-2 my-1" variant="success"  v-if="!modifVue" @click="createNewPost"> Création </b-button>
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

import HeaderComponent from '../components/HeaderComponent.vue'

export default {
    name: 'HeaderCompo',
    components: {
        HeaderComponent
    },

    data() {
        return {
            post: {
                id:"",
                title:"",
                description:"",
                username: this.$store.state.user,
                
            },
            msgError: '' ,
            image: null,
            previewImage: null,
            url: null,
            modifVue: false,
            editImage: "", // needed when moderator edit
        };
    },

    computed: {
        recupParams() {
      
            const urlcourante = document.location.href;
      
            // split of url
            const urlParameters = urlcourante.split('?')[1]
             const idParam = new URLSearchParams(urlParameters);

            // Catch in url "postId" parameter
            const postIdNumber = idParam.get('postId');

            if (postIdNumber === null) {
                return "";
            } else {
                return postIdNumber;
            } 
        },
        
        
            
    },

    methods: {
        suppImg() {
            this.image = null
            this.previewImage = null
            this.url = null
        },
        createNewPost() {
            if (this.post.title != "" && this.post.description != "" ) {
                var formData = new FormData();
                formData.append("post", JSON.stringify(this.post));
                formData.append("image", this.image);

                
                fetch("http://localhost:3000/api/texts/new", {
                    method: "POST",
                    headers: {
                        'x-access-token': this.$store.state.token
                    },
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
            this.url = URL.createObjectURL(file[0]); // preview image 

        },

        seePost(id) {
            fetch("http://localhost:3000/api/texts/" + id, {
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
                this.post.id = data.id
                this.post.title = data.title
                this.post.description = data.description
                if (data.imageUrl) {
                    this.url = data.imageUrl
                }
            })           
        },
        modifyPost() {
            if (this.image == null && this.url == null ) {
                this.editImage = "delete"
            }
            
            if (this.post.title != "" && this.post.description != "" ) {
                var formData = new FormData();
                const bodyToSend = {
                    "title": this.post.title,
                    "description": this.post.description,
                    "editImage": this.editImage,
                    "id": this.recupParams,
                }
                formData.append("post", JSON.stringify(bodyToSend));
                formData.append("image", this.image);      
                
                fetch("http://localhost:3000/api/texts/" + this.post.id, {
                    method: "PUT",
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

    }, 
    mounted() {
        if (this.recupParams != "") {
            this.modifVue = true
            this.seePost(this.recupParams)
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
  }
  .minHeight{
      height:20px;
  }
  .preview img {
    max-width: 100%;
    max-height: 200px;
}
</style>
