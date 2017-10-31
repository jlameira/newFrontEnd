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
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImp0aSI6ImVjMDI2ZmRiLTkxZDEtNDdiNC04ZmJkLTA4ODE4Mjc2NWFiMyIsImlhdCI6MTUwOTQ2NTI3NDEyMywiZXhwIjoxNTA5NDY1MzYwNTIzfQ.eyJnIjoiYzkwNjk0NyIsInAiOiJDVFMiLCJyIjoiRFRTIiwidSI6NzEsImMiOjEyNSwiZiI6WyI1My4yNjgiXSwiaSI6InJvRHRQRnVDbDhhMTVJOTA0ZUZUampiWkJZcWliMkNpM1I5Uzc2N0ciLCJrIjoxfQ.iCMgNFNE4rAWHWKU_OV-qtX4AUDDPedK7BTkwHd2Ahk';
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
