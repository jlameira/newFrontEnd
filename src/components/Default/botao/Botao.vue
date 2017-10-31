<template>
  <span>
    <button type="tipo" @click="disparaAcao()"> {{rotulo}} </button>
  </span>
</template>
<script>

export default {
  props: {
    tipo: {
      required: true,
      type: String
    },
    rotulo: {
      required: true,
      type: String
    },
    classPm: String
  },
  methods: {
    disparaAcao: function (el) {
      this.$emit('botaoAtivado');
    }
  }
}
</script>
