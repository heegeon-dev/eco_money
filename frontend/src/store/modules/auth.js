// // 認証ストア
// import Vue from 'vue'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    searchText: '',
    searchFlag: 0
  },

  getters: {
    searchText: state => {
      return state.searchText
    },
    searchFlag: state => {
      return state.searchFlag
    }
  },

  mutations: {
    setSearchText (state, searchText) {
      state.searchText = searchText
    },
    searchFlag (state, searchFlag) {
      state.searchFlag = searchFlag
    },
    ClearSearchText (state) {
      state.searchText = ''
    }
  },
  actions: {
    login (context, loginInfo) {
      return new Promise((resolve, reject) => {
        axios.post('/api/login', {
          LOGIN_TYPE: loginInfo.login_type,
          LOGIN_ID: loginInfo.login_id,
          PASSWORD: loginInfo.password
        })
          .then(response => {
            console.log(response.data.STAMP_SESSION_ID)
            console.log(response.data.STATUS_CODE)
            if (response.data.STATUS_CODE === '00') {
              // 成功時
              context.commit('logined', response.data.STAMP_SESSION_ID)
            }
            resolve(response.data)
          })
          .catch(error => {
            // 失敗時
            console.log(error)
            reject(error)
          })
      })
    },
    logout (context, loginInfo) {
      return new Promise((resolve, reject) => {
        axios.post('/api/logout', {
          MODE: '1',
          STAMP_SESSION_ID: context.state.stampSessionId
        })
          .then(response => {
            // eslint-disable-next-line eqeqeq
            if (response.data.STATUS_CODE == '00') {
            //   // 成功時
            //   context.commit('logout'),
            //   context.commit('setUserType', '')
            }
            resolve(response.data.STATUS_CODE)
          })
          .catch(error => {
            // 失敗時
            console.log(error)
            reject(error)
          })
      })
    }
  }
}
