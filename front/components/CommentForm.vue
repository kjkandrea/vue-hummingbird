<template>
  <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm" style="position: relative">
    <v-textarea 
      v-model="content"
      filled
      label="댓글 달기"
      :hide-details="hideDetails"
      :success="success"
      :success-messages="successMessages"
      @input="onChangeTestarea"
    />
    <v-btn color="green" dark absolute top right type="submit">삐약</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      valid: false,
      content: '',
      success: false,
      successMessages: '',
      hideDetails: true
    }
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  methods: {
    onChangeTestarea(value) {
      if (value.length) {
        this.hideDetails = true;
        this.success = false;
        this.successMessages = '';
      }
    },
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('posts/addComment', {
          postId: this.postId,
          content: this.content,
          User: {
            nickname: this.me.nickname
          }
        })
          .then(() => {
            this.content = '';
            this.success = true;
            this.successMessages = '댓글이 작성되었습니다.';
            this.hideDetails = false;
          })
          .catch(() => {

          });
      }
    }
  }
}
</script>

<style>

</style>