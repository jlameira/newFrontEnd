<template>
    <figure :id="id" style="z-index: 1;" :class="tipoCard">
        <img :src="img" :id="'img'+id" style="width: 100%;">


        <figcaption>
            <span class="direita">{{data}}</span>
            <b>{{placaFormatada}}</b>
            <br>
        </figcaption>
        <a  v-if="mostrarExcluir"  class="ic ex" title="excluir" onclick="removerVeiculoTela(this, &quot;5a00697bc9ceb600016425c5&quot;, &quot;OQO-2432&quot;, &quot;undefined&quot; )"></a>
        <a v-if="mostrarAlarme" onclick="this.className='no'; pararAlarme()"></a>
        <div class="ma">
            <span>{{endereco}}</span>
            <span class="marc">{{sentido}}</span>
            <span v-if="roubado" class="ne am"> Roubado</span>
        </div>
    </figure>
</template>

<script>
    import mlens from 'mlens/jquery.mlens-1.6.min.js'

    export default {
        data() {
            return {
                id:'',
                img:'',
                listaVeiculo: [],
                data: '',
                mostrarExcluir:false,
                mostrarAlarme:false,
                placaFormatada:'',
                tipoCard:"pointer",
                endereco:'',
                sentido:'',
                roubado:false,
                img:''
            }
        },
        props: ["veiculo"],
        computed: {},
        methods: {
            formatarDataString(data) {
                if (!data) {
                    return ""
                } else {

                    if (typeof data === 'string' && !data.includes('Z')) {
                        data = data + 'Z'
                    }
                    

                    data = this.dataString(data)

                    // data = new Date(montaDataMongo)
                    var resultDiasEntreDatas = this.diasEntreDatas(data, new Date())
                    if (resultDiasEntreDatas === 0) {
                        return 'Hoje ' + data.toLocaleString('pt-BR', {
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: false,
                            timeZone: 'UTC'
                        })
                    } else if (resultDiasEntreDatas === 1) {
                        return 'Ontem ' + data.toLocaleString('pt-BR', {
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: false,
                            timeZone: 'UTC'
                        })
                    }
                    return new Date(data).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'short',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: false,
                        timeZone: 'UTC'
                    }).split(' ').join(' ')
                }
            },

            diasEntreDatas(first, second) {
                var one = new Date(first.getFullYear(), first.getMonth(), first.getDate())
                var two = new Date(second.getFullYear(), second.getMonth(), second.getDate())

                var millisecondsPerDay = 1000 * 60 * 60 * 24
                var millisBetween = two.getTime() - one.getTime()
                var days = millisBetween / millisecondsPerDay

                return Math.floor(days)
            },
            dataString(data) {
                data = data.toString()
                let ano = data.slice(0,4);
                let mes = data.slice(4,6);
                let dia = data.slice(6,8);
                let hora = data.slice(8,10);
                let minutos = data.slice(10,12);
                let segundos = data.slice(12,14);
                

                return new Date(ano, mes -1, dia, hora, minutos, segundos);
            }
        },
        mounted() {
               $('#img' +this.id).mlens({
                imgSrc: $("#gear").attr("data-big"),
                imgSrc2x: $("#gear").attr("data-big2x"),
                lensShape: "square",
                lensSize: ["80%", "32%"],
                borderSize: 1,
                borderColor: "#fff",
                borderRadius: 2,
                overlayAdapt: true,
                zoomLevel: 3,
                responsive: true
            })
        },
        created(){
               this.endereco = this.veiculo.camera.endereco;
            this.sentido = this.veiculo.camera.sentido;
            this.data = this.formatarDataString(this.veiculo.data);
            let p = this.veiculo.placa.split("")
            this.placaFormatada = p[0]+p[1]+p[2]+"-"+p[3]+p[4]+p[5]+p[6]
            this.placaFormatada = this.placaFormatada.toUpperCase()
            this.img = this.veiculo.img;
            this.id = this.veiculo.id;

              if(this.veiculo.roubado){
                this.tipoCard = 'critico'
            }
            if(this.veiculo.mandado){
                this.tipoCard = 'urgente'
            }
             if(this.veiculo.roubado && this.veiculo.mandado){
                this.tipoCard = 'critico'
            }




            if(this.excluir){
                this.mostrarExcluir =true
            }
            if(this.alarme){
                this.mostrarAlarme = true
            }

        }
    }
</script>