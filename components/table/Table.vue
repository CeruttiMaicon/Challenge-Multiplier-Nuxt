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
              <b-th class="text-center" >Opções</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(item, index) in items" :key="index" >
              <b-th>{{item.name}}</b-th>
              <b-th>{{item.email}}</b-th>
              <b-th class="text-center">
                <b-button-group>
                  <b-button >Visualizar</b-button>
                  <b-button variant="primary">Editar</b-button>
                  <b-button variant="danger">Excluir</b-button>
                </b-button-group>
              </b-th>
            </b-tr>
          </b-tbody>
        </b-table-simple>
        <template v-slot:footer>
          <b-button variant="success">Adicionar</b-button>
        </template>
      </b-card>

    </div>
  </div>
</template>

<script>
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
      }
    },
    methods:{
      loader(){
        this.loading = false
      }
    }
  }
</script>
