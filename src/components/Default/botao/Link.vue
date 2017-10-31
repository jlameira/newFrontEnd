<template>
  <h2>
    <span>
      <a href="javascript:;" @click="disparaAcao()" :class="classPm"> {{rotulo}} </a>
    </span>
  </h2>
</template>
<script>
export default {
  props: {
    rotulo: {
      required: true,
      type: String
    },
    classPm: String
  },
  methods: {
    disparaAcao: function () {
      console.log('chamando o Pai')
      this.$emit('acaoLink');
    }
  }
}
</script>
