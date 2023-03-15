export default {
  namespaced: true,
  state: {
    userInfo: {
      user: "",
      token: ""
    }
  },
  mutations: {
    setUser(state, payload) {
      state.userInfo = payload
    },
    deleteUser(state) {
      state.userInfo = {
        user: "",
        token: ""
      }
    }
  }
}