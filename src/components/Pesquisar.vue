<template>
    <div>
        <h2>Pesquisar</h2>
        <div class="l ma grupo-sel">
            <div class="f2">
                <div class="su busca">
                    <the-mask v-model="placa" mask="SSS-0000" :tokens="getMaskHelios" class="proc1 tam-m" placeholder="Placa"></the-mask>
                </div>
            </div>
            <div class="f2">

                <div class="su busca">
                    <the-mask v-model="data" mask="##/##/####" class="proc1 tam-m" placeholder="Data"></the-mask>
                    <the-mask v-model="hora" mask="##:##" class="proc1 tam-m" placeholder="HH:MM"></the-mask>
                </div>
            </div>
        </div>

        <div class="su">
            <button type="button" id="btnSalvarMonit" @click="pesquisar()">Filtrar</button>
        </div>
        <br>
        <br>
	
            <clip-loader :loading="loading" ></clip-loader>
              <div v-if="mensagem">
                <span class="msg de info">
                  {{mensagem}}
                </span>
            </div>
        <div class="lista-fotos">
            <card-veiculo v-for="(v, index) in listaVeiculos " :veiculo="v" :key="index">

            </card-veiculo>
            <div v-if="showModal">
                <span class="msg de alerta">
                    buscando em outras coleções
                </span>
            </div>
            <infinite-loading @infinite="infinitePaginator" ref="infiniteLoading">
                <span slot="no-more">
                    Não Encontrei mais nada em outras coleções
                </span>
                <span slot="no-results">

                    Sem mais resultados
                </span>

            </infinite-loading>
        </div>
    </div>
</template>

<script>
import mask2 from "mlens/jquery.mask.js";
import CardVeiculo from "./Veiculo/CardVeiculo.vue";
import InfiniteLoading from "vue-infinite-loading";
import SisarFile from "./Default/Sisar.vue";
import SimpleDialog from "./Default/Modal/SimpleModal.vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

import { TheMask } from "vue-the-mask";
import { formataPlaca } from "../utils";
let tiposVeiculos = {
  1: "Automóvel",
  2: "Caminhão",
  3: "Motocicleta"
};
export default {
  data() {
    return {
      placa: "",
      data: "",
      hora: "",
      showModal: false,
      loading: false,
      mensagem: null,
      indeterminate: true,
      progress: 100,
      counterClockwise: false,
      hideBackground: false,
      options: {
        color: "#E91E63",
        strokeWidth: 0.9
      },
      getMaskHelios: {
        S: {
          pattern: /[A-Za-z\/?]/,
          transform: v => v.toLocaleUpperCase()
        },
        0: {
          pattern: /[0-9\/?]/
        }
      },
      listaVeiculos: "",
      pagina: 0
    };
  },
  components: {
    TheMask,
    CardVeiculo,
    InfiniteLoading,
    SimpleDialog,
    ClipLoader,
    SisarFile: {
      render(h) {
        return h("sisar-file");
      }
    }
  },
  methods: {
    pesquisar() {
      this.loading = true;
      this.listaVeiculos = [];
      this.pagina = 0;
      this.mensagem = null;
      let dataFormatada = "";
      let anoMesDia;
      let dia;
      let mes;
      let ano;
      if (this.data || this.hora) {
        anoMesDia = this.data.toString();
        dia = anoMesDia.slice(0, 2);
        mes = anoMesDia.slice(2, 4);
        ano = anoMesDia.slice(4, 8);
        dataFormatada =
          ano + mes + dia + (this.hora !== "" ? this.hora : "0000");
      }

      let dados = {
        fplaca: this.placa.replace("-", "").toLowerCase(),
        fdata: dataFormatada,
        pagina: this.pagina
      };
      console.log("Dados: " + JSON.stringify(dados));
      axios
        .post(
          "https://localhost.policiamilitar.mg.gov.br/v3/veiculo/pesquisa/filtro",
          dados
        )
        .then(resp => {
          this.loading = false;
          if (resp.data.retorno.length === 0) {
            this.mensagem = "Não foi encontrado nenhuma informação";
          }
          this.listaVeiculos = resp.data.retorno;
        })
        .catch(e => {
          if (!Array.isArray(e.response.data.erro)) {
            console.log("Error ", e.response.data["erro"]);
          } else {
            e.response.data.erro.map(error =>
              console.log("O campo abaixo é obrigatório", error.param)
            );
          }
        });
    },
    limpaAtributos() {
      (this.placa = ""),
        (this.tipo = ""),
        (this.marca = ""),
        (this.modelo = ""),
        (this.ano = ""),
        (this.cor = ""),
        (this.seletipo = "sel-tipo-"),
        (this.at = "");
      this.observacao = "";
    },
    closeDialog() {
      this.showModal = false;
    },
    infinitePaginator($state) {
      let dataFormatada = "";
      let anoMesDia = this.data.toString();
      let dia = anoMesDia.slice(0, 2);
      let mes = anoMesDia.slice(2, 4);
      let ano = anoMesDia.slice(4, 8);
      dataFormatada = ano + mes + dia + (this.hora !== "" ? this.hora : "0000");
      this.pagina = this.pagina + 1;

      let dados = {
        fplaca: this.placa.replace("-", "").toLowerCase(),
        fdata: dataFormatada,
        pagina: this.pagina
      };
      console.log("Dados: " + JSON.stringify(dados));
      this.showModal = true;
      axios
        .post(
          "https://localhost.policiamilitar.mg.gov.br/v3/veiculo/pesquisa/filtro",
          dados
        )
        .then(resp => {
          if (resp.data.retorno.length === 0) {
            debugger;
            $state.complete();
            this.showModal = false;
          } else {
            this.showModal = false;
            this.listaVeiculos = this.listaVeiculos.concat(resp.data.retorno);
            $state.loaded();
          }
        })
        .catch(e => {
          if (!Array.isArray(e.response.data.erro)) {
            console.log("Error ", e.response.data["erro"]);
          } else {
            e.response.data.erro.map(error =>
              console.log("O campo abaixo é obrigatório", error.param)
            );
          }
        });
    }
  },
  mounted() {}
};
</script>