<template>
  <v-container>
    <post-form v-if="me" />
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>

<script>
  import PostCard from '~/components/PostCard';
  import PostForm from '~/components/PostForm';

  export default {
    components: {
      PostCard,
      PostForm
    },
    data() {
      return {
        name: 'Nuxt.js'
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      mainPosts() {
        return this.$store.state.posts.mainPosts;
      },
      hasMorePost() {
        return this.$store.state.posts.hasMorePost;
      }
    },
    // fetch : Nuxt에서 지원하는 메소드
    // 컴포넌트가 렌더링 되기전에 Vuex에 비동기적으로 데이터를 넣을 때 사용
    fetch({ store }) {
      store.dispatch('posts/loadPosts')
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
      onScroll() {
        if(
          window.scrollY + document.documentElement.clientHeight 
          >
          document.documentElement.scrollHeight - 300
        ) {
          if (this.hasMorePost) {
            this.$store.dispatch('posts/loadPosts')
          }
          //console.log('이 지점에서 포스트 로딩!')
        }
      }
    },
  }
</script>

<style>

</style>