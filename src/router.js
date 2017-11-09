import Vue from 'vue'
import VueRouter from 'vue-router'
import Pesquisar from './components/Pesquisar.vue'

Vue.use(VueRouter)

const User = {
    template: `<div>Veiculo {{ $route.params.id }}</div>`
}

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
            path: '/',
            component: () =>
                import ('./components/ListVeiculos.vue')
        },
        {
            path: '/veiculo/:id',
            component: () =>
                import ('./components/Veiculo.vue')
        },
        {
            path: '/incluirMonitoramento',
            component: () =>
                import ('./components/CriarMonitoramento.vue')
        },
        {
            path: '/pesquisar',
            components: {
                pesquisar: Pesquisar
            }

        },
        {
            path: '/gerenciamento',
            component: () =>
                import ('./components/Gerenciamento.vue')
        }


    ]
})