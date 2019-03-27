import Vue from 'vue';
import Vuex from 'vuex';
import swal from 'sweetalert'
import axios from '@/api/server.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    allQuestions: [],
    showParent: true,
    answerAdd: false,
  },
  mutations: {
    updateLoginState(state, payload) {
      state.isLogin = payload.boolean;
    },
    mutateAllQuestionsState(state, payload){
      state.allQuestions = payload.allQuestions
    },
    updateParentState(state, payload) {
      state.showParent = payload.boolean
    },
    updateAnswerAddState(state, payload) {
      state.answerAdd = payload.boolean
    },
  },
  actions: {
    getAllQuestions({ commit }) {
      axios
        .get(`/questions`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log("berhasil get all questions")
          commit('mutateAllQuestionsState', {allQuestions: res.data.questions})
        })
        .catch(err => {
          swal({
            title: "Fail to load all questions!",
            text: err.response.data.message,
            icon: "error",
          })
        })
    },
    onLoginStatus({ commit }) {
      console.log("basrhasil ke action change login")
      commit('updateLoginState', {boolean: true})
    },
    offLoginStatus({ commit }) {
      console.log("berhasil ke login status false")
      commit('updateLoginState', {boolean: false})
    },
    offParentStatus({ commit }) {
      console.log("berhasil ke parent status false")
      commit('updateParentState', {boolean: false})
    },
    onParentStatus({ commit }) {
      console.log("berhasil ke parent status true")
      commit('updateParentState', {boolean: true})
    },
    onAnswerAddStatus({ commit }) {
      console.log("berhasil ke answer add status true")
      commit('updateAnswerAddState', {boolean: true})
    },
    offAnswerAddStatus({ commit }) {
      console.log("berhasil ke answer add status false")
      commit('updateAnswerAddState', {boolean: false})
    }
  },
});
