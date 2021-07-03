<template>
  <div class="background">
    <div class ="fixed-top bg-white" >
      <HeaderComponent class="text-center"/>
      <b-container class="headerPage text-center">
        <b-jumbotron>
          <b-row>
            <b-col cols="12" class="input-group mb-3 justify-content-center">
              <b-input type="text" class="form-control" placeholder="Chercher un titre" v-model="title"/>
              <button class="btn btn-outline-secondary" type="button" @click="seeAllPosts('')">Chercher</button>
              <button class="btn btn-outline-secondary" type="button" @click="refreshList">Réinitialiser</button>
            </b-col>
          </b-row>
        </b-jumbotron>
      </b-container>
    </div>
    <b-container class="bodyPage py-2">
      <b-jumbotron>
        <div class="list row justify-content-center">
          <div class="col-md-8">
          <div class="row">
            <h1 class="col-10">Liste des posts <span v-if="username != ''"> de {{ username }}</span></h1>
            <span class="col-2 text-danger text-center align-self-center">
              <svg @click="createNewPost" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-circle itemClick"  viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </span>
            </div>
            <ul class="list-group">
              <li class="list-group-item  my-1 border border-secondary rounded"
                v-for="(post, index) in posts"
                :key="index"
                >
                <article>
                  <header class="putInItalic">publié par 
                    <a class="text-danger itemClick" @click="seeAllPosts(post)" >{{ post.username }}</a> 
                    il y a {{ datePost(post.createdAt) }}</header>
                  <div class="itemClick"  @click="setActivePost(post)">
                    <h2>{{ post.title }}</h2>
                    <p>{{ post.description }}</p>
                  </div>
                  <footer>
                    <button class="btn btn-outline-secondary border-0 putInItalic" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                      <span> 50 commentaires</span>
                    </button>
                  </footer>
                </article>
              </li>
            </ul>
          </div>
        </div>
      </b-jumbotron>
    </b-container>
  </div>
</template>


<script>
// @ is an alias to /src
import HeaderComponent from '../components/HeaderComponent.vue'


export default {
  name: 'HeaderCompo',
  components: {
    HeaderComponent,
    
  },

  data() {
    return {
      posts: [],
      currentPost: null,
      currentIndex: -1,
      title: "",
      today: new Date(Date.now()),
      username:"",
    };
  },

  computed: {
    titleParam() {
      return "title=" + this.title.split(' ').join('%20')
    },
    
    
  },
  

  methods: {
    usernameParam(post) {
      if (post == ""){
        this.username = "";
      } else {
        this.username = post.username;
        return "username=" + post.username
      }
    },
    urlParam(post) {
      if (post == "" & this.title == "" ) {
        return ""
      } else if (post == "" & this.title != "" ){
        return "?" + this.titleParam
      } else if (post != "" & this.title == "" ){
        return "?" + this.usernameParam(post)
      } else if (post != "" & this.title != "" ){
        return "?" + this.usernameParam(post) +"&"+ this.titleParam
      }
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

    createNewPost() {
      this.$router.push("/reddit/new");
    },

    seeAllPosts(post) {
      
      fetch("http://localhost:3000/api/reddit" + this.urlParam(post), {
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
        this.posts = data;
        // console.log(this.posts);
      })           
    },
    refreshList() {
      this.title = "";
      this.username = "";
      this.seeAllPosts("");
      this.currentPost = null;
      this.currentIndex = -1;
    },
    setActivePost(post) {
      this.$router.push("/reddit/comments?postId=" + post.id);
      // fetch("http://localhost:3000/api/reddit/" + post.id, {
      //   method: "GET",
      //   headers: {
      //     'Accept': 'application/json', 
      //     'Content-Type': 'application/json',
      //     'x-access-token': this.$store.state.token
      //   },
      // })
      // .then(function(res) {
      //   return res.json();
      // })
      // .then(data => {
      //   this.posts = data;
      //   this.$router.push("/reddit/comments?postId=" + post.id);
      //   console.log(this.posts);
      // })    
    },

  },
  mounted() {
    this.seeAllPosts("");
  }, 
};
</script>

<style lang="scss">

  
  .bodyPage {
    margin-top: 150px;
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
</style>
