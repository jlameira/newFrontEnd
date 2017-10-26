<template>
    <div>
        <h2>Monitoramento</h2>
        <fieldset>
            <legend>Veiculo</legend>
            <div class="l ma grupo-sel">
                <div class="su busca">
                    <input type="text" class="proc1 tam-m placa-input" placeholder="Placa" v-model="placa" />
                    <select class="proc1" v-model="marca" @click="buscaModelos()">
                        <option value="">Selecione</option>
                        <option v-for="(marca,index) in listaMarca" :key="index" :value="marca.id">{{ marca.nome }}</option>
                    </select>
                    <input type="text" class="proc1" placeholder="Marca" v-model="marca" />
                    <select class="proc1" v-model="modelo">
                        <option value="">Selecione</option>
                        <option v-for="(modelo,index) in listaModelo" :key="index" :value="modelo.id">{{ modelo.nome }}</option>
                    </select>
                    <input type="text" class="proc1" placeholder="Modelo" v-model="modelo" />
                    <input type="text" class="proc1 tam-p" placeholder="Ano" v-model="ano" />
                    <input type="text" class="proc1 " placeholder="Cor" v-model="cor" />
                    <input type="text" class="proc1 " placeholder="Tipo" v-model="tipo" />

                </div>
                <span id="selTipo" :class="seletipo">
                    <a href="javascript:void(0)" @click="seleTipo(1)" class="roubado-1 c-foto" title="Automóvel"></a>
                    <a href="javascript:void(0)" @click="seleTipo(2)" class="roubado-2 c-foto" title="Caminhão"></a>
                    <a href="javascript:void(0)" @click="seleTipo(3)" class="roubado-3 c-foto" title="Motocicleta"></a>
                </span>
                <span id="seleCor" class="sel-cor">
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-1 c-foto" title="Amarelo"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-2 c-foto" title="Azul"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-3 c-foto" title="Bege"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-4 c-foto" title="Branca"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-5 c-foto" title="Cinza"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-6 c-foto" title="Dourada"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-7 c-foto" title="Grená"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-8 c-foto" title="Laranja"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-9 c-foto" title="Marrom"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-10 c-foto" title="Prata"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-11 c-foto" title="Preta"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-12 c-foto" title="Rosa"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-13 c-foto" title="Roxa"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-14 c-foto" title="Verde"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-15 c-foto" title="Vermelha"></a>
                    <a href="javascript:void(0)" @click="seleCor($event)" class="sel-cor-16 c-foto" title="Fantasia"></a>
                </span>

            </div>

        </fieldset>
        <div class="su">
            <button type="button" id="btnSalvarMonit" @click="salvarMonitoramento()">Salvar</button>
            <button type="button" onclick="location.hash='#monitoramento'">Cancelar</button>
        </div>
    </div>
</template>

<script>
import { formataPlaca } from '../utils'
let tiposVeiculos = {
    1: 'Automóvel',
    2: 'Caminhão',
    3: 'Motocicleta'
}
export default {

    data() {
        return {
            placa: '',
            tipo: '',
            marca: '',
            modelo: '',
            ano: '',
            cor: '',
            seletipo: 'sel-tipo-',
            at: '',
            selected: '',
            listaMarca: [],
            listaModelo: []
        }
    },
    methods: {
        seleTipo(tipo) {
            if (this.seletipo === 'sel-tipo-' + tipo) {
                this.seletipo = 'sel-tipo-'
                this.tipo = ''
            } else {
                this.tipo = tiposVeiculos[tipo]
                this.seletipo = this.seletipo + tipo
            }

        },
        seleCor(cor) {
            cor.target.classList.toggle('at')
            this.cor = cor.target.title
            console.log(cor.target.title)
        },
        salvarMonitoramento() {
            let dados = { ano: this.ano, "corCss": this.seletipo, marca: this.marca, "tipo": this.tipo, modelo: this.modelo, "cor": this.cor, "qtd_reconhecimento": 1, "observacao": "", "data_monitoramento": "2017-08-11T22:16:35.758Z", "veiculo_monitorado": this.placa }

            axios.post('https://localhost.policiamilitar.mg.gov.br/v1/monitoramento', dados)
                .then(resp => { this.adicionaRota(resp), console.log(resp) })
                .catch(e => {
                    if (!Array.isArray(e.response.data.erro)) {
                        console.log('Error ', e.response.data['erro'])
                    } else {
                        e.response.data.erro.map(error => console.log('O campo abaixo é obrigatório', error.param))

                    }
                })

        },
        buscaModelos() {
            this.modelo = ''
            this.listaModelo = []
            axios.get('https://localhost.policiamilitar.mg.gov.br/v1/modelo/' + this.marca)
                .then(modelos => {
                    Object.entries(modelos.data.retorno).map(resp => {
                        let modelo = {}
                        modelo.id = resp[0];
                        modelo.nome = resp[1]
                        this.listaModelo.push(modelo)
                    })
                })
            return this.listaModelo;


        },
        adicionaRota(dados) {
            const placa = formataPlaca(dados);
            this.$store.state.listaDeRotas.push({
                path: `/veiculo/${dados.data.retorno._id}`,
                placa: placa,
                compartilhado: false,
                id: dados.data.retorno._id
            })

            this.limpaAtributos();

        },
        limpaAtributos() {
            this.placa = '',
                this.tipo = '',
                this.marca = '',
                this.modelo = '',
                this.ano = '',
                this.cor = '',
                this.seletipo = 'sel-tipo-',
                this.at = ''

        }


    },
    mounted() {
        axios.get('https://localhost.policiamilitar.mg.gov.br/v1/marcamodelo/VOLKSWAGEN')
            .then(resp => {
                Object.entries(resp.data.retorno).map(resp => {
                    let marca = {}
                    marca.id = resp[0];
                    marca.nome = resp[1]
                    this.listaMarca.push(marca)
                })
                return
            }
            )
            .catch(e => {
                if (!Array.isArray(e.response.data.erro)) {
                    console.log('Error ', e.response.data['erro'])
                } else {
                    e.response.data.erro.map(error => console.log('O campo abaixo é obrigatório', error.param))

                }
            })

        return this.listaMarca


        console.log('monitoramento >>>>>>>>>> ')
    }
}
</script>