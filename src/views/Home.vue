<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index" />
    <div class="blog-card-wrap">
     <div class="container" >
      <h3>View  Blogs</h3>
       <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
       </div> 
       <div class="container" >
       <h1 v-if="!user">Skill</h1>
            <table v-if="!user" class="table">
            <tr id="t-title">
              <th>JavaScript</th>
              <th>Vue</th>
              <th>Firebase</th>
            </tr>
            <tr>
              <td>RWD</td>
              <td>vue3</td>
              <td>Remote Config</td>
            </tr>
            <tr>
              <td>JSON</td>
              <td>axios</td>
              <td>Authentication</td>
            </tr>
            <tr>
              <td>SCSS</td>
              <td>Nuxt.js</td>
              <td>database</td>
            </tr>
            </table>
       </div>
     </div>     
    </div>
    <div v-if="!user" class="updates">    
      <div class="container">
        <div class="responsive">
          <div class="gallery">
            <a target="_blank" href="https://github.com/jokerling0">
              <img src="../assets/Icons/github.png" alt="Cinque Terre" width="600" height="400">
            </a>
            <div class="desc">Myleaen project</div>
          </div>
        </div>
        <div class="responsive">
          <div class="gallery">
            <a target="_blank" href="https://leetcode.com/progress/">
              <img src="../assets/Icons/leetcode.png" alt="Forest" width="600" height="400">
            </a>
            <div class="desc">Learn Algo Progress</div>
          </div>
        </div>

        <div class="responsive" id="V">
          <div class="gallery">
            <a target="_blank" href="https://vuejs.org/">
              <img src="../assets/Icons/Vue.png" alt="Northern Lights" width="600" height="400">
            </a>
            <div class="desc">Learn Vue</div>
          </div>
        </div> 
        <div class="clearfix"></div>       
      </div> 
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost";
import BlogCard from "../components/BlogCard";
export default {
  name: "Home",
  components: { BlogPost, BlogCard },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Sample blog with all things programming including HTML, CSS, JavaScript and more. The following are the skill i am familiar with",
        welcomeScreen: true,
        photo: "code",
      },

    };
  },
  computed: {
    blogPostsFeed() {
      return this.$store.getters.blogPostsFeed;
    },
    blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
#V{width: 30%;height: 30%;}
div.gallery {
  border: none;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 70%;
  height: auto;
}

div.desc {
  padding: 15px;
  text-align: center;
  font-family: "Times New Roman", Times, serif;
}
.responsive {
  padding: 0 6px;
  float: left;
  width: 33.33%;
}

@media only screen and (max-width: 700px) {
  .responsive {
    width: 49.99999%;
    margin: 6px 0;
  }
}

@media only screen and (max-width: 500px) {
  .responsive {
    width: 100%;
  }
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
.blog-card-wrap {
  h1 {
    font-size: 40px;
    margin-bottom: 32px;
    text-align: center;
    text-indent: -75px;
    font-family: "Times New Roman", Times, serif;
  }
  h3 {
    font-size: 25px;
    margin-bottom: 10px;
    font-family: "Times New Roman", Times, serif;
  }
}
.table{
  text-align: center;
  width: 100%;
  line-height: 40px;
  font-family: Arial, Helvetica, sans-serif;
  font-size:22px
}
#t-title{
  height: 50px;background-color:black;color:white;font-size: 25px;
}
.updates {   
   .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
