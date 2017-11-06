<template>
    <div>
        <h2>Monitoramento
            <span>
                <a href="javascript:void(0)" style="display" id="btnObs" @click="showModal = true" class="info">Observação</a>
                <a href="javascript:void(0)" class="compart" onclick="document.getElementById('listaCompartilhar').className='jm c-user'">Compartilhar</a>
            </span>
        </h2>
        <i id="sonarRastreando" :class="classPm">
            <b class="ic sonar"></b>
        </i>
        <simple-dialog v-if="showModal" :showModal="showModal" @close="showModal = false" :closeAction="closeDialog" :observacao="observacao">
            <h3 slot="header">Observação</h3>
            <ul slot="body">
               {{observacao}}

            </ul>
        </simple-dialog>

        <fieldset>{{veiculo}}</fieldset>
        <!-- 
        <fieldset>
            <legend>Veiculo</legend>
            <div class="l ma grupo-sel">
                <div class="su busca">
                    <input type="text" class="proc1 tam-m placa-input" placeholder="Placa" v-model="placa" disabled />
                    <select class="proc1" v-model="marca" v-on:change="buscaModelos()" disabled>
                        <option value="">Selecione</option>
                        <option v-for="(marca,index) in listaMarca" :key="index" :value="marca.id">{{ marca.nome }}</option>
                    </select>
                    <input type="text" class="proc1" placeholder="Marca" v-model="marca" disabled/>
                    <select class="proc1" v-model="modelo" disabled>
                        <option value="">Selecione</option>
                        <option v-for="(modelo,index) in listaModelo" :key="index" :value="modelo.id">{{ modelo.nome }}</option>
                    </select>
                    <input type="text" class="proc1" placeholder="Modelo" v-model="modelo" disabled />
                    <input type="text" class="proc1 tam-p" placeholder="Ano" v-model="ano" disabled />
                    <input type="text" class="proc1 " placeholder="Cor" v-model="cor" disabled />
                    <input type="text" class="proc1 " placeholder="Tipo" v-model="tipo" disabled/>

                </div>
                <span id="selTipo" :class="seletipo" disabled>
                    <a href="javascript:void(0)" @click="seleTipo(1)" class="roubado-1 c-foto" title="Automóvel"></a>
                    <a href="javascript:void(0)" @click="seleTipo(2)" class="roubado-2 c-foto" title="Caminhão"></a>
                    <a href="javascript:void(0)" @click="seleTipo(3)" class="roubado-3 c-foto" title="Motocicleta"></a>
                </span>
                <span id="seleCor" class="sel-cor" disabled>
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
        </fieldset> -->

        <div id="listaCompartilhar" class="jm c-user no" style="margin-top: 60px;">
            <div class="comp-caixa" style="border-top: 1px solid #d8e4ee;">
                <div id="placaCompartilhar"></div>
            </div>
            <div class="rol">
                <div class="su busca">
                    <input id="proc1" class="proc1" type="text" placeholder="Pesquise" v-model="nome" onclick="document.getElementById('limpar').classList.toggle('no')"
                        @keyup="recuperaUsuario()">
                    <a id="limpar" onclick="this.classList.toggle('no');document.getElementById('proc1').value=''" class="fe proc2 no" title="Limpar">&nbsp;</a>
                    <a id="icPesq" onclick="recuperarUsuarioFiltro(document.getElementById('proc1'), 'visualizarMonitoramento')" class="pr proc2"
                        title="Pesquisar">&nbsp;</a>
                </div>
                <div id="dados">
                    <app-link :compartilhado='false' :list='true' v-for="(usuario, index) in listaUsuarios" :image="'https://intranet.policiamilitar.mg.gov.br'+usuario.URL_FOTO"
                        :key=" index " :nome='usuario.NOME_COMPLETO' classPm="list" @botaoLinkAtivado="adicionarUsuarioAComp(usuario) ">

                    </app-link>

                </div>
                <div id="jaAdicionados ">
                    <app-link :compartilhado='true' :list='true' v-for="(usuario, index) in listaUsuarioCompartilhados" :image="'https://intranet.policiamilitar.mg.gov.br'+usuario.URL_FOTO"
                        :key=" index " :nome='usuario.NOME_COMPLETO' classPm="list">
                        <span class="n-msg" style="cursor: pointer" @click="removeCompartilhado(usuario)">Remover</span>
                    </app-link>

                </div>
            </div>
            <div id="rdp-menu " class="su separ ">
                <span>
                    <a onclick="document.getElementById( 'listaCompartilhar').className='jm c-user no' " class="sair ">Fechar</a>
                </span>
            </div>
        </div>


    </div>
</template>

<script>
    import Vue from 'vue'
    import Modal from 'modal-vue'



    import Link from './Default/botao/BotaoLink.vue'
    import SimpleDialog from './Default/Modal/SimpleModal.vue'

    let tiposVeiculos = {
        1: 'Automóvel',
        2: 'Caminhão',
        3: 'Motocicleta'
    }
    export default {
        data() {
            return {
                veiculo: null,
                nome: '',
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
                listaModelo: [],
                listaUsuarios: [],
                listaUsuarioCompartilhados: [],
                classPm: 'no',
                showModal: false,
                observacao: ''
            }
        },
        components: {
            'app-link': Link,
            SimpleDialog

        },
        computed: {},
        methods: {
            closeDialog() {
                this.showModal = false
            },
            clickAction() {
                this.showModal = false
            },
            recuperaUsuario() {
                if (this.nome !== '') {
                    axios.get('https://localhost.policiamilitar.mg.gov.br/v1/usuario/' + this.nome)
                        .then(resp => {
                            this.listaUsuarios = resp.data.retorno;
                            console.log('Recuperar Usuarios >>>>>>>>>>' + JSON.stringify(this.listaUsuarios))
                        })
                }
            },
            buscaMonitoramento(id) {
                this.classPm = '';
                this.limpaAtributos();
                axios.get('https://localhost.policiamilitar.mg.gov.br/v1/monitoramentoveiculo/' + id)
                    .then(resp => {
                        this.classPm = 'no'

                        this.veiculo = resp.data.retorno;
                        axios.get('https://localhost.policiamilitar.mg.gov.br/v1/monitoramento/' + id)
                            .then(resp => this.montaVeiculo(resp.data.retorno))

                        // this.montaVeiculo(resp.data.retorno)
                        // this.buscaMarca(resp.data.retorno)
                    })
                    .catch(err => console.log(err))
            },
            buscaMarca(dados) {
                axios.get('https://localhost.policiamilitar.mg.gov.br/v1/marcamodelo/VOLKSWAGEN')
                    .then(resp => {
                        Object.entries(resp.data.retorno).map(resp => {
                            let marca = {}
                            marca.id = resp[0];
                            marca.nome = resp[1]
                            this.listaMarca.push(marca)
                        });
                        this.marca = dados.dados_veiculo.caracteristicas.marca;
                        this.buscaModelos();
                        this.montaVeiculo(dados);
                        return
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
            montaVeiculo(dados) {
                // this.placa = dados.dados_veiculo.placa_formatada;
                // this.marca = dados.dados_veiculo.caracteristicas.marca;
                // this.modelo = dados.dados_veiculo.caracteristicas.modelo;
                // this.ano = dados.dados_veiculo.caracteristicas.ano;
                // this.cor = dados.dados_veiculo.desc_cor.toLowerCase().split(' ').map(function(word) {
                //     return word[0].toUpperCase() + word.substr(1);
                // }).join(' ');

                // var parent = new Vue({ el: '#seleCor' })
                // var child = parent.$el.children

                // for (var i = 0; i < child.length; i++) {
                //     if (child[i].title === this.cor) {
                //         child[i].classList.toggle('at');
                //     } else {
                //         child[i].classList.remove('at');

                //     }
                // }
                // this.tipo = dados.dados_veiculo.caracteristicas.tipo;
                // this.seleTipo(this.tipo);
                this.observacao =dados.observacao;
                dados.usuario.map(user => {
                    if (!user.principal) {
                        axios.get('https://localhost.policiamilitar.mg.gov.br/v1/usuario/' + user.login)
                            .then(resp => {
                                this.listaUsuarioCompartilhados.push(resp.data.retorno[0]);
                            })

                    }
                })


            },
            adicionarUsuarioAComp(user) {
                let dados = {
                    _id: this.$route.params.id,
                    militares: [
                        user.NUM_POLICIA
                    ]
                }
                axios.put('https://localhost.policiamilitar.mg.gov.br/v1/monitoramento/usrcompartilhados', dados)
                    .then(resp => {
                        this.listaUsuarioCompartilhados.push(user)
                        let indice = this.listaUsuarios.indexOf(user);
                        this.listaUsuarios.splice(indice, 1);
                        console.log(resp)
                    })



            },
            removeCompartilhado(user) {
                let dados = {
                    _id: this.$route.params.id,
                    militar: [
                        user.NUM_POLICIA
                    ]
                }
                axios.delete('https://localhost.policiamilitar.mg.gov.br/v1/monitoramento/usrcompartilhados/' + dados._id +
                        '/' + user.NUM_POLICIA, dados)
                    .then(resp => {
                        let indice = this.listaUsuarioCompartilhados.indexOf(user);
                        this.listaUsuarioCompartilhados.splice(indice, 1);
                        console.log(resp)
                    })

            },
            limpaAtributos() {
                this.placa = '',
                    this.tipo = '',
                    this.marca = '',
                    this.modelo = '',
                    this.ano = '',
                    this.cor = '',
                    this.seletipo = 'sel-tipo-',
                    this.at = '',
                    this.veiculo = ''

            }

        },
        mounted() {
            this.limpaAtributos();
            this.buscaMonitoramento(this.$route.params.id);
         
        },
        beforeRouteUpdate(to, from, next) {

            this.buscaMonitoramento(to.params.id);
            this.limpaAtributos();
            next();

        }
    }
</script>