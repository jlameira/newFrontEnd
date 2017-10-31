<template>
  <a href="javascript:;" @click="disparaAcao()" class="c-list">
    {{nome}}
    <slot></slot>
    <span :class="verificaEstiloBotao"></span>
  </a>
</template>
<script>
export default {
  props: {
    classPm: String,
    confirmacao: Boolean,
    nome: String,
    list: Boolean
  },
  methods: {
    disparaAcao: function() {
      if (this.confirmacao) {
        if (confirm('Confirma Operação ?')) {
          this.$emit('botaoLinkAtivado', new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear());
        }
        return;
      }
      this.$emit('botaoLinkAtivado', new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear());

    }
  },
  computed: {
    verificaEstiloBotao() {
      if (this.classPm === 'ok' || !this.classPm) return 'ic ok direita';
      if (this.classPm === 'block') return 'ic senha';
      if (this.classPm === 'list') return 'c-list';
      if (this.classPm === 'ex') return 'ic ex';


    }
  }
}
</script>
