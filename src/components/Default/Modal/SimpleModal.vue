<template>
  <modal  :showModal="showModal" :closeAction="closeAction">
    <span class="msg de info" slot="body">
     {{observacao}}
    </span>
  </modal>
</template>

<script>
  import Modal from 'modal-vue'
  export default {
    props: ['showModal', 'closeAction','observacao'],
    components: { Modal }
  }
</script>

<style>
/* .modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
}

.modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid #999;
  border: 1px solid rgba(0,0,0,.2);
  border-radius:6px;
  background-clip: padding-box;
  outline: 0;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index:1040;
  background-color:#000;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

.modal-header {
  padding:15px;
  border-bottom: 1px solid #e5e5e5;
}
.modal-header .close {
  margin-top: -2px;
}

.modal-body {
  position: relative;
  padding: 15px;
} */

</style>