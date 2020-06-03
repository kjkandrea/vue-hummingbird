export const state = () => ({
  me: null,
  followerList: [],
  followingList: []
})

// 단순한 작업으로 data를 변경할때 사용
// 비동기 작업 X
export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  }
}

// 비동기적이고 복잡한 작업으로 data를 변경할때 사용
export const actions = {
  // context = { commit, dispatch, state, rootState, getters, rootGetters }
  signUp({commit, state}, payload) {
    // 서버에 회원가입 요청을 보내는 부분
    // payload = 회원정보
    
    commit('setMe', payload); // === state.me = payload
  },
  logIn({commit}, payload) {
    commit('setMe', payload);
  },
  logOut({commit}, payload) {
    commit('setMe', null);
  },
  changeNickname({commit}, payload) {
    commit('changeNickname', payload)
  }
}