import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import vuetify from './plugins/vuetify';
import Axios from 'axios';

Vue.config.productionTip = false

Vue.use(VeeValidate);
Vue.use(Vuex);

const app = new Vue({
  router,
  store,
  vuetify,
  beforeMount(){
    Axios.interceptors.request.use(async config => { // Agregamos el autorization al header al montar cualquier componente y realizar una petición
      const token = store.getters['auth/getToken'];
      // console.log(token)
      if (token) {
        config.headers.Authorization = 'BEARER ' + token+ 'asdasd';
      }
      return config;
    });
},
  render: h => h(App)
}).$mount('#app')

export default app;