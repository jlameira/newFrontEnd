<template>
  <div>
    <a href="javascript:;" @click="disparaAcao()" :class="verificaEstiloBotao" v-if="!compartilhado">
      <span v-if="this.list">{{nome}}</span>
      <img class="c-foto" :src="image">
      <slot></slot>

    </a>
    <a v-else @click="disparaAcao()" :class="verificaEstiloBotao">
      <span v-if="this.list">{{nome}}</span>
      <img class="c-foto" :src="image">
      <slot></slot>

    </a>
  </div>
</template>
<script>
export default {
  props: {
    classPm: String,
    nome: String,
    list: Boolean,
    image: String,
    compartilhado: Boolean

  },
  methods: {
    disparaAcao: function() {
      this.$emit('botaoLinkAtivado');

    }
  },
  computed: {
    verificaEstiloBotao() {
      if (this.classPm === 'ok' || !this.classPm) return 'ic ok';
      if (this.classPm === 'block') return 'ic senha';
      if (this.classPm === 'list') return 'c-list';
      if (this.classPm === 'ex') return 'ic ex';


    }
  }
}
</script>
