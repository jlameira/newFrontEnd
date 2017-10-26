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
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImp0aSI6ImM0MDY0ZmI2LWVlYjEtNDUxZC1iMjBmLWYwNWY0OTQyNWIwOSIsImlhdCI6MTUwODg2NjM2Njc3MSwiZXhwIjoxNTA4ODY2NDUzMTcxfQ.eyJnIjoiYzkwNjk0NyIsInAiOiJDVFMiLCJyIjoiRFRTIiwidSI6NzEsImMiOjEyNSwiZiI6WyI1My4yNjgiXSwiaSI6ImZPOVVtaHlpTHg4YmhWcklHNndzQzlJN3dnVXRDTVpQYTR3Z3UzeHoiLCJrIjoxfQ.Mdl4JPKlIglJlVWYVtwTTim4q3DSkXboKa9gpKZUHec';
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
    var url = 'https://qapp.policiamilitar.mg.gov.br/chat/autenticacao/validar';
    axios.get(url)
      // .then(res => console.log(res))
      .then(usuario => Auth.setAuth(token, usuario.data.retorno.NUM_POLICIA))
      .catch(err => err)
  }
})
