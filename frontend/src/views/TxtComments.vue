<template>
  <div class="background">
    <div class ="fixed-top bg-white" >
      <HeaderComponent class="text-center"/>
    </div>
    <b-container class="CommentPage py-2">
      <b-jumbotron>
        <div class="list row justify-content-center">
          <div class="col-md-8">
            <div class="row my-4">
              <article class="list-group-item  my-1 border border-secondary rounded overflow-auto">
                <header class="putInItalic">publié par {{ post.username }} il y a {{ datePost(post.createdAt) }}</header>
                <h2>{{ post.title }}</h2>
                <div class="homeImage col-md-8 border text-center w-100" v-if="post.imageUrl != null">
                  <img class="redditImage mx-auto " alt="image du post" :src="post.imageUrl">
                </div>
                <p>{{ post.description }}</p>
                <footer>
                  <button class="btn btn-outline-secondary border-0 putInItalic" type="button" @click="seeComments">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                      <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    <span> {{ commentsQty }} commentaire{{ commentsQty > 1 ? 's' : '' }}</span>
                  </button>
                </footer>
              </article>
              <div class="row justify-content-center" v-if="moderator === true">
                <button class="btn btn-outline-primary border-0 putInItalic col-3" type="button" @click="seeTextToModify()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                </button>
                <button class="btn btn-outline-danger border-0 putInItalic col-3" type="button" @click="deleteText()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </b-jumbotron>
      <b-jumbotron>
        <div class="list row justify-content-center my-4">
          <div class="form-outline col-md-10" v-if="commentsVisibles === true">
            <label class="form-label" for="textAreaExample">Insérer un commentaire</label>
            
            <textarea class="form-control"  id="textAreaExample" rows="4" v-model="comment.description" required></textarea>
            <button class="btn btn-success my-2" @click="publishComment">Publier</button>
          </div>
          <ul class="list-group col-md-8 justify-content-center px-0" v-if="commentsVisibles === true">
            <li class="list-group-item  my-1 border border-secondary rounded overflow-auto"
              v-for="(comment, index) in comments"
              :key="index"
              >
              <article>
                <header class="putInItalic">commenté par {{ comment.username }} il y a {{ datePost(comment.createdAt) }}</header>
                <div>
                  <p v-if="index != currentIndex">{{ comment.description }}</p>
                  <div v-if="index == currentIndex" class="row">
                    <div class="col-10 my-2">
                      <textarea   class="form-control " rows="4" v-model="currentComment" required></textarea>
                    </div>
                    <div class="col-2 align-self-center">
                      <button class="btn btn-success border-0 w-100 my-2" type="button" @click="modifyComment(comment.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                          <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                        </svg>
                      </button>
                      <button class="btn btn-secondary border-0 w-100 my-2" type="button" @click="setActiveComment(-1,'')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                          <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>    
              </article>
              <div class="row justify-content-center" v-if="(moderator === true) && (index != currentIndex) ">
                <button class="btn btn-outline-primary border-0 col-3" type="button" @click="setActiveComment(index,comment.description)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                </button>
                <button class="btn btn-outline-danger border-0 col-3" type="button" @click="deleteComment(comment.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </b-jumbotron>
    </b-container>
  </div>
</template>


<script>
// @ is an alias to /src
import HeaderComponent from '../components/HeaderComponent.vue'


export default {
  name: 'RedditComments',
  components: {
    HeaderComponent,
    
  },

  data() {
    return {
      post: {},
      id: "",
      comments: [],
      commentsVisibles: false,
      commentsQty: 0,
      today: new Date(Date.now()),

      comment: {
        description:"",
        username: this.$store.state.user,
        postId:"",
      },
      moderator: false,
      currentIndex: -1,
      currentComment:"",
    };
  },
  computed: {
    recupParams() {
      
      // récupération de l'url (et des paramètres)
      const urlcourante = document.location.href;
      
      // split du paramètre
      const urlParameters = urlcourante.split('?')[1]
      const idParam = new URLSearchParams(urlParameters);

      // Récupération du paramètre 'postId' de l'url
      const postIdNumber = idParam.get('postId');

      if (postIdNumber === null) {
        return "";
      } else {
        return postIdNumber;
      } 
    },
     

  },

  methods: {
    initPageAfterRoutes() {
      this.comments= [];
      this.commentsVisibles = true;
      this.comment.description="";
      this.today = new Date(Date.now());
      this.seeAllComments(this.comment.postId)  
    },


    setActiveComment(index, description) {
      this.currentIndex = index
      this.currentComment = description
    },
    seeComments() {
       if (this.commentsVisibles == true) {
         this.commentsVisibles = false;
       } else {this.commentsVisibles = true}
        
     },
    
    datePost(date) {

      var datePost = new Date(date);
      var diffDate = (this.today - datePost)*(2.7777777777777776/ 10000000); // calcul en heures
      if (diffDate < 1) {
        return Math.round(diffDate * 60) + " min";
      } else if (diffDate < 24) {
        return Math.round(diffDate) + " h";
      } else {
        return Math.round(diffDate/24) + " j";
      }
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
        this.post= data
      })           
    },
    seeAllComments(id) {
      fetch("http://localhost:3000/api/textcomments/" + id , {
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
        this.comments= data,
        this.commentsQty = this.comments.length

      })           
    },
    publishComment() {
      if (this.comment.description != "" ) { 
        let jsonBody = { 
            "description": this.comment.description,
            "username": this.comment.username,
            "textPostId": this.comment.postId,
          };         
        fetch("http://localhost:3000/api/textcomments/new", {
          method: "POST",
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'x-access-token': this.$store.state.token
          },
          body: JSON.stringify(jsonBody)  
        })
        .then(function(res) {
          return res.json();
                    
        })
        .then(value => {
          if (!value.error) {
            this.initPageAfterRoutes()
            
          }
         });
      } else {
        alert("Votre commentaire ne doit pas être vide")
      }
    },
    deleteComment(id) {
      if (confirm("Voulez-vous vraiment supprimer le commentaire ?")) { // message de confirmation de la suppression du commentaire
        fetch("http://localhost:3000/api/textcomments/" + id , {
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
            
            this.initPageAfterRoutes()
            
            }
        });
      } 
    },
    modifyComment(id) {
      if (this.currentComment != "" ) { 
        let jsonBody = { 
            "description": this.currentComment,
          };         
        fetch("http://localhost:3000/api/textcomments/" + id , {
          method: "PUT",
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'x-access-token': this.$store.state.token
          },
          body: JSON.stringify(jsonBody)  
        })
        .then(function(res) {
          return res.json();
                    
        })
        .then(value => {
          if (!value.error) {
            this.initPageAfterRoutes()
            this.setActiveComment(-1,'')
          }
         });
      } else {
        alert("Votre commentaire ne doit pas être vide")
      }
    },
    deleteText() {
      if (confirm("Voulez-vous vraiment supprimer le commentaire ?")) { // message de confirmation de la suppression du commentaire
        fetch("http://localhost:3000/api/texts/" + this.comment.postId , {
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
            
            this.$router.push("/texts");
            
            }
        });
      } 
    },
    seeTextToModify() {
      if (this.moderator == true) {
        this.$router.push("/texts/modify?postId=" + this.comment.postId);
      }
      
    },
  },
  mounted() {
    this.comment.postId = this.recupParams;
    this.seePost(this.recupParams)
    this.seeAllComments(this.comment.postId)
    for (let i = 0; i < this.$store.state.roles.length; i++) { 
      if (this.$store.state.roles == "ROLE_MODERATOR") {
        this.moderator = true
      }
    }
  }, 
};
</script>

<style lang="scss">

  
  .CommentPage {
    margin-top: 50px;
  }
  .background {
    background-color: #DAE0E6;
  }
  .itemClick{
    cursor: pointer;
  }
  .putInItalic{
    font-style: italic;
    font-size: 0.9rem;
  }
  .redditImage{
    
    max-width: 100%;
    height: 200px;
    object-fit:contain;
  }


</style>
