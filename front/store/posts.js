export const state = () => ({
  mainPosts:[],
  hasMorePost: true
});

const totalPosts = 51;
const limit = 10;

export const mutations =  {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadPosts(state) {
    // 남은 갯수 = 전체 갯수 - 현재 내가 불러온 갯수
    const diff = totalPosts - state.mainPosts.length;
    // fakePosts 더미 생성
    const fakePosts = 
      Array(
        // 남은 갯수 > 10 인가? 삼항 연산
        diff > 10 ? limit : diff
      )
      .fill()
      .map(v => ({
        id: Math.random().toString(),
        User: {
          id: 1,
          nickname: '멈무',
        },
        content: `Hello infinite scrolling~ ${Math.random()}`,
        Comments: [],
        Images: []
      }));
      state.mainPosts = state.mainPosts.concat(fakePosts);
      // fakePosts.length === limit 으로 불러올 갯수와 일치하는지 판단하여 불린 반환. 
      state.hasMorePost = fakePosts.length === limit;
  }
};

export const actions = {
  add({ commit }, payload) {
    // 서버에 게시글 등록
    commit('addMainPost', payload)
  },
  remove({ commit }, payload) {
    commit('removeMainPost', payload)
  },
  addComment({ commit }, payload) {
    commit('addComment', payload)
  },
  loadPosts({ commit, state }, payload) {
    if (state.hasMorePost) {
      commit('loadPosts');
    }
  }
}