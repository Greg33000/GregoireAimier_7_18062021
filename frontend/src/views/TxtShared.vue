<template>
  <div class="background">
    <!-- header of the page with de header component AND the search buttons. -->
    <div class ="fixed-top bg-white" >
      <HeaderComponent class="text-center"/>
      <b-container class="headerPage text-center">
        <b-jumbotron>
          <b-row>
            <b-col cols="12" class="input-group mb-3 justify-content-center">
              <b-input type="text" class="form-control" placeholder="Chercher un titre" aria-label="Chercher un titre" v-model="title"/>
              <b-button variant="outline-secondary"  @click="seeAllPosts('')">Chercher</b-button>
              <b-button variant="outline-secondary" @click="refreshList">Réinitialiser</b-button>
            </b-col>
          </b-row>
        </b-jumbotron>
      </b-container>
    </div>
    <!-- body of the page with the list of all the posts -->
    <b-container class="bodyPage py-2">
      <b-jumbotron>
        <b-row class="list justify-content-center">
          <b-col md="10">
            <b-row>
              <h1 class="col-10">Liste des articles <span v-if="username != ''"> de {{ username }}</span></h1>
              <span class="col-2 text-danger text-center align-self-center">
                <!-- plus icon -->
                <svg @click="createNewPost" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-circle itemClick"  viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </span>
            </b-row>
            <!-- for each post in the DB, creation of 'li' element with specific data from each post -->
            <ul class="list-group">
              <li class="list-group-item  my-1 border border-secondary rounded"
                v-for="(post, index) in posts"
                :key="index"
                >
                <!-- Article whitch contains header / "body" and footer -->
                <article class="overflow-auto">
                  <!-- header of the article. Contains the username + timestamp of the post -->
                  <header class="putInItalic">publié par 
                    <a class="text-danger itemClick" @click="seeAllPosts(post)" >{{ post.username }}</a> 
                    il y a {{ datePost(post.createdAt) }}</header>
                  <!-- "body" of the article. Contains the title -->
                  <div class="itemClick overflow-auto"  @click="setActivePost(post)">
                    <h2>{{ post.title }}</h2>

                  </div>
                  <!-- footer of the article with the number of comments -->
                  <footer>
                    <div class="border-0 putInItalic text-secondary" >
                      <!-- comment icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                      <span> {{ post.nbComments }} commentaire{{ post.nbComments > 1 ? 's' : '' }}</span>
                    </div>
                  </footer>
                </article>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-jumbotron>
    </b-container>
  </div>
</template>


<script>

import HeaderComponent from '../components/HeaderComponent.vue'

export default {
  name: 'TxtShared',
  components: {
    HeaderComponent,
    
  },

  data() {
    return {
      posts: [],
      title: "",
      today: new Date(Date.now()),
      username:"",
    };
  },

  computed: {
    // creation of url parameters for title search (for simplification)
    titleParam() {
      return "title=" + this.title.split(' ').join('%20')
    },
    
    
  },
  

  methods: {
    // creation of url parameters for username search (for simplification)
    usernameParam(post) {
      if (post == ""){
        this.username = "";
      } else {
        this.username = post.username;
        return "username=" + post.username
      }
    },

    // creation of parameters for username and search
    urlParam(post) {
      if (post == "" & this.title == "" & this.username == "" ) {
        return ""
      } else if (post == "" & this.title == "" & this.username != ""  ){
        return "?username=" +  this.username
      } else if (post == "" & this.title != "" & this.username != ""  ){
        return "?username=" +  this.username + "&" + this.titleParam
      } else if (post == "" & this.title != ""  & this.username == "" ){
        return "?" + this.titleParam
      } else if (post != "" & this.title == "" ){
        return "?" + this.usernameParam(post)
      } else if (post != "" & this.title != "" ){
        return "?" + this.usernameParam(post) +"&"+ this.titleParam
      }
    },

    // Calculation of the timestamp for each post (only creation date in DB)
    datePost(date) {
      var datePost = new Date(date);
      var diffDate = (this.today - datePost)*(2.7777777777777776/ 10000000); // hours calculation
      if (diffDate < 1) {
        return Math.round(diffDate * 60) + " min";
      } else if (diffDate < 24) {
        return Math.round(diffDate) + " h";
      } else {
        return Math.round(diffDate/24) + " j";
      }
    },

    // Push to a new route when creating new post
    createNewPost() {
      this.$router.push("/texts/new");
    },

    // method with GET route to see all post with specific url parameters calculated (title || username || null)
    seeAllPosts(post) {
      
      fetch("http://localhost:3000/api/texts" + this.urlParam(post), {
        method: "GET",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'x-access-token': this.$store.state.token // access to the token store in vueX
        },
      })
      .then(function(res) {
        return res.json();
      })
      .then(data => {
        this.posts = data; // the data return is store in "posts" data 
      })           
    },

    // The refreshlist method permit to refresh the page (without reload page) when clicking in "réinitialiser" button
    refreshList() {
      this.title = "";
      this.username = "";
      this.seeAllPosts("");
    },

    // When clicking on a post, go to a new route with postId parameter in url.
    setActivePost(post) {
      this.$router.push("/texts/comments?postId=" + post.id);
      
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
