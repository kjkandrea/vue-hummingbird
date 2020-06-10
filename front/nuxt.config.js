module.exports = {
  head: {
    title: 'NodeBird'
  },
  modules: [
    '@nuxtjs/axios'
  ],
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  vuetify: {},
  axios: {
    browserBaseURL: 'http://localhost:3085',
    BaseURL: 'http://localhost:3085',
    https: false
  },
  server: {
    post: 3080
  }
}