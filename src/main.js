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
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImp0aSI6IjVmNDlkYjhjLTdkOGMtNDA2ZS05NjdkLTM5NzRiMTk0ZGY1MiIsImlhdCI6MTUwOTk2MjM0NjkwNSwiZXhwIjoxNTA5OTYyNDMzMzA1fQ.eyJnIjoiYzkwNjk0NyIsInAiOiJDVFMiLCJyIjoiRFRTIiwidSI6NzEsImMiOjEyNSwiZiI6WyI1My4yNjgiXSwiaSI6ImlLREFZTTRZcnl2WDZpcDFmWUY2ZWwtZDRlNjk4eVRVYXF1MnhTT2UiLCJrIjoxfQ.8VInNTFCp43XOHN6YZK5r0CRSdZJZtonILWV08lx6aU';
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
