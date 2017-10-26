<template>
    <div>
        {{veiculo}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            veiculo: null
        }
    },
    computed: {
    },
    methods: {
        buscaVeiculo(id) {
            axios.get('https://localhost.policiamilitar.mg.gov.br/v1/monitoramento/' + id)
                .then(resp => {
                    this.veiculo = resp.data.retorno
                })
                .catch(err => console.log(err))
            console.log(JSON.stringify(this.veiculo))
        }
    },
    mounted() {
        axios.get('https://localhost.policiamilitar.mg.gov.br/v1/monitoramento/' + this.$route.params.id)
            .then(resp => {
                this.veiculo = resp.data.retorno
            })
            .catch(err => console.log(err))
    },
    beforeRouteUpdate(to, from, next) {
        this.buscaVeiculo(to.params.id)
        next();

    }
}
</script>