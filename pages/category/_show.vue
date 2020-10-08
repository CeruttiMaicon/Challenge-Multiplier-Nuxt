<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <div class="text-center" v-if="loading">
          <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
        </div>
        <card-form title="Visualizar Categoria" route-back="/category">
          <b-row>
            <b-col>
              Código: {{item.id}}
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              Nome: {{item.name}}
            </b-col>
          </b-row>
        </card-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    mounted() {
      this.getCategory()
    },
    data() {
      return {
        id: this.$route.params.show,
        item: [],
        loading: true,
        message: "",
        error_message: ""
      }
    },
    methods:{
      getCategory(){
        this.$axios
          .$get(
            `category/`+this.id
          )
          .then(({success, data, message, error_message}) => {
            if(success == true)
            {
              this.item = data
            } else {
              this.message = message
              this.error_message = error_message
            }
          }).finally(() =>{
            this.loading = false
          })
    }
  }
  }
</script>
