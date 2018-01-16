import {$store, $api} from "../../components/vue/index";

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.userName.trim();
      let user = {
        userName: userInfo.userName.trim(),
        password: userInfo.password
      };
      return new Promise((resolve, reject) => {
        $api.login('post', user).then(response => {
          if (response.status_code === 200) {
            const data = response.data;
            $store.local = {token: data.accessToken};
            commit('SET_TOKEN', data.accessToken);
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        $api.users('get','','profile').then(response => {
          //const data = response.data;
          let data = {
            name: response.data.userName,
          };
          commit('SET_NAME', data.name);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        $api.logout('post').then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          $store.clear('token');
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        $store.clear('token');
        resolve()
      })
    }
  }
};

export default user
