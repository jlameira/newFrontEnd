<template>
    <dl class="na" style="cursor: pointer" id="meus_veiculos_pai">
        <dt>Home</dt>
        <router-link to='/'>Listar Todos</router-link>
        <dt>Principal</dt>
        <dd v-for="route in rotas">
            <a href="javascript:;" @click="disparaAcao(route.id)" class="ic ex flu"></a>
            <router-link v-if="route.compartilhado === false " route.tipo :to="route.path ? route.path :'/' " active-class="at" exact> {{ route.placa }} </router-link>
        </dd>
        <dt>Gerenciamento</dt>
        <dd v-for="route in rotas">
            <a href="javascript:;" @click="disparaAcao(route.id)" class="ic ex flu"></a>
            <router-link v-if="route.compartilhado === true " route.tipo :to="route.path ? route.path :'/' " active-class="at" exact> {{ route.placa }} </router-link>
        </dd>
        <dd class="pa">
            <router-link to='/incluirMonitoramento'>
                <span class="ic de ad2">Incluir</span>
            </router-link>
        </dd>
    </dl>
</template>
<script>
export default {
    props: {
        rotas: {
            type: Array,
            required: true
        }
    },
    methods: {
        disparaAcao: function(id) {

            this.$emit('excluirMonitoramento', id);

        }
    },
}
</script>


