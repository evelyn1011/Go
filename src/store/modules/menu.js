import { permission } from '@/api/index';
import { menuRoute } from '@/router/menuList';
import { ruleMenu } from '@/utils/ruleMenu';
import router, { baseRoute } from '@/router/index';
import { cloneDeep } from 'lodash'

export default {
  namespaced: true,
  state: {
    menuList: []
  },
  mutations: {
    setMenuList(state, payload) {
      state.menuList = payload
    },
    deleteMenuList(state) {
      state.menuList = []
    }

  },
  actions: {
    getMenuList({ commit, state, rootState }) {

      return new Promise((resolve, reject) => {

        permission({
          token: rootState.login.userInfo.token
        }).then(res => {
          // console.log(res.data,'99999');
          let result = ruleMenu(menuRoute, res.data.data)
          // console.log(result,'333333');
          let baseRoute2 = cloneDeep(baseRoute);
          let routes = baseRoute2[0].children;
          routes.push(...result)
          // console.log(routes,'路径');
          // 设置vuex中列表
          commit('setMenuList', routes)
          // router.addRoutes(baseRoute)
          
          resolve(baseRoute2)
          // console.log(baseRoute,'baseRoute---');
          
        })
      })


    }
  }
}