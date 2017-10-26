<template>
  <div id="app">
    <div id='g'>
      <app-header></app-header>
      <div id='c'>
        <div id='c1'>
          <!-- <app-menu :rotas="routes"></app-menu> -->
          <app-menu :rotas="this.$store.state.listaDeRotas" @excluirMonitoramento="excluir($event)"></app-menu>
          <!-- <div id="c3" v-if="this.lista">
                                                                                                                                                                                    <h3>Lista</h3>
                                                                                                                                                                                  </div> -->
        </div>

        <div id='c2'>

          <router-view></router-view>

        </div>
      </div>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import Header from './template/Header.vue';
import Footer from './template/Footer.vue';
import Menu from './components/Menu/Menu.vue'
import router from './router'


export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      routes: [],
      veiculo: null
    }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-menu': Menu
  },
  computed: {

  },
  mounted() {
    let usuario = localStorage.getItem('usuario');
    this.routes = [];
    axios.get('https://localhost.policiamilitar.mg.gov.br/v1/monitoramento')
      .then(resp => {
        let arrayMonitormanto = []
        resp.data.retorno.map(monit => {
          let veiculo = {
            placa: monit.placa,
            path: '/veiculo/' + monit.id,
            compartilhado: false,
            id: monit.id
          }
          this.$store.state.listaDeRotas.push(veiculo);

        })
      })
      .catch(err => console.log('Errrooooo>>>>: ' + err))


    console.log('>>>>>>>>>>>>criei ' + usuario)
  },
  methods: {
    criaLinkVeiculo() {
      console.log('cria veiculo>>>>>>>>>>>>>>>>>>')
      this.$data.veiculo = 'kkw-1035'

    },
    excluir($event) {
      axios.delete('https://localhost.policiamilitar.mg.gov.br/v1/monitoramento/' + $event)
        .then(resp => {
          this.removeDaRota(resp.data.retorno.placa)
        })

    },
    removeDaRota(placa) {
      let novoArray = [];
      novoArray = this.$store.state.listaDeRotas.filter(function(m) {
        return m.placa !== placa
      })
      this.$store.state.listaDeRotas = novoArray;

    }
  }
}
</script>

<style>

</style>
