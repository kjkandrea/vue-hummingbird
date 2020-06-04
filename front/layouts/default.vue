<template>
  <v-app>
    <nav>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <nuxt-link to="/">멈무버드</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items :style="{display: 'flex', alignItems:'center'}">
          <v-form @submit.prevent="onSearchHashtag">
            <div :style="{ display: 'flex', height: '100%', alignItems: 'center' }">
              <v-text-field
                v-model="hashtag"
                label="검색"
                hide-details
                prepend-icon="mdi-magnify"
              />
            </div>
          </v-form>

          <v-btn text nuxt to="/profile">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>

    <div>{{name}}</div>
    <v-btn @click="onChangeName">바이바이</v-btn>

    <v-row no-gutters>
      <v-col cols="12" md="4">
        <login-form></login-form>
      </v-col>
      <v-col  cols="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
  import LoginForm from '~/components/LoginForm';

  export default {
    components: {
      LoginForm
    },
    data() {
      return {
        hashtag: ''
      }
    },
    computed: {
      name() {
        return this.$store.state.posts.name;
      }
    },
    methods: {
      onChangeName() {
        this.$store.commit('posts/BYE')
      },
      onSearchHashtag() {
        this.$router.push({
          path: `/hashtag/${this.hashtag}`
        });
        this.hashtag = '';
      }
    }
  }
</script>

<style>

</style>