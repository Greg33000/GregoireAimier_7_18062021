<template>
  <div class="background">
    <div class ="fixed-top bg-white" >
      <HeaderComponent class="text-center"/>
      <b-container class="headerPage text-center">
        <b-jumbotron>
          <b-row>
            <b-col cols="12" class="input-group mb-3 justify-content-center">
              <b-input type="text" class="form-control" placeholder="Chercher un titre" v-model="title"/>
              <button class="btn btn-outline-secondary" type="button" @click="seeAllPosts">Chercher</button>
              <button class="btn btn-outline-secondary" type="button" @click="refreshList">Réinitialiser</button>
            </b-col>
          </b-row>
        </b-jumbotron>
      </b-container>
    </div>
    <b-container class="bodyPage py-2 text-center">
      <b-jumbotron>
        
      </b-jumbotron>
    </b-container>
    
    
    <div class="list row justify-content-center">

    <div class="col-md-8">
      <h4>Posts List</h4>
      <ul class="list-group">
        <li class="list-group-item itemClick my-1 border border-secondary rounded"
          v-for="(post, index) in posts"
          :key="index"
          @click="setActivePost(post)"
        >
          <div>{{ post.title }}
          </div>{{ post.description }}
          <i class="bi bi-chat-left-text"></i>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
</svg>
        </li>
      </ul>

      
    </div>
    
  </div>
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
      posts: [],
      currentPost: null,
      currentIndex: -1,
      title: ""
    };
  },

  computed: {
    titleParam() {
          if (this.title == "") {
            return ""
          }
          else {return "?title=" + this.title.split(' ').join('%20')}
        },
  },

  methods: {
    
    seeAllPosts() {
      fetch("http://localhost:3000/api/reddit" + this.titleParam, {
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
        console.log(this.posts);
      })           
    },
    refreshList() {
      this.title = "";
      this.seeAllPosts();
      this.currentPost = null;
      this.currentIndex = -1;
    },

    setActivePost(post) {
      fetch("http://localhost:3000/api/reddit/" + post.id, {
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
        this.$router.push("/reddit/comments?postId=" + post.id);
        console.log(this.posts);
      })    
    },
  },
  mounted() {
    this.seeAllPosts();
  }, 
};
</script>

<style lang="scss">

  
  .bodyPage {
    margin-top: 160px;
  }
  .background {
    background-color :#DAE0E6;
  }
  .itemClick{
    cursor: pointer;
  }
</style>
