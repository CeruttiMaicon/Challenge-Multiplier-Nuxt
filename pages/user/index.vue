<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <table-custom buttom-add show remove :fields="fields" :items="items" title="Usuários" route="user" route-add="/user/add">
          <template v-slot:header>
            <b-icon-person font-scale="4" ></b-icon-person>
          </template>
        </table-custom>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  mounted() {
    this.getUsers()
  },
  data() {
    return {
      fields: [
        { key: 'codigo', label: 'Código' },
        { key: 'name', label: 'Nome' }
      ],
      items: [],
    }
  },
  methods:{
    getUsers(){
      this.$axios
        .$get(
          "user"
        )
        .then(({data}) => {
          this.items = data.map(({id, name}) => {
            return {codigo:id, name:name }
          });
        })
    }
  }
}
</script>
