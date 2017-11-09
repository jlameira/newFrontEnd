import Vue from 'vue'
import App from './App.vue'
import Auth from './Auth/Auth';
import router from './router'
import { store } from './store/store';


var VueCookie = require('vue-cookie');
window.axios = require('axios');

Vue.use(VueCookie)
let token = '';
// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  token = Vue.cookie.get('tokiuz')

} else {
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImp0aSI6IjI2M2JlYzc1LWVhYzMtNDZjZi05ZmRmLTEyYmZlZWQ2ZTIwYyIsImlhdCI6MTUxMDI0OTIyNTQ2NiwiZXhwIjoxNTEwMjQ5MzExODY2fQ.eyJnIjoiYzkwNjk0NyIsInAiOiJDVFMiLCJyIjoiRFRTIiwidSI6NzEsImMiOjEyNSwiZiI6WyI1My4yNjgiXSwiaSI6IlBBUWVDcktkN0sxWmctRU9BRzFiM2RDTU1aSWR2c3JmcnFmWS03Vk0iLCJrIjoxfQ._Jjn_r8pwjbe2LTemK3eBQQL1rXpczWOWNI-dTqV0Ko';
  Vue.cookie.set('tokiuz', token, 1)

}
window.axios.defaults.headers.common['Authorization'] = token;
window.axios.defaults.headers.post['Content-Type'] = 'application/json';



new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created() {
    Auth.setAuth(token,'c906947')
    // var url = 'https://qapp.policiamilitar.mg.gov.br/chat/autenticacao/validar';
    // axios.get(url)
    //   // .then(res => console.log(res))
    //   .then(usuario => Auth.setAuth(token, usuario.data.retorno.NUM_POLICIA))
    //   .catch(err => err)
  }
})
