<template>
  <div>
    <ul>
      <li v-for="f in follow" :key="f.id">
        <span>{{f.nickname}}</span>
        <v-icon @click="onRemoveFollow(f)">mdi-minus-circle-outline</v-icon>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      follow: Array,
      stat: String
    },
    methods: {
      onRemoveFollow(f) {
        this.$store.dispatch('users/removeFollow', {
          stat: this.stat,
          id: f.id
        });
      }
    }
  }
</script>  

<style>

</style>