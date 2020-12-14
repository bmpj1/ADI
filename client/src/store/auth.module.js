import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  getters: {
    loggedIn(state) {
      return (state.user && state.user.accessToken)? true : false;
    },
    getRol: state => {
        return (state.user && state.user.usuario.rol)? state.user.usuario.rol : 'anonimo';
    },
    getToken(state) {
        return (state.user && state.user.accessToken)? state.user.accessToken : null;
    },
    currentUser(state) {
        return (state.user && state.user.usuario && state.user.accessToken)? state.user : null
    },
    isAdmin(state) {
        return (state.user && state.user.usuario.rol)? state.user.usuario.rol == 'admin' : false;
    }
    
  },
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        user => {
          commit('registerSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state, user) {
      if(!state.status.loggedIn) {
        state.status.loggedIn = true;
        state.user = user;
      }
    },
    registerFailure(state) {
      if(!state.status.loggedIn) {
        state.status.loggedIn = false;
        state.user = null;
      }
    }
  }
};