export const state = () => ({
  me: null,
  followerList: [
    {
      nickname: '멈무',
      id: 1
    },
    {
      nickname: '수진',
      id: 2
    },
    {
      nickname: '곰나',
      id: 3
    }
  ],
  followingList: [
    {
      nickname: '멈무',
      id: 1
    },
    {
      nickname: '수진',
      id: 2
    },
    {
      nickname: '곰나',
      id: 3
    }
  ]
})

// 단순한 작업으로 data를 변경할때 사용
// 비동기 작업 X
export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
  addFollower(state, payload) {
    state.addFollower.push(payload)
  },
  addFollowing(state, payload) {
    state.followingList.push(payload)
  },
  removeFollower(state, payload) {
    const index = state.followerList.findIndex(v => v.id === payload.id);
    state.followerList.splice(index, 1);
  },
  removeFollowing(state, payload) {
    const index = state.followingList.findIndex(v => v.id === payload.id);
    state.followingList.splice(index, 1);
  },
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
  },
  addFollower({commit}, payload) {
    commit('addFollower', payload)
  },
  addFollowing({commit}, payload) {
    commit('addFollowing', payload)
  },
  removeFollower({commit}, payload) {
    commit('removeFollower', payload)
  },
  removeFollowing({commit}, payload) {
    // 실제로는 비동기 요청이 들어감
    commit('removeFollowing', payload)
  },
}