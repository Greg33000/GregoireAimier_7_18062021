<template>
  <div class="background">
    <div class ="fixed-top bg-white" >
      <HeaderComponent class="text-center"/>
    </div>
    <b-container class="bodyPage py-2">
      <b-jumbotron>
        <div class="list row justify-content-center">
          <div class="col-md-8">
            <div class="row">
              <article class="list-group-item  my-1 border border-secondary rounded">
                <header class="putInItalic">publié par {{ post.username }} il y a {{ datePost(post.createdAt) }}</header>
                <h2>{{ post.title }}</h2>
                <p>{{ post.description }}</p>
                <img alt="image du post" src=post.imageUrl>
                <p>{{ post.description }}</p>
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
            </div>
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
  name: 'RedditComments',
  components: {
    HeaderComponent,
    
  },

  data() {
    return {
      post: {},
      id: "",

      today: new Date(Date.now()),
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
console.log(id);
      fetch("http://localhost:3000/api/reddit/" + id, {
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
        this.post= data,
        console.log(this.post);
      })           
    },
    
    
  },
  mounted() {
    this.seePost(this.recupParams);
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
