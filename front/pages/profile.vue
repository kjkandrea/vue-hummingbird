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
            v-bind:follow="followerList" 
            eventStatus="followerList"
          />
        </v-container>
      </v-card>
      <v-card style="margin-bottom:20px;">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list 
            v-bind:follow="followingList" 
            eventStatus="followingList"
          />
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
    },
    methods: {
      onChangeNickname() {
        this.$store.dispatch('users/changeNickname', {
          nickname: this.nickname
        })
      }
    },
    head() {
      return {
        title: '프로필'
      }
    }
  }
</script>

<style>

</style>