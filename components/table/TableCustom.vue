<template>
  <div>
    <div class="text-center" v-if="loading">
      <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
    </div>
    <div v-else>
      <b-card>
        <b-row class="mb-4">
          <b-col align-self="start">
            <slot name="header"></slot>
            <span class="h2">{{title}}</span>
          </b-col>
        </b-row>
        <b-table-simple
          :items="items"
          :fields="fields"
          responsive="sm"
        >
          <b-thead >
            <b-tr >
              <b-th v-for="(field, index) in fields" :key="index" >{{field.label}}</b-th>
              <b-th v-if="!removeOption" class="text-center" >Opções</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-if="items.length == 0" >
              <b-th class="text-center" :colspan="fields.length+1">Nenhum resultado encontrado</b-th>
            </b-tr>
            <b-tr v-else v-for="(item, index) in items" :key="index" >
              <b-th v-for="(it, index) in item" :key="index" >
                {{it}}
              </b-th>
              <b-th v-if="customAction" class="text-center">
                <slot v-bind:index="index" name="action"></slot>
              </b-th>
              <b-th class="text-center" v-else>
                <b-button-group>
                  <b-button v-if="show" :to="route +`/`+item.codigo" >Visualizar</b-button>
                  <b-button v-if="edit" :to="route +`/edit/`+item.codigo" variant="primary">Editar</b-button>
                  <b-button v-if="remove" @click="destroy(item.codigo)" variant="danger">Excluir</b-button>
                </b-button-group>
              </b-th>
            </b-tr>
          </b-tbody>
        </b-table-simple>
        <template v-slot:footer>
          <b-button v-if="buttomAdd" :to="routeAdd" variant="success">Adicionar</b-button>
          <b-row v-else>
            <b-col cols="12">
              <slot name="footer"></slot>
            </b-col>
          </b-row>
        </template>
      </b-card>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

  export default {
    data() {
      return {
        loading: true
      }
    },
    mounted() {
      this.loader()
    },
    props:{
      fields:{
        type: Array,
        required: true
      },
      items:{
        type: Array,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      route:{
        type: String,
      },
      routeAdd: {
        type: String,
      },
      customAction:{
        type: Boolean,
        default: false
      },
      show: {
        type:Boolean,
        default: false
      },
      edit: {
        type:Boolean,
        default: false
      },
      remove: {
        type:Boolean,
        default: false
      },
      buttomAdd: {
        type:Boolean,
        default: false
      },
      removeOption: {
        type:Boolean,
        default: false
      }
    },
    methods:{
      loader(){
        this.loading = false
      },
      destroy(id) {
        Swal.fire({
          title: 'Deseja deletar?',
          text: "Se você deletar não tera como recuperar!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, deletar!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$axios
            .$delete(
              this.route + `/` + id
            )
            .then(({success, data, message, error_message}) => {
              if(success == true)
              {
                Swal.fire(
                  'Deletado!',
                  message,
                  'success'
                ).then(() => {
                  document.location.reload(true);
                })
              } else {
                this.message = message
                this.error_message = error_message
              }
            })
          }
        })
      }
    }
  }
</script>
