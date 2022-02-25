import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const getDefaultState = () => {
    return {
      user: null
    };
};

export default new Vuex.Store({

    state: getDefaultState(),
    mutations: {
        SET_USER_DATA (state, userData) {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
            axios.defaults.headers.common['Authorization'] = `Bearer${
                userData.token
            }`
        },
        CLEAR_USER_DATA(){
            localStorage.removeItem('user')
            location.reload()
        }
    },
    actions: {
        async register ({ commit }, credentials) {
            const { data } = await axios
                .post('http://localhost:3000/register', credentials);
                console.log(data);
            commit('SET_USER_DATA', data);
        },
        async login ({ commit }, credentials) {
            const { data } = await axios
                .post('http://localhost:3000/login', credentials);

            commit('SET_USER_DATA', data);
        },
        logout ({ commit }) {
            commit('CLEAR_USER_DATA');
        },

    },
    getters:{
        loggedIn(state){
            return !!state.user
        }
    }
});
  