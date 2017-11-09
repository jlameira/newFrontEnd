<template>
    <div>
        <h2>
            <i id="sonarRastreando">
                <b class="ic sonar"></b>
                <b class="ic sonar-texto">Rastreando...</b>
            </i>
            <span>
                <a href="" onclick="document.getElementById('mapid').classList.toggle('at');return false" class="ic-mapa no" id="selCameras">
                    Mapa
                </a>
                <a class="ad-roubado" id="#gerenciaRoubado" onclick="_menu.lateral(this)" style="cursor: pointer">Veículo roubado</a>

                <a href="javascript:void(0)" id="ope" class="oper" onclick="_util.rota( 'operacao' )">
                    Operação
                </a>
            </span>
        </h2>
        <div id="listaMonitoramento" class="lista-fotos grade-maior menor">
            <div id="monitoramentoDiv"></div>
            <div class="f2" v-for="veiculo in listaVeiculo">
                {{ veiculo }}
                <br>
                <br>

            </div>

        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            listaVeiculo: []
        }
    },
    computed: {
    },
    methods: {

    },
    mounted() {
        //        document.getElementById('c1').classList.remove('no');
        // document.getElementById('c2').classList.remove('no');

        axios.get('https://localhost.policiamilitar.mg.gov.br/v3/monitoramento')
            .then(resp => {
                this.listaVeiculo = resp.data.retorno
            })
            .catch(err => console.log(err))
        // for (var i = 0; i < 10; i++) {
        //     let veiculo = { id: i, name: 'Veiculo ' + i }
        //     this.listaVeiculo.push(veiculo);
        // }

        console.log('Veiculo >>>>>>>>>> ' + this.listaVeiculo)
    }
}
</script>