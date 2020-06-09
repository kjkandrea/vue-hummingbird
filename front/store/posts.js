export const state = () => ({
  mainPosts:[],
  hasMorePost: true,
  imagePaths: []
});

const totalPosts = 51;
const limit = 10;

export const mutations =  {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
    state.imagePaths = [];
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts.splice(index, 1);
  },
  loadComments(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Comments = payload;

  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.PostId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadPosts(state, payload) {
    // 남은 갯수 = 전체 갯수 - 현재 내가 불러온 갯수
    const diff = totalPosts - state.mainPosts.length;
    state.mainPosts = state.mainPosts.concat(payload);
    state.hasMorePost = payload.length === limit;
  },
  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1);
  }
};

export const actions = {
  add({ commit, state }, payload) {
    // 서버에 게시글 등록
    this.$axios.post('/post', {
      content: payload.content,
      imagePaths: state.imagePaths
    }, {
      withCredentials: true
    })
      .then((res) => {
        commit('addMainPost', res.data)
      })
      .catch(() => {

      });
    commit('addMainPost', payload)
  },
  remove({ commit }, payload) {
    this.$axios.delete(`/post/${payload.postId}`, {
      withCredentials: true
    })
     .then((res) => {
      commit('removeMainPost', payload);
     })
     .catch(() => {

     })
    commit('removeMainPost', payload)
  },
  loadComment({ commit, payload }) {
    this.$axios.get('/post/${payload.postId}/comments')
      .then((res) => {
        commit('loadComments', res.data)
      })
      .catch(() => {

      })
  },
  addComment({ commit }, payload) {
    this.$axios.post(`/post/${payload.postId}/comment`, {
      content: payload.content
    }, {
      withCredentials: true
    })
      .then((res) => {
        commit('addComment', res.data)
      })
      .catch(() => {

      })
    commit('addComment', payload)
  },
  async loadPosts({ commit, state }, payload) {
    if(state.hasMorePost) {
        try {
        const res = await this.$axios.get(`/posts?offset=${state.mainPosts.length}&limit=10`);
        commit('loadPosts', res.data);
        } catch (err) {
        console.error(err);
        }

    }
    },
  uploadImages({ commit }, payload) {
    this.$axios.post('/post/images', payload, {
      withCredentials: true
    })
      .then((res) => {
        commit('concatImagePaths', res.data)
      })
      .catch(() => {

      })
  }
}