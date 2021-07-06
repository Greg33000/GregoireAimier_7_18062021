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
              <article class="list-group-item  my-1 border border-secondary rounded">
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
            </div>
          </div>
        </div>
      </b-jumbotron>
      <b-jumbotron>
        <div class="list row justify-content-center my-4">
          <div class="form-outline col-md-10" v-if="commentsVisibles === true">
            <label class="form-label" for="textAreaExample">Insérer un commentaire</label>
            
            <textarea class="form-control" id="textAreaExample" rows="4" v-model="comment.description" required></textarea>
            <button class="btn btn-danger my-2" @click="publishComment">Publier</button>
          </div>
          <ul class="list-group col-md-8 justify-content-center px-0" v-if="commentsVisibles === true">
            <li class="list-group-item  my-1 border border-secondary rounded"
              v-for="(comment, index) in comments"
              :key="index"
              >
              <article>
                <header class="putInItalic">commenté par {{ comment.username }} il y a {{ datePost(comment.createdAt) }}</header>
                <div>
                  <p>{{ comment.description }}</p>
                </div>    
              </article>
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
            "postId": this.comment.postId,
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

            this.comments= [];
            this.commentsVisibles = true;
            this.comment.description="";
            this.today = new Date(Date.now());
            this.seeAllComments(this.comment.postId)
            
          }


         });

      }
    },
    
  },
  mounted() {
    this.comment.postId = this.recupParams;
    this.seePost(this.recupParams)
    this.seeAllComments(this.comment.postId)

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
