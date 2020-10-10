<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <div class="text-center" v-if="loading">
          <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
        </div>
        <card-form v-else title="Visualizar Usuário" route-back="/user">
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
          <b-row>
            <b-col>
              E-mail: {{item.email}}
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
      this.getUser()
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
      getUser(){
        console.log(this.id)
        this.$axios
          .$get(
            `user/`+this.id
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
