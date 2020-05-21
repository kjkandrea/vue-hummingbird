<template>
  <v-container>
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field
            v-bind="email"
            label="이메일"
            type="email"
            :rules="emailRules"
            required
          >
          </v-text-field>
          <v-text-field
            v-bind="password"
            label="비밀번호"
            type="password"
            :rules="passwordRules"
            required
          >
          </v-text-field>
          <v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
          <v-btn nuxt to="/signup" type="submit">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.'
        ],
        passwordRules: [
          v => !!v || '패스워드는 필수입니다.'
        ],
      }
    },
    methods: {
      onSubmitForm(){
        console.log('submit')
        if(this.$refs.form.validate()) {
          alert('로그인 시도 완료')
        }else {
          alert('유효하지 않습니다. 입력란을 확인해주세요.')
        }
      }
    }
  }
</script>

<style>

</style>