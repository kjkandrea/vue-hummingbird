<template>
   <v-card>
     <v-container>
       <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
         <v-textarea
          v-model="content"
          outlined
          auto-grow 
          clearable
          label="이떤 신기한 일이 있었나요?"
          :hide-datails="hideDetails"
          :success-messases="successMessages"
          :success="success"
          :rules="[v => !!v || '내용을 입력하세요.']"
          @input="onChangeTextarea"
         >
          1
         </v-textarea>
         <v-btn type="submit" color="green" absolute right>트윗</v-btn>
         <v-btn>이미지 업로드</v-btn>
       </v-form>
     </v-container>
   </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      valid: false,
      hideDetails: false,
      successMessages: '',
      success: false,
      content: ''
    }
  },
  computed: {
    ...mapState('users', ['me'])
  },
  methods: {
    onChangeTextarea() {
      this.hideDetails = true;
      this.success = false;
      this.successMessages = '';
    },
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('posts/add', {
          content : this.content,
          User: {
            nickname: this.me.nickname
          },
          Comments: [],
          Images: [],
          id: Date.now(),
          createdAt: Date.now()
        })
          .then(() => {
            this.hideDetails = false;
            this.success = true;
            this.successMessages = '게시글 등록 성공!'
          })
          .catch(() => {

          })
      }
    }
  }
}
</script>

<style>

</style>