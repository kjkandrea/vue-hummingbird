<template>
  <div>
    <v-container>
      <v-card style="margin-bottom:20px;">
        <v-container>
          <v-subheader>프로필</v-subheader>
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field
              v-model="nickname"
              label="닉네임"
              :rules="nicknameRules"
              required
            />
            <v-btn 
              color="orange"
              type="submit"
            >
              수정 
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
      <v-card style="margin-bottom:20px;">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list 
            :users="followingList" 
            :remove="removeFollowing"
          />
          <v-btn @click="loadMoreFollowings" v-if="hasMoreFollowing" style="width:100%">더보기</v-btn>
        </v-container>
      </v-card>
      <v-card style="margin-bottom:20px;">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list 
            :users="followerList" 
            :remove="removeFollower"
          />
          <v-btn @click="loadMoreFollowers" v-if="hasMoreFollower" style="width:100%">더보기</v-btn>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import FollowList from '~/components/FollowList';
  
  export default {
    components: {
      FollowList
    },
    data() {
      return {
        valid: false,
        nickname: '',
        nicknameRules: [
          v => !!v || '닉네임을 입력하세요.'
        ]
      }
    },
    computed: {
      followerList() {
        return this.$store.state.users.followerList
      },
      followingList() {
        return this.$store.state.users.followingList
      },
      hasMoreFollowing() {
        return this.$store.state.users.hasMoreFollowing
      },
      hasMoreFollower() {
        return this.$store.state.users.hasMoreFollower
      }
    },
    fetch({ store }) {
      return store.dispatch('users/loadFollowers')
      return store.dispatch('users/loadFollowings')
    },
    methods: {
      onChangeNickname() {
        this.$store.dispatch('users/changeNickname', {
          nickname: this.nickname
        })
      },
      removeFollower(id) {
        this.$store.dispatch('users/removeFollower', { id })
      },
      removeFollowing(id) {
        this.$store.dispatch('users/removeFollowing', { id })
      },
      loadMoreFollowers() {
        this.$store.dispatch('users/loadFollowers')
      },
      loadMoreFollowings() {
        this.$store.dispatch('users/loadFollowings')
      }
    },
    head() {
      return {
        title: '프로필'
      }
    },
    middleware: 'authenticated'
  }
</script>

<style>

</style>