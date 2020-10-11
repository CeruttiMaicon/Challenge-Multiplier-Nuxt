<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <table-custom :footer="false" :buttom-add="false" show remove custom-action :remove-option="true" :fields="fields" :items="items" title="Logs" >
          <template v-slot:header>
            <b-icon-info-circle font-scale="4" ></b-icon-info-circle>
          </template>
        </table-custom>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from 'moment'

export default {
  mounted() {
    this.getLogs()
  },
  data() {
    return {
      fields: [
        { key: 'codigo', label: 'Código' },
        { key: 'message', label: 'Mensagem' },
        { key: 'date', label: 'Data' }
      ],
      items: [],
    }
  },
  methods:{
    moment(date){
      return moment(date).format('DD/MM/YYYY HH:mm:ss')
    },
    getLogs(){
      this.$axios
        .$get(
          "log"
        )
        .then(({data}) => {
          this.items = data.map(({id, message, created_at}) => {
            const date = this.moment(created_at)
            return {codigo:id, message, date }
          });
        })
    }
  }
}
</script>
