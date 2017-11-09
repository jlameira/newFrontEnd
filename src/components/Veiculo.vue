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

        <fieldset>
            <div id="listaMonitoramento" class="lista-fotos grade-maior menor"  >

                <card-veiculo v-for="(v, index) in listaDeVeiculos " :veiculo="v" :key="index" ></card-veiculo>


            </div>
        </fieldset>

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
    import CardVeiculo from './Veiculo/CardVeiculo.vue'

    let tiposVeiculos = {
        1: 'Automóvel',
        2: 'Caminhão',
        3: 'Motocicleta'
    }

    export default {
        data() {
            return {
                listaDeVeiculos: null,
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
            SimpleDialog,
            CardVeiculo

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
                    axios.get('https://localhost.policiamilitar.mg.gov.br/v3/usuario/' + this.nome)
                        .then(resp => {
                            this.listaUsuarios = resp.data.retorno;
                            console.log('Recuperar Usuarios >>>>>>>>>>' + JSON.stringify(this.listaUsuarios))
                        })
                }
            },
            buscaMonitoramento(id) {
                this.classPm = '';
                this.limpaAtributos();
                axios.get('https://localhost.policiamilitar.mg.gov.br/v3/monitoramentoveiculo/' + id)
                    .then(resp => {
                        this.classPm = 'no'

                        this.listaDeVeiculos = resp.data.retorno;
                        axios.get('https://localhost.policiamilitar.mg.gov.br/v3/monitoramento/' + id)
                            .then(resp => this.montaVeiculo(resp.data.retorno))

                    })
                    .catch(err => console.log(err))
            },
            buscaMarca(dados) {
                axios.get('https://localhost.policiamilitar.mg.gov.br/v3/marcamodelo/VOLKSWAGEN')
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
                axios.get('https://localhost.policiamilitar.mg.gov.br/v3/modelo/' + this.marca)
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
                this.observacao = dados.observacao;
                dados.usuario.map(user => {
                    if (!user.principal) {
                        axios.get('https://localhost.policiamilitar.mg.gov.br/v3/usuario/' + user.login)
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
                axios.put('https://localhost.policiamilitar.mg.gov.br/v3/monitoramento/usrcompartilhados', dados)
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
                axios.delete('https://localhost.policiamilitar.mg.gov.br/v3/monitoramento/usrcompartilhados/' + dados._id +
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
                    this.listaDeVeiculos = ''

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

        },
        destroyed(){
            this.listaDeVeiculos=[];

        }
    }
</script>