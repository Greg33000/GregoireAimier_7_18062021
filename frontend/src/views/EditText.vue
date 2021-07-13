<!-- This is the creation or modification page for articles. -->

<template>
    <div class="backgroundNewPost">
    
        <!-- header of the page with the header component. -->
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

        <!-- body of the page with elements to fill to create a post. -->
        <b-container class="bodyPage ">
            <b-row>
                <b-col cols="8" class="mx-auto">
                    <b-jumbotron>
                        <b-card bg-variant="light my-5">
                            <!-- Title field. -->   
                            <b-form-group class="my-3">
                                <label for="title">Titre de l'article</label>
                                <b-input name="title" type="text" v-model="post.title" class="form-control" placeholder="" aria-label="Titre de l'article" required/>
                            </b-form-group>
                            <!-- Description field. -->  
                            <b-form-group  class="my-3">
                                <label for="description">Sa description</label>
                                <textarea class="form-control" name="description" id="textAreaExample" rows="4" v-model="post.description" aria-label="Description de l'article" required></textarea>
                            </b-form-group>
                            <!-- Image "section" with preview if file exist. -->  
                            <b-form-group  class="my-4">
                                <b-button variant="primary" @click="onPickFile" aria-label="Partager un fichier">partager un fichier (format image)</b-button>
                                <input
                                    type = "file"
                                    style="display:none"
                                    ref="fileInput"
                                    accept="image/*"
                                    @change="onFilePicked" aria-label="Partager un fichier"/>
                                <div class="my-2 preview">
                                    <img v-if="url" :src="url" alt="image du post" />
                                    <b-button variant="danger" v-if="url" class="border-0 my-2 align-top" @click="suppImg" aria-label="Supprimer l'image">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                                        </svg>
                                    </b-button>
                                </div>
                            </b-form-group>
                            <!-- Buttons to send informations to the back. --> 
                            <b-form-group  class="my-3">
                                <b-col class="text-center">
                                    <!-- Button for moderator only (if modification). --> 
                                    <b-button class="mx-2 my-1" variant="success"  v-if="modifVue" @click="modifyPost" > Mise à jour </b-button>
                                    <!-- Button for all. --> 
                                    <b-button class="mx-2 my-1" variant="success"  v-if="!modifVue" @click="createNewPost" > Création </b-button>
                                </b-col>             
                            </b-form-group> 
                            <p class="text-center text-danger minHeight">{{msgError}}</p>
                        </b-card>
                    </b-jumbotron>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>


<script>

    import HeaderComponent from '../components/HeaderComponent.vue'

    export default {
        name: 'EditText',
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

            // To recover parameters in the url
            recoverParams() {
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

            // to delete the information of the image 
            suppImg() {
                this.image = null
                this.previewImage = null
                this.url = null
            },

            // to send to the back the information to create a post 
            createNewPost() {
                if (this.post.title != "" && this.post.description != "" ) { // verification of the data to be sent
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
                        if (!value.error) { // if no error, go to the list of the posts
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

            // to catch the file 
            onPickFile () {
                this.$refs.fileInput.click()
            },
            onFilePicked (event) {
                const file = event.target.files
                this.image = file[0]
                this.url = URL.createObjectURL(file[0]); // preview image 

            },

            // for moderator only, get the text datas to know how to modify
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

            // for moderator only, send the modification of the post
            modifyPost() {
                if (this.image == null && this.url == null ) { // verification what to do with images (delete previous, new or keep the previous)
                    this.editImage = "delete"
                }
                
                if (this.post.title != "" && this.post.description != "" ) { // verification of the input
                    var formData = new FormData();
                    const bodyToSend = {
                        "title": this.post.title,
                        "description": this.post.description,
                        "editImage": this.editImage,
                        "id": this.recoverParams,
                    }
                    formData.append("post", JSON.stringify(bodyToSend));
                    formData.append("image", this.image);      
                    
                    fetch("http://localhost:3000/api/texts/" + this.post.id, {
                        method: "PUT",
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
                            this.$router.push("/texts"); // if no error, go to the list of the posts
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
            if (this.recoverParams != "") {
                this.modifVue = true
                this.seePost(this.recoverParams)
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
